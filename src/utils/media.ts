export const isVideo = (url: string): boolean => {
  if (!url) return false;
  // Check for common video extensions
  if (url.match(/\.(mp4|webm|ogg|mov)$/i)) return true;
  // Check for data URLs
  if (url.startsWith('data:video/')) return true;
  return false;
};
