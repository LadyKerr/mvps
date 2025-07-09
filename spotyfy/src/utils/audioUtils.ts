// This is a simple sine wave generator for testing audio playback
// We'll use the Web Audio API to generate test tones

export const generateTestAudio = (frequency: number, duration: number): string => {
  // Create an audio context
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create a buffer
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a sine wave
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.1;
  }
  
  // Convert to data URL (this is simplified - in reality you'd need to encode to WAV/MP3)
  // For now, we'll return a placeholder
  return `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+b2u2UIEm+z9eSVTS0JCmag79+vVgEKDFOh29vNfC0BvLDl6pxKHgiCvfz12X4jCgWHwu3LgzEDCJG/68+8igM8jLm05bJqHQpTmtK76XckAb6w5d1+IgRSl9i13Gs4C2K07tqrXRIII2vG9+GcTwsdY7np5KdRVyIIFGO+6OGbQRMFJWPH+OCYTwgfZrPo564/IweYm2GxgAoKAtqHYNRAFglsqf/eswYJnmOq3fWnGQxHnN3z4JhG4oLJAcNkOQhLo+HTuQkRE2jBsVNhIjH8OuzhDBGAVCTwjNhZGXdZeKKEhE7F12F3AgnVfvTCDBGHQzDrxH0qCBjJdE9wZJdTCMwL+HgBJfWWJXRf/TAAOIGLdoQpYwOZE8tQNGEMYAGFaAwMnM4xvj4EQQJGnSTlvUDvQANNGKEIZWABiGi9OVSEyJnl8FJTDAhZaQfPAh9uJa7fhXINY3eNaRa0UlIMmxfIkLjRq1lGmNmhzDKJA4ICY4aaLJC0TTrJNtSCWd3Rj0t5Bzu+KVk9eXv0Kl0JLiMjBH2A1GjKwN1eINdZXZ5UD1pJWaNKEhI0cOaVJk0Zq9Tj`; // Truncated base64 for brevity
};
