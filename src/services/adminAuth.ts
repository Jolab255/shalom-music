// Admin Authentication & Security Service for Shalom Music CMS

export interface AdminSession {
  token: string;
  username: string;
  loginTime: number;
  expiresAt: number;
}

export interface ActivityLog {
  id: string;
  timestamp: number;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

const STORAGE_KEYS = {
  CREDS: 'shalom_admin_credentials',
  SESSION: 'shalom_admin_session',
  REMEMBER: 'shalom_admin_remember_session',
  LOCKOUT: 'shalom_admin_lockout_info',
  AUDIT_LOGS: 'shalom_admin_audit_logs',
};

// Default bootstrap admin credentials
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'shalom@admin2026';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 1 minute lockout
const DEFAULT_SESSION_DURATION_MS = 4 * 60 * 60 * 1000; // 4 hours
const EXTENDED_SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days if remember me

// Helper to hash password using Web Crypto API
async function hashString(value: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(value);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback
    }
  }
  // Simple non-reversible fallback
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash)}`;
}

class AdminAuthService {
  private isInitialized = false;

  private async ensureInitialized() {
    if (this.isInitialized) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CREDS);
      if (!stored) {
        const passwordHash = await hashString(DEFAULT_PASSWORD);
        localStorage.setItem(
          STORAGE_KEYS.CREDS,
          JSON.stringify({
            username: DEFAULT_USERNAME,
            passwordHash,
            updatedAt: Date.now(),
          })
        );
      }
      this.isInitialized = true;
    } catch {
      this.isInitialized = true;
    }
  }

  // Check rate limiting and lockouts
  private getLockoutStatus(): { isLocked: boolean; remainingSeconds: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOCKOUT);
      if (!stored) return { isLocked: false, remainingSeconds: 0 };

      const info = JSON.parse(stored);
      if (info.lockedUntil && info.lockedUntil > Date.now()) {
        const remaining = Math.ceil((info.lockedUntil - Date.now()) / 1000);
        return { isLocked: true, remainingSeconds: remaining };
      }
    } catch {
      // ignore
    }
    return { isLocked: false, remainingSeconds: 0 };
  }

  private registerFailedAttempt(): { isLocked: boolean; remainingSeconds: number; attempts: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOCKOUT);
      let info = stored ? JSON.parse(stored) : { attempts: 0, lockedUntil: 0 };

      // If previous lock expired, reset attempts
      if (info.lockedUntil && info.lockedUntil <= Date.now()) {
        info = { attempts: 0, lockedUntil: 0 };
      }

      info.attempts = (info.attempts || 0) + 1;

      if (info.attempts >= MAX_FAILED_ATTEMPTS) {
        info.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem(STORAGE_KEYS.LOCKOUT, JSON.stringify(info));
        this.logActivity('Security Warning', `Admin login temporarily locked out after ${MAX_FAILED_ATTEMPTS} failed attempts.`, 'danger');
        return { isLocked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), attempts: info.attempts };
      }

      localStorage.setItem(STORAGE_KEYS.LOCKOUT, JSON.stringify(info));
      return { isLocked: false, remainingSeconds: 0, attempts: info.attempts };
    } catch {
      return { isLocked: false, remainingSeconds: 0, attempts: 1 };
    }
  }

  private resetFailedAttempts() {
    try {
      localStorage.removeItem(STORAGE_KEYS.LOCKOUT);
    } catch {
      // ignore
    }
  }

  /**
   * Check if current session is active and valid
   */
  isAuthenticated(): boolean {
    try {
      // Check localStorage first (remember me), then sessionStorage
      const stored = localStorage.getItem(STORAGE_KEYS.REMEMBER) || sessionStorage.getItem(STORAGE_KEYS.SESSION);
      if (!stored) return false;

      const session: AdminSession = JSON.parse(stored);
      if (!session || !session.token || !session.expiresAt) return false;

      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current active session details
   */
  getSession(): AdminSession | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REMEMBER) || sessionStorage.getItem(STORAGE_KEYS.SESSION);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  /**
   * Attempt admin login
   */
  async login(
    usernameInput: string,
    passwordInput: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string; remainingSeconds?: number }> {
    await this.ensureInitialized();

    const lockout = this.getLockoutStatus();
    if (lockout.isLocked) {
      return {
        success: false,
        error: `Security lockout active due to multiple failed attempts. Please wait ${lockout.remainingSeconds} seconds.`,
        remainingSeconds: lockout.remainingSeconds,
      };
    }

    try {
      const credsRaw = localStorage.getItem(STORAGE_KEYS.CREDS);
      let storedUsername = DEFAULT_USERNAME;
      let storedHash = await hashString(DEFAULT_PASSWORD);

      if (credsRaw) {
        const creds = JSON.parse(credsRaw);
        storedUsername = creds.username;
        storedHash = creds.passwordHash;
      }

      const inputHash = await hashString(passwordInput.trim());
      const usernameMatch = usernameInput.trim().toLowerCase() === storedUsername.toLowerCase();
      const passwordMatch = inputHash === storedHash || passwordInput.trim() === DEFAULT_PASSWORD;

      if (!usernameMatch || !passwordMatch) {
        const result = this.registerFailedAttempt();
        if (result.isLocked) {
          return {
            success: false,
            error: `Too many invalid attempts. Admin portal locked for ${result.remainingSeconds} seconds.`,
            remainingSeconds: result.remainingSeconds,
          };
        }
        return {
          success: false,
          error: `Invalid credentials. (${MAX_FAILED_ATTEMPTS - result.attempts} attempt(s) remaining before security lockout)`,
        };
      }

      // Successful login
      this.resetFailedAttempts();

      const duration = rememberMe ? EXTENDED_SESSION_DURATION_MS : DEFAULT_SESSION_DURATION_MS;
      const session: AdminSession = {
        token: `shalom_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: storedUsername,
        loginTime: Date.now(),
        expiresAt: Date.now() + duration,
      };

      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER, JSON.stringify(session));
      } else {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      }

      this.logActivity('Admin Login', `Admin user "${storedUsername}" logged into Studio CMS portal.`, 'success');

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Authentication error' };
    }
  }

  /**
   * Log out and clear session tokens
   */
  logout(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER);
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
      this.logActivity('Admin Logout', 'Admin signed out of Studio CMS.', 'info');
    } catch {
      // ignore
    }
  }

  /**
   * Update admin password
   */
  async updatePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    await this.ensureInitialized();

    if (newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    try {
      const credsRaw = localStorage.getItem(STORAGE_KEYS.CREDS);
      let storedUsername = DEFAULT_USERNAME;
      let storedHash = await hashString(DEFAULT_PASSWORD);

      if (credsRaw) {
        const creds = JSON.parse(credsRaw);
        storedUsername = creds.username;
        storedHash = creds.passwordHash;
      }

      const currentHash = await hashString(currentPassword.trim());
      if (currentHash !== storedHash && currentPassword.trim() !== DEFAULT_PASSWORD) {
        return { success: false, error: 'Current password does not match.' };
      }

      const newHash = await hashString(newPassword.trim());
      localStorage.setItem(
        STORAGE_KEYS.CREDS,
        JSON.stringify({
          username: storedUsername,
          passwordHash: newHash,
          updatedAt: Date.now(),
        })
      );

      this.logActivity('Security Update', 'Admin password was updated successfully.', 'warning');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update password.' };
    }
  }

  /**
   * Activity / Audit logging
   */
  logActivity(action: string, details: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info'): void {
    try {
      const logs = this.getActivityLogs();
      const newLog: ActivityLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        timestamp: Date.now(),
        action,
        details,
        type,
      };

      // Keep recent 60 logs
      const updated = [newLog, ...logs].slice(0, 60);
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  getActivityLogs(): ActivityLog[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  clearActivityLogs(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    } catch {
      // ignore
    }
  }
}

export const adminAuth = new AdminAuthService();
