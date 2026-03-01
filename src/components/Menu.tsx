import { motion } from 'motion/react';
import { Play, Film, Camera, UtensilsCrossed } from 'lucide-react';
import { config } from '../config';

interface MenuProps {
  onSelect: (scene: 'movie' | 'photobox' | 'dinner') => void;
  onBack: () => void;
  key?: any;
}

export default function Menu({ onSelect, onBack }: MenuProps) {
  const items = [
    { id: 'movie', label: 'Movie date', icon: Film, color: 'bg-red-600' },
    { id: 'photobox', label: 'Photobox date', icon: Camera, color: 'bg-blue-600' },
    { id: 'dinner', label: 'Anniversary dinner', icon: UtensilsCrossed, color: 'bg-amber-600' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#8B0000] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Title */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-xl">←</span> Back to Letter
          </button>

          <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-4">
            What we<br />
            <span className="italic font-light">gonna do?</span>
          </h1>
          <motion.button
            onClick={() => onSelect('movie')}
            className="mt-8 bg-white text-[#8B0000] px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} fill="currentColor" />
            Start The Date
          </motion.button>
        </motion.div>

        {/* Right Side: To Do List Card */}
        <motion.div
          initial={{ x: 50, opacity: 0, rotate: 3 }}
          animate={{ x: 0, opacity: 1, rotate: 3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#fdfbf7] p-8 rounded-lg shadow-2xl transform rotate-3"
        >
          <div className="border-2 border-dashed border-gray-300 p-6 h-full">
            <h2 className="font-serif text-2xl text-center mb-8 border-b-2 border-black pb-2 mx-auto w-1/2">To Do List</h2>
            
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-gray-400 line-through decoration-2">
                <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center">✓</div>
                <span className="font-serif text-xl">Read love letter</span>
              </li>
              
              {items.map((item, index) => (
                <motion.li 
                  key={item.id}
                  className="flex items-center gap-4 cursor-pointer group"
                  whileHover={{ x: 10 }}
                  onClick={() => onSelect(item.id)}
                >
                  <div className={`w-6 h-6 rounded border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors`}>
                  </div>
                  <span className="font-serif text-xl">{item.label}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 text-center font-handwriting text-gray-500">
              Have fun !!!
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
