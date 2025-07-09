# Spotyfy - Spotify MVP

A modern Spotify-inspired music player built with React, TypeScript, and Vite. This MVP focuses on core music streaming features without authentication.

## 🎵 Features

- **Music Library** - Browse and discover songs, artists, and albums
- **Music Player** - Full-featured player with play/pause, skip, volume, and seek controls
- **Search** - Search for songs, artists, albums, and genres
- **Playlists** - Create and manage custom playlists
- **Queue Management** - View and manage your music queue
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spotyfy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icons
- **HTML5 Audio API** - Music playback
- **CSS Modules** - Styling

## 📱 Usage

### Browsing Music
- The home page displays all available songs
- Click on any song to start playing
- Use the search feature to find specific songs, artists, or albums

### Playing Music
- Click the play button on any song to start playback
- Use the player controls at the bottom to control playback
- Skip tracks, adjust volume, and seek through songs

### Managing Playlists
- Click the "+" button in the sidebar to create a new playlist
- Add songs to playlists using the "+" button on song items
- Click on any playlist in the sidebar to view its contents

### Queue Management
- Click "Queue" in the sidebar to view upcoming songs
- Remove songs from the queue or reorder them
- The queue automatically advances to the next song

## 🎨 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Player.tsx      # Music player controls
│   ├── SongList.tsx    # Song list display
│   ├── Search.tsx      # Search functionality
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Queue.tsx       # Queue management
├── hooks/              # Custom React hooks
│   └── useAudioPlayer.ts # Audio player logic
├── types/              # TypeScript type definitions
│   └── index.ts        # Core types
├── data/               # Sample data and utilities
│   └── sampleData.ts   # Mock music data
└── App.tsx             # Main application component
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Songs

To add new songs to the library, modify the `sampleSongs` array in `src/data/sampleData.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'Album Name',
  duration: 180, // in seconds
  coverUrl: 'https://example.com/cover.jpg',
  audioUrl: 'https://example.com/song.mp3',
  genre: 'Pop'
}
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚠️ Note

This is a demo application using placeholder audio files and images. In a production environment, you would need:

- Proper audio file hosting
- High-quality album artwork
- Music licensing agreements
- User authentication system
- Backend API for music metadata
