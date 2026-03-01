import { Music, Heart, Film, Camera, UtensilsCrossed } from 'lucide-react';

const defaultConfig = {
  // Customize these details
  anniversaryDate: "2024-02-27", // YYYY-MM-DD
  coupleName: {
    him: "Dimas",
    her: "Mustika"
  },
  letterContent: `My dearest Love,

Happy 1st Anniversary! 

I can't believe it's already been a year since we started this journey together. Every moment with you has been a treasure. 

Even though we might be miles apart sometimes, my heart is always with you. Thank you for being my partner, my best friend, and my safe place.

Here's to many more years of us.

Love always,
[Your Name]`,

  // Audio link (mp3 preferred)
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with your song URL

  // Images - Replace these URLs with your own photo links
  // You can use services like Imgur, Dropbox (direct link), or any public image hosting.
  images: {
    // The photo that appears in the "Netflix" profile selection
    himProfile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    herProfile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    
    // Photos for the "Movie" slideshow (Top picks / Our moments)
    movieMoments: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800"
    ],

    // Photos for the Photobox strip
    photobox: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400"
    ],
    
    // Photo for the Dinner Date invitation
    dinner: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
  },

  // Closing Message
  closing: {
    title: "Thank You for Everything",
    message: `Every day with you is a gift. 
    
I promise to love you more with each passing day. 
You are my today and all of my tomorrows.

Happy Anniversary, my love! ❤️`
  },

  // Scene Titles
  scenes: {
    envelope: "A Special Surprise",
    letter: "A Love Letter",
    menu: "What we gonna do?",
    movie: "Movie Date Session",
    photobox: "Photobox Session",
    dinner: "Dinner Date Session",
    closing: "Closing Message"
  }
};

// Helper to deep merge objects
function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

const savedConfig = JSON.parse(localStorage.getItem('anniversary_config') || '{}');
export const config = deepMerge(defaultConfig, savedConfig);
