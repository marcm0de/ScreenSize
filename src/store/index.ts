import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DevicePreset, DeviceFrame, FavoriteUrl } from '@/types';

export const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'iphone-se', name: 'iPhone SE', width: 375, height: 667, category: 'phone', icon: 'Smartphone' },
  { id: 'iphone-15', name: 'iPhone 15', width: 393, height: 852, category: 'phone', icon: 'Smartphone' },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', width: 430, height: 932, category: 'phone', icon: 'Smartphone' },
  { id: 'samsung-galaxy', name: 'Samsung Galaxy S24', width: 360, height: 780, category: 'phone', icon: 'Smartphone' },
  { id: 'ipad', name: 'iPad', width: 820, height: 1180, category: 'tablet', icon: 'Tablet' },
  { id: 'ipad-pro', name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: 'tablet', icon: 'Tablet' },
  { id: 'macbook', name: 'MacBook Air', width: 1440, height: 900, category: 'laptop', icon: 'Laptop' },
  { id: 'desktop-1080', name: 'Desktop 1080p', width: 1920, height: 1080, category: 'desktop', icon: 'Monitor' },
  { id: 'desktop-1440', name: 'Desktop 1440p', width: 2560, height: 1440, category: 'desktop', icon: 'Monitor' },
  { id: 'ultrawide', name: 'Ultrawide', width: 3440, height: 1440, category: 'ultrawide', icon: 'MonitorPlay' },
];

interface CompareState {
  isComparing: boolean;
  frameA: string | null;
  frameB: string | null;
}

interface AppState {
  url: string;
  frames: DeviceFrame[];
  favorites: FavoriteUrl[];
  showRuler: boolean;
  darkMode: boolean;
  compare: CompareState;
  customWidth: number;
  customHeight: number;
  scale: number;

  setUrl: (url: string) => void;
  toggleFrame: (presetId: string) => void;
  toggleLandscape: (frameId: string) => void;
  toggleAllFrames: (visible: boolean) => void;
  toggleRuler: () => void;
  toggleDarkMode: () => void;
  addFavorite: (url: string, title?: string) => void;
  removeFavorite: (id: string) => void;
  setCompare: (compare: Partial<CompareState>) => void;
  addCustomFrame: (width: number, height: number) => void;
  setCustomWidth: (w: number) => void;
  setCustomHeight: (h: number) => void;
  setScale: (s: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      url: '',
      frames: DEVICE_PRESETS.slice(0, 4).map((p) => ({
        id: p.id,
        preset: p,
        isLandscape: false,
        isVisible: true,
      })),
      favorites: [],
      showRuler: false,
      darkMode: true,
      compare: { isComparing: false, frameA: null, frameB: null },
      customWidth: 800,
      customHeight: 600,
      scale: 0.3,

      setUrl: (url) => set({ url }),

      toggleFrame: (presetId) => {
        const { frames } = get();
        const existing = frames.find((f) => f.id === presetId);
        if (existing) {
          set({ frames: frames.map((f) => f.id === presetId ? { ...f, isVisible: !f.isVisible } : f) });
        } else {
          const preset = DEVICE_PRESETS.find((p) => p.id === presetId);
          if (preset) {
            set({ frames: [...frames, { id: preset.id, preset, isLandscape: false, isVisible: true }] });
          }
        }
      },

      toggleLandscape: (frameId) => {
        set({ frames: get().frames.map((f) => f.id === frameId ? { ...f, isLandscape: !f.isLandscape } : f) });
      },

      toggleAllFrames: (visible) => {
        if (visible) {
          const existing = get().frames.map((f) => f.id);
          const newFrames = DEVICE_PRESETS.filter((p) => !existing.includes(p.id)).map((p) => ({
            id: p.id,
            preset: p,
            isLandscape: false,
            isVisible: true,
          }));
          set({ frames: [...get().frames.map((f) => ({ ...f, isVisible: true })), ...newFrames] });
        } else {
          set({ frames: get().frames.map((f) => ({ ...f, isVisible: false })) });
        }
      },

      toggleRuler: () => set({ showRuler: !get().showRuler }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),

      addFavorite: (url, title) => {
        const { favorites } = get();
        if (favorites.some((f) => f.url === url)) return;
        set({
          favorites: [...favorites, { id: crypto.randomUUID(), url, title: title || url, addedAt: Date.now() }],
        });
      },

      removeFavorite: (id) => set({ favorites: get().favorites.filter((f) => f.id !== id) }),

      setCompare: (compare) => set({ compare: { ...get().compare, ...compare } }),

      addCustomFrame: (width, height) => {
        const id = `custom-${width}x${height}`;
        const { frames } = get();
        if (frames.some((f) => f.id === id)) return;
        const preset: DevicePreset = {
          id,
          name: `Custom ${width}×${height}`,
          width,
          height,
          category: 'desktop',
          icon: 'RectangleHorizontal',
        };
        set({ frames: [...frames, { id, preset, isLandscape: false, isVisible: true }] });
      },

      setCustomWidth: (w) => set({ customWidth: w }),
      setCustomHeight: (h) => set({ customHeight: h }),
      setScale: (s) => set({ scale: s }),
    }),
    {
      name: 'screensize-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        darkMode: state.darkMode,
        scale: state.scale,
      }),
    }
  )
);
