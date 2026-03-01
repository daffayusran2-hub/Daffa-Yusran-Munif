import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Play, ChevronLeft, SkipForward, Pause } from 'lucide-react';
import { config } from '../config';

interface MovieDateProps {
  onBack: () => void;
  onNext: () => void;
  key?: any;
}

import { isVideo } from '../utils/media';

export default function MovieDate({ onBack, onNext }: MovieDateProps) {
  const [step, setStep] = useState<'ticket' | 'loading' | 'profiles' | 'home' | 'player'>('ticket');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const playerRef = useRef<HTMLDivElement>(null);

  const stopVideo = () => {
    const video = playerRef.current?.querySelector('video');
    if (video) {
      video.pause();
    }
  };

  const handleBackToHome = () => {
    stopVideo();
    setStep('home');
  };

  const handleFinish = () => {
    stopVideo();
    onNext();
  };

  const handleGlobalBack = () => {
    if (step === 'player') {
      stopVideo();
    }
    onBack();
  };

  // Loading simulation
  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('profiles');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Slideshow in player
  useEffect(() => {
    if (step === 'player' && isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % config.images.movieMoments.length);
      }, 5000); // Increased to 5s to give more time for videos
      return () => clearInterval(interval);
    }
  }, [step, isPlaying]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
      <button onClick={handleGlobalBack} className="absolute top-4 left-4 z-50 text-white/50 hover:text-white">
        <ChevronLeft />
      </button>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: TICKET PRINTING */}
        {step === 'ticket' && (
          <motion.div 
            key="ticket"
            className="flex flex-col items-center justify-center min-h-screen bg-[#8B0000]"
            exit={{ opacity: 0 }}
          >
            <h1 className="font-serif text-4xl mb-8 text-white text-center">☆ Movie date session ☆</h1>
            
            <div className="relative">
              <motion.div 
                className="bg-[#fdfbf7] w-64 p-4 rounded-t-lg shadow-xl z-10 relative"
                initial={{ y: 0 }}
              >
                <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                  <Printer className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <button 
                    onClick={() => setStep('loading')}
                    className="bg-[#8B0000] text-white px-6 py-2 rounded-full font-bold hover:bg-[#600000] transition-colors"
                  >
                    Print
                  </button>
                  <p className="text-xs text-gray-400 mt-2">Click to print the tickets</p>
                </div>
              </motion.div>

              {/* Ticket Animation */}
              <motion.div 
                className="absolute top-full left-2 right-2 bg-[#E5C15D] p-4 shadow-lg flex flex-col items-center -z-0 origin-top"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="border-2 border-black w-full p-2 text-black text-center">
                  <h3 className="font-bold text-lg uppercase border-b border-black pb-1 mb-1">Movie Ticket</h3>
                  <div className="flex justify-between text-xs font-mono">
                    <span>ADMIT ONE</span>
                    <span>{config.anniversaryDate}</span>
                  </div>
                  <div className="my-2 text-2xl font-bold">1 Year & Counting</div>
                  <div className="barcode h-8 bg-black w-full mt-2 opacity-80"></div>
                </div>
                <button 
                  onClick={() => setStep('loading')}
                  className="mt-4 text-xs underline text-black font-bold"
                >
                  Play the movie ►
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: LOADING */}
        {step === 'loading' && (
          <motion.div 
            key="loading"
            className="flex flex-col items-center justify-center min-h-screen bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-64">
              <div className="text-red-600 font-bold tracking-widest text-center mb-4 text-2xl">NETFLIX</div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-600"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-center text-gray-500 text-xs mt-2">Loading your memories...</p>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PROFILES */}
        {step === 'profiles' && (
          <motion.div 
            key="profiles"
            className="flex flex-col items-center justify-center min-h-screen bg-[#141414]"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-medium mb-12">Who's watching?</h2>
            <div className="flex gap-8">
              <div 
                className="group flex flex-col items-center gap-4 cursor-pointer"
                onClick={() => setStep('home')}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-gray-800 overflow-hidden border-2 border-transparent group-hover:border-white transition-all">
                  <img src={config.images.himProfile} alt="Him" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">{config.coupleName.him}</span>
              </div>
              <div 
                className="group flex flex-col items-center gap-4 cursor-pointer"
                onClick={() => setStep('home')}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-gray-800 overflow-hidden border-2 border-transparent group-hover:border-white transition-all">
                  <img src={config.images.herProfile} alt="Her" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">{config.coupleName.her}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: HOME SCREEN */}
        {step === 'home' && (
          <motion.div 
            key="home"
            className="min-h-screen bg-[#141414] pb-20 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Navbar */}
            <div className="flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent sticky top-0 z-20">
              <div className="text-red-600 font-bold text-2xl">NETFLIX</div>
              <div className="flex gap-6 text-sm text-gray-300">
                <span className="font-bold text-white">Home</span>
                <span>TV Shows</span>
                <span>Movies</span>
                <span>My List</span>
              </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
              <div className="absolute inset-0">
                <img src={config.images.movieMoments[0]} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
              </div>
              <div className="absolute bottom-1/4 left-4 md:left-12 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 font-bold text-xs tracking-widest">SERIES</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-none">1 Year<br/>& Counting</h1>
                <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3">
                  A beautiful journey of two souls finding their way to each other. 
                  Filled with laughter, tears, and endless love. A story that never ends.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('player')}
                    className="bg-white text-black px-8 py-2 rounded font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    <Play size={20} fill="currentColor" /> Play
                  </button>
                  <button className="bg-gray-500/70 text-white px-8 py-2 rounded font-bold flex items-center gap-2 hover:bg-gray-500/50 transition-colors">
                    More Info
                  </button>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className="px-4 md:px-12 -mt-20 relative z-10 space-y-8">
              <Section title="Top picks from our moments" images={config.images.movieMoments} />
              <Section title="Our favorite moments" images={[...config.images.movieMoments].reverse()} />
            </div>
          </motion.div>
        )}

        {/* STEP 5: PLAYER */}
        {step === 'player' && (
          <motion.div 
            key="player"
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Video/Slideshow Container */}
            <div ref={playerRef} className="relative w-full h-full md:max-w-6xl md:h-[80vh] bg-gray-900 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {isVideo(config.images.movieMoments[currentSlide]) ? (
                    <video 
                      src={config.images.movieMoments[currentSlide]}
                      className="w-full h-full object-contain"
                      autoPlay
                      muted // Muted for autoplay policy, user can unmute if we add controls
                      loop
                      playsInline
                      controls
                    />
                  ) : (
                    <img 
                      src={config.images.movieMoments[currentSlide]}
                      className="w-full h-full object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 pointer-events-none">
                <div className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer pointer-events-auto">
                  <div 
                    className="h-full bg-red-600 relative" 
                    style={{ width: `${((currentSlide + 1) / config.images.movieMoments.length) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-6">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
                    </button>
                    <button onClick={() => setCurrentSlide((prev) => (prev + 1) % config.images.movieMoments.length)}>
                      <SkipForward fill="white" />
                    </button>
                    <span className="font-bold">1 Year & Counting</span>
                  </div>
                  <div className="text-sm font-mono">
                    S1:E{currentSlide + 1}
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <button 
                onClick={handleBackToHome}
                className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/80 z-20"
              >
                <ChevronLeft />
              </button>

              {/* Finish Button */}
              <button 
                onClick={handleFinish}
                className="absolute bottom-8 right-8 px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100 z-20"
              >
                Finish Movie Date →
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function Section({ title, images }: { title: string, images: string[] }) {
  return (
    <div>
      <h3 className="text-gray-200 font-medium mb-2 hover:text-white cursor-pointer">{title}</h3>
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            className="flex-shrink-0 w-48 aspect-video rounded bg-gray-800 overflow-hidden cursor-pointer relative group"
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            {isVideo(img) ? (
              <video src={img} className="w-full h-full object-cover" muted />
            ) : (
              <img src={img} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-2 bg-white/20 rounded-full border-2 border-white">
                <Play size={16} fill="white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
