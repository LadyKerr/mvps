import { X, GripVertical } from 'lucide-react';
import type { Song } from '../types/index';
import { formatDuration } from '../data/sampleData';
import './Queue.css';

interface QueueProps {
  queue: Song[];
  currentIndex: number;
  onRemoveFromQueue: (index: number) => void;
  onSongSelect: (song: Song, songs: Song[], index: number) => void;
}

export const Queue = ({ 
  queue, 
  currentIndex, 
  onRemoveFromQueue,
  onSongSelect 
}: QueueProps) => {
  if (queue.length === 0) {
    return (
      <div className="queue queue--empty">
        <h2 className="queue__title">Queue</h2>
        <div className="queue__empty-message">
          Your queue is empty. Add some songs to get started!
        </div>
      </div>
    );
  }

  return (
    <div className="queue">
      <h2 className="queue__title">Queue</h2>
      
      <div className="queue__sections">
        {currentIndex >= 0 && currentIndex < queue.length && (
          <div className="queue__section">
            <h3 className="queue__section-title">Now Playing</h3>
            <div className="queue__current">
              <div className="queue-item queue-item--current">
                <div className="queue-item__info">
                  <img 
                    src={queue[currentIndex].coverUrl} 
                    alt={queue[currentIndex].album}
                    className="queue-item__cover"
                  />
                  <div className="queue-item__details">
                    <div className="queue-item__title">{queue[currentIndex].title}</div>
                    <div className="queue-item__artist">{queue[currentIndex].artist}</div>
                  </div>
                </div>
                <div className="queue-item__duration">
                  {formatDuration(queue[currentIndex].duration)}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentIndex < queue.length - 1 && (
          <div className="queue__section">
            <h3 className="queue__section-title">Next Up</h3>
            <div className="queue__list">
              {queue.slice(currentIndex + 1).map((song, index) => {
                const actualIndex = currentIndex + 1 + index;
                return (
                  <div key={`${song.id}-${actualIndex}`} className="queue-item">
                    <div className="queue-item__drag">
                      <GripVertical size={16} />
                    </div>
                    
                    <div 
                      className="queue-item__info"
                      onClick={() => onSongSelect(song, queue, actualIndex)}
                    >
                      <img 
                        src={song.coverUrl} 
                        alt={song.album}
                        className="queue-item__cover"
                      />
                      <div className="queue-item__details">
                        <div className="queue-item__title">{song.title}</div>
                        <div className="queue-item__artist">{song.artist}</div>
                      </div>
                    </div>
                    
                    <div className="queue-item__duration">
                      {formatDuration(song.duration)}
                    </div>
                    
                    <button
                      className="queue-item__remove"
                      onClick={() => onRemoveFromQueue(actualIndex)}
                      title="Remove from queue"
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
