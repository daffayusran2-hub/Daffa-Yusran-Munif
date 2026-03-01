import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Camera } from 'lucide-react';
import { config } from '../config';

interface PhotoboxProps {
  onBack: () => void;
  onNext: () => void;
  key?: any;
}

export default function Photobox({ onBack, onNext }: PhotoboxProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  
  const date = new Date(config.anniversaryDate);
  const monthName = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  return (
    <div className="min-h-screen bg-[#f0e6d2] flex items-center justify-center p-4 relative overflow-hidden">
      <button onClick={onBack} className="absolute top-4 left-4 z-50 text-gray-600 hover:text-black">
        <ChevronLeft size={32} />
      </button>

      {/* Background Elements */}
      <div className="absolute top-10 right-10 opacity-10 rotate-12">
        <Camera size={200} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl w-full">
        
        {/* Left: Album Cover */}
        <motion.div 
          className="w-full md:w-1/2 bg-[#8B0000] p-1 rounded-lg shadow-2xl aspect-[4/5] relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {/* Gingham Pattern */}
          <div className="w-full h-full bg-white relative overflow-hidden rounded border-4 border-white">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #8B0000 25%, transparent 25%, transparent 75%, #8B0000 75%, #8B0000), repeating-linear-gradient(45deg, #8B0000 25%, #f0f0f0 25%, #f0f0f0 75%, #8B0000 75%, #8B0000)', backgroundSize: '20px 20px' }}></div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="bg-white p-4 shadow-lg rotate-2 mb-8">
                  <h2 className="font-serif text-4xl text-[#8B0000] text-center">Photobox</h2>
                  <p className="text-center text-gray-500 font-mono text-xs mt-2">Memories of Us</p>
                </div>

                {/* Photo Strip Container */}
                <div className="bg-white p-2 shadow-md w-32 relative">
                  <div className="space-y-2">
                    {config.images.photobox.slice(0, 3).map((img, i) => (
                      <div key={i} className="aspect-square bg-gray-100 overflow-hidden">
                        <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Right: Calendar & Interactive */}
        <motion.div 
          className="w-full md:w-1/2 space-y-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Calendar Card */}
          <div className="bg-white p-6 rounded shadow-xl rotate-2 max-w-xs mx-auto">
             <div className="bg-[#8B0000] text-white p-2 text-center font-bold uppercase tracking-widest">
               {monthName}
             </div>
             <div className="grid grid-cols-7 gap-2 mt-4 text-center text-sm font-mono text-gray-400">
               <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
               {Array.from({length: 30}).map((_, i) => (
                 <span key={i} className={`p-1 ${i+1 === day ? 'bg-red-100 text-[#8B0000] font-bold rounded-full' : ''}`}>
                   {i+1}
                 </span>
               ))}
             </div>
             <div className="mt-4 text-center font-handwriting text-[#8B0000] text-xl">
               1st Anniversary ❤️
             </div>
          </div>

          <div className="text-center space-y-4">
            <button 
              onClick={() => setIsPrinting(true)}
              className="bg-[#8B0000] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#600000] transition-colors flex items-center gap-2 mx-auto"
            >
              <Camera size={20} />
              Print Memories
            </button>

            <button 
              onClick={onNext}
              className="text-[#8B0000] font-bold hover:underline text-sm"
            >
              Finish Photobox Session →
            </button>
          </div>

        </motion.div>
      </div>

      {/* Printing Animation Overlay */}
      <AnimatePresence>
        {isPrinting && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPrinting(false)}
          >
            <motion.div 
              className="bg-white p-4 pt-12 pb-4 shadow-2xl relative"
              initial={{ y: -500 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="space-y-4">
                {config.images.photobox.map((img, i) => (
                  <div key={i} className="w-48 aspect-[4/3] bg-gray-100 overflow-hidden border-4 border-white shadow-sm">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="text-center font-mono text-xs text-gray-400 pt-2">
                  {config.anniversaryDate} • {config.coupleName.him} & {config.coupleName.her}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
