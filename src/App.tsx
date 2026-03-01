import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import Menu from './components/Menu';
import MovieDate from './components/MovieDate';
import Photobox from './components/Photobox';
import DinnerDate from './components/DinnerDate';
import Closing from './components/Closing';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [scene, setScene] = useState<'envelope' | 'letter' | 'menu' | 'movie' | 'photobox' | 'dinner' | 'closing'>(() => {
    const savedScene = localStorage.getItem('anniversary_scene');
    return (savedScene as any) || 'envelope';
  });
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    localStorage.setItem('anniversary_scene', scene);
  }, [scene]);

  const handleEnvelopeOpen = () => {
    setScene('letter');
    setMusicStarted(true);
  };

  return (
    <div className="font-sans">
      <MusicPlayer startPlaying={musicStarted} />
      
      <AnimatePresence mode="wait">
        {scene === 'envelope' && (
          <Envelope key="envelope" onOpen={handleEnvelopeOpen} />
        )}
        
        {scene === 'letter' && (
          <Letter key="letter" onNext={() => setScene('menu')} onBack={() => setScene('envelope')} />
        )}
        
        {scene === 'menu' && (
          <Menu 
            key="menu" 
            onSelect={(s) => setScene(s)} 
            onBack={() => setScene('letter')}
          />
        )}
        
        {scene === 'movie' && (
          <MovieDate 
            key="movie" 
            onBack={() => setScene('menu')} 
            onNext={() => setScene('menu')}
          />
        )}
        
        {scene === 'photobox' && (
          <Photobox 
            key="photobox" 
            onBack={() => setScene('menu')} 
            onNext={() => setScene('menu')}
          />
        )}
        
        {scene === 'dinner' && (
          <DinnerDate 
            key="dinner" 
            onBack={() => setScene('menu')} 
            onNext={() => setScene('closing')}
          />
        )}

        {scene === 'closing' && (
          <Closing 
            key="closing" 
            onRestart={() => setScene('envelope')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
