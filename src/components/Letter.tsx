import { motion } from 'motion/react';
import { config } from '../config';

interface LetterProps {
  onNext: () => void;
  onBack: () => void;
  key?: any;
}

export default function Letter({ onNext, onBack }: LetterProps) {
  return (
    <div className="min-h-screen bg-[#8B0000] flex items-center justify-center p-4">
      <motion.div 
        className="bg-[#fdfbf7] w-full max-w-md p-8 rounded-sm shadow-2xl relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Paper Texture Effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-black"></div>
        
        {/* Stamp/Header */}
        <div className="border-b-2 border-[#8B0000]/20 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="font-serif text-3xl text-[#8B0000] mb-1">A LOVE LETTER</h1>
            <div className="flex flex-col text-sm font-mono text-gray-600">
              <span>TO: {config.coupleName.him}</span>
              <span>FROM: {config.coupleName.her}</span>
            </div>
          </div>
          <div className="w-16 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 rotate-3">
            <span className="text-xs text-gray-400 text-center">1st<br/>Anniv</span>
          </div>
        </div>

        {/* Content */}
        <div className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-wrap mb-8">
          {config.letterContent}
        </div>

        {/* Footer */}
        <div className="flex justify-between">
          <motion.button
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-500 font-medium hover:underline"
            whileHover={{ x: -5 }}
          >
            <span className="text-xl">←</span>
            Back
          </motion.button>
          <motion.button
            onClick={onNext}
            className="group flex items-center gap-2 text-[#8B0000] font-medium hover:underline"
            whileHover={{ x: 5 }}
          >
            Continue
            <span className="text-xl">→</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
