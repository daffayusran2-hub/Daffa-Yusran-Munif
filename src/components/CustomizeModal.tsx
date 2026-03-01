import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Settings, RotateCcw, Upload, Plus, Trash2 } from 'lucide-react';
import { config } from '../config';

export default function CustomizeModal() {
  const [isOpen, setIsOpen] = useState(false);
  // Deep clone initial state to avoid mutating the imported config directly
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(config)));

  const handleSave = () => {
    // Validate date
    const date = new Date(formData.anniversaryDate);
    if (isNaN(date.getTime())) {
      alert("Please enter a valid anniversary date.");
      return;
    }

    try {
      localStorage.setItem('anniversary_config', JSON.stringify(formData));
      window.location.reload();
    } catch (e) {
      alert("Storage limit exceeded! Try using fewer or smaller images.");
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all customizations?')) {
      localStorage.removeItem('anniversary_config');
      localStorage.removeItem('anniversary_scene');
      window.location.reload();
    }
  };

  const updateField = (path: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(formData));
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setFormData(newData);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/50 hover:text-white transition-colors"
        title="Customize App"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col text-white"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#252525]">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Settings size={20} /> Customize App
                </h2>
                <button onClick={() => setIsOpen(false)} className="hover:text-red-400">
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Section: Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Basic Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">His Name</label>
                      <input 
                        type="text" 
                        value={formData.coupleName.him}
                        onChange={(e) => updateField('coupleName.him', e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Her Name</label>
                      <input 
                        type="text" 
                        value={formData.coupleName.her}
                        onChange={(e) => updateField('coupleName.her', e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Anniversary Date (YYYY-MM-DD)</label>
                    <input 
                      type="date" 
                      value={formData.anniversaryDate}
                      onChange={(e) => updateField('anniversaryDate', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
                    />
                  </div>
                </div>

                {/* Section: Music */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Background Music</h3>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Music URL (MP3 Link)</label>
                    <input 
                      type="text" 
                      value={formData.musicUrl}
                      onChange={(e) => updateField('musicUrl', e.target.value)}
                      placeholder="https://example.com/song.mp3"
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Note: Use a direct link to an audio file (mp3/wav). YouTube links are not supported directly.</p>
                  </div>
                </div>

                {/* Section: Letter */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Love Letter</h3>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Content</label>
                    <textarea 
                      value={formData.letterContent}
                      onChange={(e) => updateField('letterContent', e.target.value)}
                      rows={6}
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Section: Closing Message */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Closing Message</h3>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={formData.closing?.title || ''}
                      onChange={(e) => updateField('closing.title', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Message</label>
                    <textarea 
                      value={formData.closing?.message || ''}
                      onChange={(e) => updateField('closing.message', e.target.value)}
                      rows={4}
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Section: Images */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Images</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <SingleImageField 
                      label="His Profile Photo" 
                      value={formData.images.himProfile} 
                      onChange={(val) => updateField('images.himProfile', val)} 
                    />
                    <SingleImageField 
                      label="Her Profile Photo" 
                      value={formData.images.herProfile} 
                      onChange={(val) => updateField('images.herProfile', val)} 
                    />
                  </div>

                  <SingleImageField 
                    label="Dinner Invitation Photo" 
                    value={formData.images.dinner} 
                    onChange={(val) => updateField('images.dinner', val)} 
                  />

                  <ImageArrayField 
                    label="Movie Moments" 
                    values={formData.images.movieMoments} 
                    onChange={(vals) => updateField('images.movieMoments', vals)} 
                  />

                  <ImageArrayField 
                    label="Photobox Images" 
                    values={formData.images.photobox} 
                    onChange={(vals) => updateField('images.photobox', vals)} 
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-[#252525] flex justify-between items-center">
                <button 
                  onClick={handleReset}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Reset to Default
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-bold flex items-center gap-2 transition-colors"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SingleImageField({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
          placeholder="Image URL"
        />
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white/10 hover:bg-white/20 p-2 rounded text-white transition-colors"
          title="Upload Image"
        >
          <Upload size={18} />
        </button>
      </div>
      {value && (
        <div className="mt-2 w-16 h-16 rounded overflow-hidden border border-white/10">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

import { isVideo } from '../utils/media';

function ImageArrayField({ label, values, onChange }: { label: string, values: string[], onChange: (vals: string[]) => void }) {
  const [newUrl, setNewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      onChange([...values, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const handleRemove = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange([...values, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-xs text-gray-400 mb-2">{label}</label>
      
      {/* List of images/videos */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {values.map((url, i) => (
          <div key={i} className="relative aspect-square bg-black/50 rounded overflow-hidden group border border-white/10">
            {isVideo(url) ? (
              <video src={url} className="w-full h-full object-cover" muted />
            ) : (
              <img src={url} className="w-full h-full object-cover" />
            )}
            <button 
              onClick={() => handleRemove(i)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-red-400"
            >
              <Trash2 size={20} />
            </button>
            {isVideo(url) && (
              <div className="absolute bottom-1 right-1 bg-black/60 rounded p-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square bg-white/5 hover:bg-white/10 rounded border border-dashed border-white/20 flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <Upload size={24} className="mb-1" />
          <span className="text-[10px]">Upload</span>
        </button>
      </div>

      {/* Add URL input */}
      <div className="flex gap-2">
        <input 
          type="text" 
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Add image or video URL..."
          className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-sm focus:border-red-500 outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
        />
        <button 
          onClick={handleAddUrl}
          className="bg-white/10 hover:bg-white/20 px-3 rounded text-white transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
