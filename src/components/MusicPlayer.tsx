import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { config } from '../config';

export default function MusicPlayer({ startPlaying }: { startPlaying: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (startPlaying && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Autoplay prevented:", e));
    }
  }, [startPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full text-white">
      <audio ref={audioRef} src={config.musicUrl} loop />
      
      <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition-colors">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}
