export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverUrl?: string;
  createdAt: Date;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  queue: Song[];
  currentIndex: number;
}

export interface AppState {
  songs: Song[];
  playlists: Playlist[];
  player: PlayerState;
  searchQuery: string;
  searchResults: Song[];
}
