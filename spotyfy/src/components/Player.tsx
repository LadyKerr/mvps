import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import type { PlayerState } from '../types/index';
import { formatDuration } from '../data/sampleData';
import './Player.css';

interface PlayerProps {
  playerState: PlayerState;
  onTogglePlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
}

export const Player = ({
  playerState,
  onTogglePlayPause,
  onSkipNext,
  onSkipPrevious,
  onVolumeChange,
  onSeek
}: PlayerProps) => {
  const { currentSong, isPlaying, volume, currentTime, duration } = playerState;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentSong) {
    return (
      <div className="player player--empty">
        <div className="player__message">
          Select a song to start playing
        </div>
      </div>
    );
  }

  return (
    <div className="player">
      <div className="player__song-info">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.album}
          className="player__cover"
        />
        <div className="player__details">
          <div className="player__song-title">{currentSong.title}</div>
          <div className="player__artist">{currentSong.artist}</div>
        </div>
      </div>

      <div className="player__controls">
        <div className="player__buttons">
          <button 
            className="player__button"
            onClick={onSkipPrevious}
            disabled={playerState.currentIndex <= 0}
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            className="player__button player__button--play"
            onClick={onTogglePlayPause}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            className="player__button"
            onClick={onSkipNext}
            disabled={playerState.currentIndex >= playerState.queue.length - 1}
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="player__progress">
          <span className="player__time">
            {formatDuration(Math.floor(currentTime))}
          </span>
          <div 
            className="player__progress-bar"
            onClick={handleProgressClick}
          >
            <div 
              className="player__progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="player__time">
            {formatDuration(Math.floor(duration))}
          </span>
        </div>
      </div>

      <div className="player__volume">
        <Volume2 size={16} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="player__volume-slider"
        />
      </div>
    </div>
  );
};
