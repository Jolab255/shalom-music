export interface Song {
  id: string;
  title: string;              // Name of the song (mandatory)
  artist: string;             // Group / artist who sang the song (mandatory)
  album: string;              // EP / album of the song (mandatory)
  genre: string;              // Genre or category (mandatory)
  copyright: string;          // Song copyright notice (mandatory)
  description: string;        // Short or long description (mandatory)
  coverUrl: string;           // Cover photo (mandatory - Base64 or object URL)
  audioUrl: string;           // Audio source (Base64 data or object URL or bundled asset)
  audioBlob?: Blob;           // Optional raw blob stored in IndexedDB
  fileName?: string;
  fileSize?: number;          // Size in bytes (max 8MB = 8 * 1024 * 1024)
  fileFormat?: 'mp3' | 'm4a' | 'wav' | string;
  duration: number;           // Duration in seconds
  featuredInClientsSay: boolean; // Show in "What Our Clients Say" section
  clientSayOrder: number;     // Order of appearance in "What Our Clients Say"
  clientSayQuote?: string;    // Custom testimonial quote for What Our Clients Say
  clientSayLocation?: string; // Location or institution name for What Our Clients Say
  createdAt: number;
  updatedAt: number;
}

export type AudioPlayerRepeatMode = 'off' | 'all' | 'one';
export const AudioPlayerRepeatMode = {
  Off: 'off',
  All: 'all',
  One: 'one',
} as const;
