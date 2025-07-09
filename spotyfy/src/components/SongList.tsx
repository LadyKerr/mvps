import { Play, Pause, Plus } from 'lucide-react';
import type { Song } from '../types/index';
import { formatDuration } from '../data/sampleData';
import './SongList.css';

interface SongListProps {
  songs: Song[];
  currentSong?: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song, songs: Song[], index: number) => void;
  onAddToQueue?: (song: Song) => void;
  showAddToQueue?: boolean;
}

export const SongList = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
  onAddToQueue,
  showAddToQueue = true
}: SongListProps) => {
  return (
    <div className="song-list">
      {songs.map((song, index) => {
        const isCurrentSong = currentSong?.id === song.id;
        
        return (
          <div 
            key={song.id}
            className={`song-item ${isCurrentSong ? 'song-item--active' : ''}`}
          >
            <div className="song-item__play">
              <img 
                src={song.coverUrl} 
                alt={song.album}
                className="song-item__cover"
              />
              <button
                className="song-item__play-button"
                onClick={() => onSongSelect(song, songs, index)}
              >
                {isCurrentSong && isPlaying ? (
                  <Pause size={16} />
                ) : (
                  <Play size={16} />
                )}
              </button>
            </div>
            
            <div className="song-item__info">
              <div className="song-item__title">{song.title}</div>
              <div className="song-item__artist">{song.artist}</div>
            </div>
            
            <div className="song-item__album">{song.album}</div>
            
            <div className="song-item__actions">
              {showAddToQueue && onAddToQueue && (
                <button
                  className="song-item__action-button"
                  onClick={() => onAddToQueue(song)}
                  title="Add to queue"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            
            <div className="song-item__duration">
              {formatDuration(song.duration)}
            </div>
          </div>
        );
      })}
      
      {songs.length === 0 && (
        <div className="song-list__empty">
          No songs found
        </div>
      )}
    </div>
  );
};
