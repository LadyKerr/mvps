import { useState, useRef, useEffect } from 'react';
import type { Song, PlayerState } from '../types/index';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    queue: [],
    currentIndex: -1
  });

  useEffect(() => {
    const audio = audioRef.current;
    
    // Set CORS settings
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
    };

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded, duration:', audio.duration);
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration
      }));
    };

    const handleEnded = () => {
      // Skip to next song when current song ends
      setPlayerState(prev => {
        const { queue, currentIndex } = prev;
        if (queue.length > 0 && currentIndex < queue.length - 1) {
          const nextIndex = currentIndex + 1;
          const nextSong = queue[nextIndex];
          
          // Play next song
          const audio = audioRef.current;
          audio.src = nextSong.audioUrl;
          audio.play();
          
          return {
            ...prev,
            currentIndex: nextIndex,
            currentSong: nextSong,
            isPlaying: true
          };
        } else {
          return {
            ...prev,
            isPlaying: false
          };
        }
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSong = (song: Song) => {
    console.log('Attempting to play song:', song.title, 'URL:', song.audioUrl);
    const audio = audioRef.current;
    
    // Reset any previous state
    audio.pause();
    audio.currentTime = 0;
    
    // Set the new source
    audio.src = song.audioUrl;
    
    // Add error handling
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setPlayerState(prev => ({
        ...prev,
        isPlaying: false
      }));
    };
    
    const handleCanPlay = () => {
      console.log('Audio can play, starting playback');
      audio.play().then(() => {
        console.log('Playback started successfully');
      }).catch(err => {
        console.error('Playback failed:', err);
      });
    };
    
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    
    // Load the audio
    audio.load();
    
    setPlayerState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true
    }));
    
    // Clean up event listeners after a timeout
    setTimeout(() => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    }, 5000);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false
    }));
  };

  const resumeSong = () => {
    console.log('Attempting to resume playback');
    audioRef.current.play().then(() => {
      setPlayerState(prev => ({
        ...prev,
        isPlaying: true
      }));
    }).catch(err => {
      console.error('Resume failed:', err);
      setPlayerState(prev => ({
        ...prev,
        isPlaying: false
      }));
    });
  };

  const togglePlayPause = () => {
    if (playerState.isPlaying) {
      pauseSong();
    } else if (playerState.currentSong) {
      resumeSong();
    }
  };

  const setVolume = (volume: number) => {
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    audioRef.current.volume = normalizedVolume;
    setPlayerState(prev => ({
      ...prev,
      volume: normalizedVolume
    }));
  };

  const seekTo = (time: number) => {
    audioRef.current.currentTime = time;
    setPlayerState(prev => ({
      ...prev,
      currentTime: time
    }));
  };

  const setQueue = (songs: Song[], startIndex: number = 0) => {
    setPlayerState(prev => ({
      ...prev,
      queue: songs,
      currentIndex: startIndex
    }));
    
    if (songs.length > 0 && startIndex >= 0 && startIndex < songs.length) {
      playSong(songs[startIndex]);
    }
  };

  const skipToNext = () => {
    const { queue, currentIndex } = playerState;
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setPlayerState(prev => ({
        ...prev,
        currentIndex: nextIndex
      }));
      playSong(queue[nextIndex]);
    }
  };

  const skipToPrevious = () => {
    const { queue, currentIndex } = playerState;
    if (queue.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setPlayerState(prev => ({
        ...prev,
        currentIndex: prevIndex
      }));
      playSong(queue[prevIndex]);
    }
  };

  const addToQueue = (song: Song) => {
    setPlayerState(prev => ({
      ...prev,
      queue: [...prev.queue, song]
    }));
  };

  const removeFromQueue = (index: number) => {
    setPlayerState(prev => {
      const newQueue = prev.queue.filter((_, i) => i !== index);
      let newCurrentIndex = prev.currentIndex;
      
      if (index < prev.currentIndex) {
        newCurrentIndex = prev.currentIndex - 1;
      } else if (index === prev.currentIndex) {
        newCurrentIndex = Math.min(prev.currentIndex, newQueue.length - 1);
      }
      
      return {
        ...prev,
        queue: newQueue,
        currentIndex: newCurrentIndex
      };
    });
  };

  return {
    playerState,
    playSong,
    pauseSong,
    resumeSong,
    togglePlayPause,
    setVolume,
    seekTo,
    setQueue,
    skipToNext,
    skipToPrevious,
    addToQueue,
    removeFromQueue
  };
};
