import { motion } from 'motion/react';
import { Heart, RotateCcw } from 'lucide-react';
import { config } from '../config';

interface ClosingProps {
  onRestart: () => void;
  key?: any;
}

export default function Closing({ onRestart }: ClosingProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <motion.div 
        className="max-w-2xl w-full text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-900/50"
        >
          <Heart size={48} fill="white" className="text-white animate-pulse" />
        </motion.div>

        <h1 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
          {config.closing.title}
        </h1>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-2xl">
          <p className="font-serif text-xl md:text-2xl text-gray-200 whitespace-pre-wrap leading-relaxed">
            {config.closing.message}
          </p>
        </div>

        <motion.button
          onClick={onRestart}
          className="mt-12 text-gray-500 hover:text-white flex items-center gap-2 mx-auto transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <RotateCcw size={20} />
          Replay Surprise
        </motion.button>

        <div className="mt-8 text-sm text-gray-600 font-mono">
          {config.anniversaryDate} • {config.coupleName.him} & {config.coupleName.her}
        </div>
      </motion.div>
    </div>
  );
}
