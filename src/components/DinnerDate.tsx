import { motion } from 'motion/react';
import { ChevronLeft, UtensilsCrossed } from 'lucide-react';
import { config } from '../config';

interface DinnerDateProps {
  onBack: () => void;
  onNext: () => void;
  key?: any;
}

export default function DinnerDate({ onBack, onNext }: DinnerDateProps) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 relative">
      <button onClick={onBack} className="absolute top-4 left-4 z-50 text-white/50 hover:text-white">
        <ChevronLeft size={32} />
      </button>

      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none blur-3xl"></div>

      <motion.div 
        className="bg-white max-w-md w-full p-8 rounded shadow-2xl relative z-10 text-center"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="border-4 border-double border-[#8B0000] p-6 h-full flex flex-col items-center">
          
          <UtensilsCrossed size={48} className="text-[#8B0000] mb-6" />
          
          <h1 className="font-serif text-4xl text-[#8B0000] mb-2">Dinner Date</h1>
          <h2 className="font-serif text-xl italic text-gray-500 mb-8">Session</h2>

          <div className="w-full aspect-video bg-gray-100 mb-8 overflow-hidden rounded shadow-inner">
            <img src={config.images.dinner} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-2 font-mono text-sm text-gray-600 mb-8">
            <p>RESERVATION FOR TWO</p>
            <p className="font-bold text-black">{config.coupleName.him} & {config.coupleName.her}</p>
            <p>{config.anniversaryDate}</p>
          </div>

          <p className="font-handwriting text-3xl text-[#8B0000] mb-8">See u ....</p>

          <button 
            onClick={onNext}
            className="px-6 py-2 border-2 border-[#8B0000] text-[#8B0000] font-bold rounded hover:bg-[#8B0000] hover:text-white transition-colors"
          >
            Finish Dinner Date →
          </button>

        </div>
      </motion.div>
    </div>
  );
}
