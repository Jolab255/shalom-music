import type { Song } from '../types/song';
import simpleAudio from '../assets/simple instrumental.mp3';
import classicalAudio from '../assets/weka alama soundtrack.mp3';
import orchestralAudio from '../assets/Ochestro.mp3';

import harmonyImg from '../assets/harmony.png';
import livingLightImg from '../assets/living_light.png';
import accendoImg from '../assets/accendo.png';
import barrettImg from '../assets/barrett.jpg';
import classicalImg from '../assets/classical-instrumental.png';
import orchestralImg from '../assets/orchestral-instrumental.png';

const DB_NAME = 'ShalomMusicDB';
const DB_VERSION = 2;          // v2: added dedicated blobAudio object store
const STORE_NAME = 'songs';
const BLOB_STORE_NAME = 'blobAudio'; // separate store keyed by songId for raw audio Blobs

// Track active blob: URLs so we can revoke stale ones on each reload
let _activeBlobUrls: Map<string, string> = new Map(); // songId → blobUrl

export const SONGS_UPDATED_EVENT = 'shalom_songs_updated';

// Default initial seed songs representing Shalom Music artists and studio productions
export const DEFAULT_SONGS: Song[] = [
  {
    id: 'seed-harmony-01',
    title: 'Wastahili Sifa (Live Acoustic)',
    artist: 'The Harmony TZ',
    album: 'Heavenly Harmonies Vol. 1',
    genre: 'Contemporary Christian',
    copyright: '© 2026 Shalom Music Studios & The Harmony TZ. All rights reserved.',
    description: 'A breathtaking live acoustic worship ballad captured inside Shalom Music Studio A, featuring warm acoustic grand piano and hybrid stereo mixing.',
    coverUrl: harmonyImg,
    audioUrl: classicalAudio,
    duration: 215,
    fileSize: 5240000,
    fileFormat: 'mp3',
    featuredInClientsSay: true,
    clientSayOrder: 1,
    clientSayQuote: 'Finding a studio with elite quality and actual heart is rare. From day one, customer care was incredibly warm and supportive.',
    clientSayLocation: 'Chuo Kikuu SDA Church',
    createdAt: Date.now() - 40000000,
    updatedAt: Date.now() - 40000000,
  },
  {
    id: 'seed-livinglight-02',
    title: 'Msalaba Wa Mwokozi (Choral Anthem)',
    artist: 'The Living Light Tanzania',
    album: 'Sauti Ya Tumaini EP',
    genre: 'Choral & Classical',
    copyright: '© 2026 Shalom Music Studios. Master rights reserved.',
    description: 'Dynamic 32-voice choral recording tracked through our multi-pattern valve condensers with lush analog reverb and wide stereo panning.',
    coverUrl: livingLightImg,
    audioUrl: orchestralAudio,
    duration: 254,
    fileSize: 6450000,
    fileFormat: 'mp3',
    featuredInClientsSay: true,
    clientSayOrder: 2,
    clientSayQuote: 'Shalom Music Studios is more than just a studio; they are a family that walks with you with unmatched patience and hospitality.',
    clientSayLocation: 'Chuo Kikuu SDA Church',
    createdAt: Date.now() - 30000000,
    updatedAt: Date.now() - 30000000,
  },
  {
    id: 'seed-accendo-03',
    title: 'Neema Yako (Acapella Master)',
    artist: 'Accendo Music',
    album: 'Pure Harmonies',
    genre: 'Acapella & Gospel',
    copyright: '© 2026 Shalom Music Studios & Accendo Music.',
    description: 'Pristine 6-part acapella vocal tracking showcasing pinpoint vocal clarity, balanced micro-dynamics, and harmonic richness.',
    coverUrl: accendoImg,
    audioUrl: simpleAudio,
    duration: 188,
    fileSize: 4120000,
    fileFormat: 'mp3',
    featuredInClientsSay: true,
    clientSayOrder: 3,
    clientSayQuote: 'Every session at Shalom Music Studios feels like a masterclass in vocal production. They captured the true essence of our harmonies.',
    clientSayLocation: 'Chuo Kikuu SDA Church',
    createdAt: Date.now() - 20000000,
    updatedAt: Date.now() - 20000000,
  },
  {
    id: 'seed-barrett-04',
    title: 'Tabibu Wa Moyo Wangu',
    artist: 'Barrett Mapunda',
    album: 'Safari Ya Imani',
    genre: 'Gospel & Live Band',
    copyright: '© 2026 Shalom Music Studios. All rights reserved.',
    description: 'Uplifting gospel praise track with dynamic live drums, vintage bass lines, acoustic guitar arpeggios, and expressive lead vocals.',
    coverUrl: barrettImg,
    audioUrl: classicalAudio,
    duration: 278,
    fileSize: 7120000,
    fileFormat: 'mp3',
    featuredInClientsSay: true,
    clientSayOrder: 4,
    clientSayQuote: 'Their state-of-the-art live room and capture technology brought our songs to life exactly as we envisioned. Truly the gold standard.',
    clientSayLocation: 'Dar es Salaam, Tanzania',
    createdAt: Date.now() - 10000000,
    updatedAt: Date.now() - 10000000,
  },
  {
    id: 'seed-orchestral-05',
    title: 'Symphony of Zion (Cinematic Overture)',
    artist: 'Shalom Studio Philharmonic',
    album: 'Cinematic Scoring Vol. 2',
    genre: 'Orchestral & Cinematic',
    copyright: '© 2026 Shalom Music Studios. Global sync license.',
    description: 'A soaring orchestral suite with resonant brass, sweeping cellos, concert grand piano, and percussion designed for film & dramatic media.',
    coverUrl: orchestralImg,
    audioUrl: orchestralAudio,
    duration: 312,
    fileSize: 7890000,
    fileFormat: 'wav',
    featuredInClientsSay: false,
    clientSayOrder: 5,
    clientSayQuote: 'Breathtaking cinematic scale that elevates our visual production to an international cinematic realm.',
    clientSayLocation: 'Arusha, Tanzania',
    createdAt: Date.now() - 5000000,
    updatedAt: Date.now() - 5000000,
  },
  {
    id: 'seed-classical-06',
    title: 'Serenade in D Minor for Grand Piano',
    artist: 'Shalom Academy Virtuosos',
    album: 'Acoustic Elegance',
    genre: 'Classical Instrumental',
    copyright: '© 2026 Shalom Music Studios.',
    description: 'Recorded live on our Steinway & Sons Concert Grand Piano in Studio 1 using stereo matched pair microphones for natural room acoustics.',
    coverUrl: classicalImg,
    audioUrl: simpleAudio,
    duration: 195,
    fileSize: 4890000,
    fileFormat: 'mp3',
    featuredInClientsSay: false,
    clientSayOrder: 6,
    clientSayQuote: 'Pure acoustic elegance and precision touch.',
    clientSayLocation: 'Shalom Academy Studio',
    createdAt: Date.now() - 2000000,
    updatedAt: Date.now() - 2000000,
  }
];

// Open IndexedDB database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('clientSayOrder', 'clientSayOrder', { unique: false });
        store.createIndex('featuredInClientsSay', 'featuredInClientsSay', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
      // v2: dedicated store for audio Blobs (keyed by songId) — avoids storing
      // huge base64 strings in the songs store and prevents player issues
      if (!db.objectStoreNames.contains(BLOB_STORE_NAME)) {
        db.createObjectStore(BLOB_STORE_NAME, { keyPath: 'id' }); // { id: songId, blob: Blob }
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// In-memory / localStorage cache fallback in case IndexedDB fails or is unavailable
const STORAGE_KEY = 'shalom_music_songs_meta';

function getLocalFallback(): Song[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveLocalFallback(songs: Song[]) {
  try {
    // Strip heavy binary fields if any before saving in localStorage
    const lightweight = songs.map(s => ({
      ...s,
      audioBlob: undefined,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
  } catch {
    // localStorage quota might be reached, silently catch
  }
}

function notifyUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SONGS_UPDATED_EVENT));
  }
}

const SEEDED_KEY = 'shalom_music_seeded_v2';

// Initialize seed data only on first visit / install, not when user deliberately empties the library
async function ensureSeedData(db: IDBDatabase): Promise<Song[]> {
  const isAlreadySeeded = localStorage.getItem(SEEDED_KEY);

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const countReq = store.count();

    countReq.onsuccess = async () => {
      if (countReq.result === 0 && !isAlreadySeeded) {
        // First-time seed of initial sample tracks
        try {
          const writeTx = db.transaction(STORE_NAME, 'readwrite');
          const writeStore = writeTx.objectStore(STORE_NAME);
          for (const s of DEFAULT_SONGS) {
            writeStore.put(s);
          }
          writeTx.oncomplete = () => {
            localStorage.setItem(SEEDED_KEY, 'true');
            saveLocalFallback(DEFAULT_SONGS);
            resolve(DEFAULT_SONGS);
          };
          writeTx.onerror = () => reject(writeTx.error);
        } catch (e) {
          reject(e);
        }
      } else {
        // Mark seeded flag if count is already > 0 so subsequent deletes won't re-seed
        if (countReq.result > 0) {
          localStorage.setItem(SEEDED_KEY, 'true');
        }
        // Fetch all current songs (may be empty if user deleted all)
        const getAllReq = store.getAll();
        getAllReq.onsuccess = () => resolve(getAllReq.result || []);
        getAllReq.onerror = () => reject(getAllReq.error);
      }
    };

    countReq.onerror = () => reject(countReq.error);
  });
}

const API_URL = '/songs-api.php';

export type UploadProgressCallback = (percent: number, loadedBytes: number, totalBytes: number) => void;

function uploadFormDataWithProgress(
  formData: FormData,
  onProgress?: UploadProgressCallback
): Promise<{ ok: boolean; data?: Song }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && event.total > 0) {
          const percent = Math.min(100, Math.round((event.loaded / event.total) * 100));
          onProgress(percent, event.loaded, event.total);
        }
      };
    }

    xhr.onload = () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const json = JSON.parse(xhr.responseText);
          if (json && json.success && json.data) {
            if (onProgress) onProgress(100, 100, 100);
            resolve({ ok: true, data: json.data });
            return;
          }
        }
      } catch {
        // Fall through
      }
      resolve({ ok: false });
    };

    xhr.onerror = () => {
      resolve({ ok: false });
    };

    xhr.send(formData);
  });
}

export const songStorage = {
  /**
   * Retrieve all songs sorted by created date descending.
   * Fetches from server API first; falls back to local IndexedDB/cache if offline.
   */
  async getAllSongs(): Promise<Song[]> {
    let serverSongs: Song[] | null = null;
    try {
      const response = await fetch(`${API_URL}?t=${Date.now()}`);
      if (response.ok) {
        const json = await response.json();
        if (json && json.success && Array.isArray(json.data)) {
          serverSongs = json.data;
        }
      }
    } catch {
      // Server API unreachable or running on local dev
    }

    try {
      const db = await openDB();
      const songs = await ensureSeedData(db);

      // Revoke all previous blob URLs to avoid memory leaks
      _activeBlobUrls.forEach((url) => URL.revokeObjectURL(url));
      _activeBlobUrls = new Map();

      // Resolve audio blob → blob URL for any uploaded song that has one
      const resolved = await Promise.all(
        songs.map((song) =>
          new Promise<Song>((res) => {
            if (song.id.startsWith('seed-') || song.audioUrl.startsWith('http') || song.audioUrl.startsWith('/uploads/')) {
              res(song);
              return;
            }

            const tx = db.transaction(BLOB_STORE_NAME, 'readonly');
            const store = tx.objectStore(BLOB_STORE_NAME);
            const req = store.get(song.id);

            req.onsuccess = () => {
              const record = req.result as { id: string; blob: Blob } | undefined;
              if (record?.blob) {
                const prevUrl = _activeBlobUrls.get(song.id);
                if (prevUrl) URL.revokeObjectURL(prevUrl);

                const blobUrl = URL.createObjectURL(record.blob);
                _activeBlobUrls.set(song.id, blobUrl);
                res({ ...song, audioUrl: blobUrl });
              } else {
                res(song);
              }
            };

            req.onerror = () => res(song);
          })
        )
      );

      // If server returned songs, merge them with any local songs (prefer local blob URLs if present)
      let combined = resolved;
      if (serverSongs && Array.isArray(serverSongs)) {
        const localMap = new Map(resolved.map((s) => [s.id, s]));
        const merged: Song[] = [];

        for (const s of serverSongs) {
          if (localMap.has(s.id)) {
            // Keep local version if it has active blob URL
            const local = localMap.get(s.id)!;
            merged.push(local.audioUrl.startsWith('blob:') ? local : s);
            localMap.delete(s.id);
          } else {
            merged.push(s);
          }
        }

        // Include any newly added local songs not yet on the server
        localMap.forEach((localSong) => {
          if (!localSong.id.startsWith('seed-')) {
            merged.push(localSong);
          }
        });

        combined = merged;
      }

      saveLocalFallback(combined);
      return combined.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch {
      if (serverSongs && Array.isArray(serverSongs)) {
        saveLocalFallback(serverSongs);
        return serverSongs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      const fallback = getLocalFallback();
      if (fallback !== null) return fallback;
      return localStorage.getItem(SEEDED_KEY) ? [] : DEFAULT_SONGS;
    }
  },

  /**
   * Retrieve songs that are enabled for "What Our Clients Say", sorted by clientSayOrder
   */
  async getClientsSaySongs(): Promise<Song[]> {
    const all = await this.getAllSongs();
    return all
      .filter((s) => s.featuredInClientsSay)
      .sort((a, b) => (a.clientSayOrder ?? 999) - (b.clientSayOrder ?? 999));
  },

  /**
   * Save a newly uploaded song to server API and local store.
   */
  async addSong(song: Song, onProgress?: UploadProgressCallback): Promise<Song> {
    const audioBlob = song.audioBlob || song.audioFile;
    let savedSong: Song = { ...song };

    // 1. Upload to server API via FormData with real-time progress
    try {
      const formData = new FormData();
      formData.append('id', song.id);
      formData.append('title', song.title);
      formData.append('artist', song.artist);
      formData.append('album', song.album);
      formData.append('genre', song.genre);
      formData.append('copyright', song.copyright);
      formData.append('description', song.description);
      formData.append('duration', String(song.duration));
      formData.append('featuredInClientsSay', String(song.featuredInClientsSay));
      formData.append('clientSayOrder', String(song.clientSayOrder));
      if (song.clientSayQuote) formData.append('clientSayQuote', song.clientSayQuote);
      if (song.clientSayLocation) formData.append('clientSayLocation', song.clientSayLocation);
      if (song.audioUrl) formData.append('existingAudioUrl', song.audioUrl);
      if (song.coverUrl) formData.append('coverUrl', song.coverUrl);

      if (song.audioFile) {
        formData.append('audioFile', song.audioFile, song.audioFile.name);
      }
      if (song.coverFile) {
        formData.append('coverFile', song.coverFile, song.coverFile.name);
      }

      const res = await uploadFormDataWithProgress(formData, onProgress);
      if (res.ok && res.data) {
        savedSong = res.data;
      }
    } catch {
      // Fallback locally if network fails
    }

    // 2. Local database cache backup
    const meta: Song = {
      ...savedSong,
      audioBlob: undefined,
      audioFile: undefined,
      coverFile: undefined,
      audioUrl: audioBlob ? (savedSong.audioUrl || '') : savedSong.audioUrl,
    };

    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(meta);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });

      if (audioBlob) {
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(BLOB_STORE_NAME, 'readwrite');
          const store = tx.objectStore(BLOB_STORE_NAME);
          store.put({ id: meta.id, blob: audioBlob });
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }

      const all = await this.getAllSongs();
      saveLocalFallback(all);
    } catch {
      const current = (await this.getAllSongs()) || [];
      const updated = [meta, ...current.filter((s) => s.id !== meta.id)];
      saveLocalFallback(updated);
    }

    notifyUpdated();
    return savedSong;
  },

  /**
   * Update an existing song's metadata or status
   */
  async updateSong(song: Song, onProgress?: UploadProgressCallback): Promise<Song> {
    const updatedSong: Song = {
      ...song,
      updatedAt: Date.now(),
    };

    // Update on server API with real-time progress
    try {
      const formData = new FormData();
      formData.append('id', updatedSong.id);
      formData.append('title', updatedSong.title);
      formData.append('artist', updatedSong.artist);
      formData.append('album', updatedSong.album);
      formData.append('genre', updatedSong.genre);
      formData.append('copyright', updatedSong.copyright);
      formData.append('description', updatedSong.description);
      formData.append('duration', String(updatedSong.duration));
      formData.append('featuredInClientsSay', String(updatedSong.featuredInClientsSay));
      formData.append('clientSayOrder', String(updatedSong.clientSayOrder));
      if (updatedSong.clientSayQuote) formData.append('clientSayQuote', updatedSong.clientSayQuote);
      if (updatedSong.clientSayLocation) formData.append('clientSayLocation', updatedSong.clientSayLocation);
      if (updatedSong.audioUrl) formData.append('existingAudioUrl', updatedSong.audioUrl);
      if (updatedSong.coverUrl) formData.append('coverUrl', updatedSong.coverUrl);

      if (song.audioFile) {
        formData.append('audioFile', song.audioFile, song.audioFile.name);
      }
      if (song.coverFile) {
        formData.append('coverFile', song.coverFile, song.coverFile.name);
      }

      const res = await uploadFormDataWithProgress(formData, onProgress);
      if (res.ok && res.data) {
        Object.assign(updatedSong, res.data);
      }
    } catch {
      // Continue locally
    }

    // Update local cache
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(updatedSong);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      const all = await this.getAllSongs();
      saveLocalFallback(all);
    } catch {
      const current = (await this.getAllSongs()) || [];
      const updated = current.map((s) => (s.id === song.id ? updatedSong : s));
      saveLocalFallback(updated);
    }

    notifyUpdated();
    return updatedSong;
  },

  /**
   * Delete a song by id — deletes from server API and local caches
   */
  async deleteSong(id: string): Promise<void> {
    // 1. Delete on server API
    try {
      await fetch(`${API_URL}?action=delete&id=${encodeURIComponent(id)}`, {
        method: 'POST',
      });
    } catch {
      // Continue locally
    }

    // 2. Revoke blob URL
    const blobUrl = _activeBlobUrls.get(id);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      _activeBlobUrls.delete(id);
    }

    // 3. Delete from local IndexedDB & localStorage
    try {
      const db = await openDB();

      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });

      await new Promise<void>((resolve) => {
        const tx = db.transaction(BLOB_STORE_NAME, 'readwrite');
        const store = tx.objectStore(BLOB_STORE_NAME);
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });

      const all = await this.getAllSongs();
      saveLocalFallback(all);
    } catch {
      const current = (await this.getAllSongs()) || [];
      const updated = current.filter((s) => s.id !== id);
      saveLocalFallback(updated);
    }

    notifyUpdated();
  },

  /**
   * Reorder songs for the "What Our Clients Say" section
   */
  async reorderClientsSaySongs(orderedIds: string[]): Promise<void> {
    const all = await this.getAllSongs();
    for (let i = 0; i < orderedIds.length; i++) {
      const song = all.find((s) => s.id === orderedIds[i]);
      if (song) {
        song.clientSayOrder = i + 1;
        await this.updateSong(song);
      }
    }
    notifyUpdated();
  },

  /**
   * Reset store back to empty or studio seed list
   */
  async resetToDefaults(): Promise<Song[]> {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.clear();
        for (const s of DEFAULT_SONGS) {
          store.put(s);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      saveLocalFallback(DEFAULT_SONGS);
    } catch {
      saveLocalFallback(DEFAULT_SONGS);
    }
    notifyUpdated();
    return DEFAULT_SONGS;
  },
};

/**
 * Fast cached typeahead search engine for songs:
 * Indexes tokens across title, artist, album, genre, copyright, description
 */
export class SongSearchCache {
  private songs: Song[] = [];
  private tokenIndex: Map<string, Set<string>> = new Map();

  constructor(songs: Song[] = []) {
    this.updateIndex(songs);
  }

  public updateIndex(songs: Song[]) {
    this.songs = songs;
    this.tokenIndex.clear();

    for (const song of songs) {
      const combined = `${song.title} ${song.artist} ${song.album} ${song.genre} ${song.description}`.toLowerCase();
      const tokens = combined.split(/[\s,.\-_/\\()]+/).filter(Boolean);

      for (const token of tokens) {
        for (let len = 1; len <= token.length; len++) {
          const prefix = token.slice(0, len);
          if (!this.tokenIndex.has(prefix)) {
            this.tokenIndex.set(prefix, new Set());
          }
          this.tokenIndex.get(prefix)!.add(song.id);
        }
      }
    }
  }

  /**
   * Query the cached index for instant live results
   */
  public search(query: string): Song[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return this.songs;

    const queryTokens = trimmed.split(/[\s,.\-_/\\()]+/).filter(Boolean);
    if (queryTokens.length === 0) return this.songs;

    // Intersect or match matching song ids
    const matchScores = new Map<string, number>();

    for (const song of this.songs) {
      let score = 0;
      const titleLower = song.title.toLowerCase();
      const artistLower = song.artist.toLowerCase();
      const albumLower = song.album.toLowerCase();
      const genreLower = song.genre.toLowerCase();

      for (const q of queryTokens) {
        if (titleLower.startsWith(q)) score += 100;
        else if (titleLower.includes(q)) score += 50;

        if (artistLower.startsWith(q)) score += 80;
        else if (artistLower.includes(q)) score += 40;

        if (albumLower.includes(q)) score += 30;
        if (genreLower.includes(q)) score += 25;
      }

      if (score > 0) {
        matchScores.set(song.id, score);
      }
    }

    return this.songs
      .filter((s) => matchScores.has(s.id))
      .sort((a, b) => (matchScores.get(b.id) || 0) - (matchScores.get(a.id) || 0));
  }
}
