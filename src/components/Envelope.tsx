import { useState } from 'react';
import { motion } from 'motion/react';
import { config } from '../config';
import CustomizeModal from './CustomizeModal';

interface EnvelopeProps {
  onOpen: () => void;
  key?: any;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1500); // Wait for animation before triggering callback
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4">
      <CustomizeModal />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl font-light tracking-widest uppercase mb-2">POV: LDR</h1>
        <p className="text-sm text-gray-400">Tapi maksa bikin surprise anniversary 🤫</p>
      </motion.div>

      <div className="relative cursor-pointer group" onClick={handleOpen}>
        {/* Envelope Body */}
        <motion.div
          className="relative w-80 h-52 bg-[#8B0000] rounded-lg shadow-2xl z-10 flex items-center justify-center overflow-hidden"
          animate={isOpen ? { translateY: 100, opacity: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Texture/Pattern overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          
          {/* Wax Seal */}
          <motion.div 
            className="absolute z-20 w-16 h-16 bg-[#C5A059] rounded-full flex items-center justify-center shadow-lg border-4 border-[#B8860B]"
            animate={isOpen ? { scale: 1.5, opacity: 0 } : {}}
          >
            <span className="text-[#5C4033] font-serif text-2xl font-bold">1st</span>
          </motion.div>

          {/* Flap Lines */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-[#A52A2A] border-r-[160px] border-r-transparent"></div>
        </motion.div>

        {/* Letter Inside (Hidden initially) */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 bg-[#fdfbf7] shadow-xl rounded-sm z-0 flex flex-col items-center justify-center p-4 text-black"
          initial={{ translateY: 0, scale: 0.9 }}
          animate={isOpen ? { translateY: -100, scale: 1, rotate: -2 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif text-xl text-[#8B0000] mb-2">A Love Letter</h2>
          <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">Click to Read</p>
        </motion.div>
      </div>
      
      {!isOpen && (
        <motion.p 
          className="mt-8 text-sm text-gray-400 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Tap the envelope to open
        </motion.p>
      )}
    </div>
  );
}
