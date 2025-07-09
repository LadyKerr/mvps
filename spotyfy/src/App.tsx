import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { SongList } from './components/SongList';
import { Search } from './components/Search';
import { Queue } from './components/Queue';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { sampleSongs, samplePlaylists, searchSongs } from './data/sampleData';
import type { Song, Playlist } from './types/index';
import './App.css';

// Simple ID generator to avoid crypto issues
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

function App() {
  const [songs] = useState(sampleSongs);
  const [playlists, setPlaylists] = useState(samplePlaylists);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const {
    playerState,
    togglePlayPause,
    setVolume,
    seekTo,
    setQueue,
    skipToNext,
    skipToPrevious,
    addToQueue,
    removeFromQueue
  } = useAudioPlayer();

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchSongs(songs, searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, songs]);

  const handleSongSelect = (song: Song, songList: Song[], index: number) => {
    if (playerState.currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      setQueue(songList, index);
    }
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedPlaylist(null);
  };

  const handlePlaylistSelect = (playlist: Playlist) => {
    setCurrentView(`playlist-${playlist.id}`);
    setSelectedPlaylist(playlist);
  };

  const handleCreatePlaylist = () => {
    const newPlaylist: Playlist = {
      id: generateId(),
      name: `My Playlist #${playlists.length + 1}`,
      songs: [],
      createdAt: new Date()
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    handlePlaylistSelect(newPlaylist);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'search':
        return (
          <div className="main-content">
            <h1 className="page-title">Search</h1>
            <Search 
              query={searchQuery}
              onQueryChange={setSearchQuery}
            />
            <SongList 
              songs={searchQuery ? searchResults : songs}
              currentSong={playerState.currentSong}
              isPlaying={playerState.isPlaying}
              onSongSelect={handleSongSelect}
              onAddToQueue={addToQueue}
            />
          </div>
        );
      
      case 'queue':
        return (
          <div className="main-content">
            <Queue 
              queue={playerState.queue}
              currentIndex={playerState.currentIndex}
              onRemoveFromQueue={removeFromQueue}
              onSongSelect={handleSongSelect}
            />
          </div>
        );
      
      default:
        if (currentView.startsWith('playlist-') && selectedPlaylist) {
          return (
            <div className="main-content">
              <h1 className="page-title">{selectedPlaylist.name}</h1>
              <p className="playlist-info">
                {selectedPlaylist.songs.length} songs
              </p>
              <SongList 
                songs={selectedPlaylist.songs}
                currentSong={playerState.currentSong}
                isPlaying={playerState.isPlaying}
                onSongSelect={handleSongSelect}
                onAddToQueue={addToQueue}
                showAddToQueue={false}
              />
            </div>
          );
        }
        
        return (
          <div className="main-content">
            <h1 className="page-title">Browse Music</h1>
            <SongList 
              songs={songs}
              currentSong={playerState.currentSong}
              isPlaying={playerState.isPlaying}
              onSongSelect={handleSongSelect}
              onAddToQueue={addToQueue}
            />
          </div>
        );
    }
  };

  return (
    <div className="app">
      <Sidebar 
        playlists={playlists}
        currentView={currentView}
        onViewChange={handleViewChange}
        onPlaylistSelect={handlePlaylistSelect}
        onCreatePlaylist={handleCreatePlaylist}
      />
      
      <main className="main">
        {renderMainContent()}
      </main>
      
      <Player 
        playerState={playerState}
        onTogglePlayPause={togglePlayPause}
        onSkipNext={skipToNext}
        onSkipPrevious={skipToPrevious}
        onVolumeChange={setVolume}
        onSeek={seekTo}
      />
    </div>
  );
}

export default App;
