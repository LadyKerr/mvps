import type { Song, Playlist } from '../types/index';

// Sample songs with working audio URLs (using royalty-free samples)
export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=1',
    audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=2',
    audioUrl: 'https://file-examples.com/storage/fe68c8b7c566e447d2ccd4d/2017/11/file_example_MP3_700KB.mp3',
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=3',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=4',
    audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    genre: 'Pop Rock'
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3+',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=5',
    audioUrl: 'https://file-examples.com/storage/fe68c8b7c566e447d2ccd4d/2017/11/file_example_MP3_700KB.mp3',
    genre: 'Hip Hop'
  },
  {
    id: '6',
    title: 'Industry Baby',
    artist: 'Lil Nas X & Jack Harlow',
    album: 'MONTERO',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=6',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Hip Hop'
  },
  {
    id: '7',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=7',
    audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    genre: 'Alternative'
  },
  {
    id: '8',
    title: 'Bad Habits',
    artist: 'Ed Sheeran',
    album: '=',
    duration: 30,
    coverUrl: 'https://picsum.photos/400/400?random=8',
    audioUrl: 'https://file-examples.com/storage/fe68c8b7c566e447d2ccd4d/2017/11/file_example_MP3_700KB.mp3',
    genre: 'Pop'
  }
];

export const samplePlaylists: Playlist[] = [
  {
    id: 'pl1',
    name: 'My Favorites',
    songs: [sampleSongs[0], sampleSongs[2], sampleSongs[4]],
    coverUrl: 'https://picsum.photos/400/400?random=100',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'pl2',
    name: 'Chill Vibes',
    songs: [sampleSongs[1], sampleSongs[6], sampleSongs[7]],
    coverUrl: 'https://picsum.photos/400/400?random=101',
    createdAt: new Date('2024-02-20')
  },
  {
    id: 'pl3',
    name: 'Workout Mix',
    songs: [sampleSongs[3], sampleSongs[5]],
    coverUrl: 'https://picsum.photos/400/400?random=102',
    createdAt: new Date('2024-03-10')
  }
];

// Utility function to format duration
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Utility function to search songs
export const searchSongs = (songs: Song[], query: string): Song[] => {
  if (!query.trim()) return songs;
  
  const lowercaseQuery = query.toLowerCase();
  return songs.filter(song =>
    song.title.toLowerCase().includes(lowercaseQuery) ||
    song.artist.toLowerCase().includes(lowercaseQuery) ||
    song.album.toLowerCase().includes(lowercaseQuery) ||
    song.genre?.toLowerCase().includes(lowercaseQuery)
  );
};
