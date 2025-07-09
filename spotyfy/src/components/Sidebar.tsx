import { Music, Heart, Plus, List } from 'lucide-react';
import type { Playlist } from '../types/index';
import './Sidebar.css';

interface SidebarProps {
  playlists: Playlist[];
  currentView: string;
  onViewChange: (view: string) => void;
  onPlaylistSelect: (playlist: Playlist) => void;
  onCreatePlaylist: () => void;
}

export const Sidebar = ({
  playlists,
  currentView,
  onViewChange,
  onPlaylistSelect,
  onCreatePlaylist
}: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">
          <Music size={24} />
          Spotyfy
        </h1>
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__section">
          <button
            className={`sidebar__nav-item ${currentView === 'home' ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => onViewChange('home')}
          >
            <Music size={20} />
            Browse Music
          </button>
          
          <button
            className={`sidebar__nav-item ${currentView === 'search' ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => onViewChange('search')}
          >
            <Heart size={20} />
            Search
          </button>
          
          <button
            className={`sidebar__nav-item ${currentView === 'queue' ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => onViewChange('queue')}
          >
            <List size={20} />
            Queue
          </button>
        </div>

        <div className="sidebar__section">
          <div className="sidebar__section-header">
            <h3 className="sidebar__section-title">Playlists</h3>
            <button
              className="sidebar__create-button"
              onClick={onCreatePlaylist}
              title="Create new playlist"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="sidebar__playlists">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                className={`sidebar__playlist-item ${currentView === `playlist-${playlist.id}` ? 'sidebar__playlist-item--active' : ''}`}
                onClick={() => onPlaylistSelect(playlist)}
              >
                <div className="sidebar__playlist-info">
                  <div className="sidebar__playlist-name">{playlist.name}</div>
                  <div className="sidebar__playlist-count">
                    {playlist.songs.length} songs
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
