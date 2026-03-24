'use client';

import { useState } from 'react';
import { Globe, Star, StarOff, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function UrlBar() {
  const { url, setUrl, favorites, addFavorite, removeFavorite } = useAppStore();
  const [input, setInput] = useState(url);
  const [showFavorites, setShowFavorites] = useState(false);

  const isFavorite = favorites.some((f) => f.url === url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let normalized = input.trim();
    if (normalized && !normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    setUrl(normalized);
    setInput(normalized);
  };

  const loadFavorite = (favUrl: string) => {
    setUrl(favUrl);
    setInput(favUrl);
    setShowFavorites(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition-colors">
          <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL to preview — e.g. https://example.com"
            className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-sm"
          />
          {url && (
            <button
              type="button"
              onClick={() => {
                if (isFavorite) {
                  const fav = favorites.find((f) => f.url === url);
                  if (fav) removeFavorite(fav.id);
                } else {
                  addFavorite(url);
                }
              }}
              className="text-neutral-400 hover:text-yellow-400 transition-colors"
            >
              {isFavorite ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : <StarOff className="w-4 h-4" />}
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          Preview <ArrowRight className="w-4 h-4" />
        </button>
        {favorites.length > 0 && (
          <button
            type="button"
            onClick={() => setShowFavorites(!showFavorites)}
            className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-neutral-300 rounded-xl px-3 py-2.5 text-sm transition-colors"
          >
            <Star className="w-4 h-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showFavorites && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full mt-2 left-0 right-0 bg-neutral-800 border border-neutral-700 rounded-xl p-2 z-50 shadow-2xl"
          >
            <div className="text-xs text-neutral-400 px-2 py-1 mb-1">Favorites</div>
            {favorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => loadFavorite(fav.url)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-700 text-sm text-neutral-200 transition-colors"
              >
                <span className="truncate">{fav.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFavorite(fav.id); }}
                  className="text-neutral-500 hover:text-red-400 ml-2 shrink-0"
                >
                  ×
                </button>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
