'use client';

import {
  Ruler,
  Sun,
  Moon,
  ToggleLeft,
  ToggleRight,
  Columns2,
  Plus,
  Minus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAppStore, DEVICE_PRESETS } from '@/store';

export default function Toolbar() {
  const {
    showRuler,
    toggleRuler,
    darkMode,
    toggleDarkMode,
    compare,
    setCompare,
    frames,
    toggleFrame,
    toggleAllFrames,
    customWidth,
    customHeight,
    setCustomWidth,
    setCustomHeight,
    addCustomFrame,
    scale,
    setScale,
  } = useAppStore();

  const allVisible = frames.length > 0 && frames.every((f) => f.isVisible);
  const activeCount = frames.filter((f) => f.isVisible).length;

  return (
    <div className="w-full space-y-3">
      {/* Main toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Scale controls */}
        <div className="flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5">
          <button onClick={() => setScale(Math.max(0.15, scale - 0.05))} className="text-neutral-400 hover:text-white transition-colors">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-neutral-300 w-10 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(Math.min(1, scale + 0.05))} className="text-neutral-400 hover:text-white transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ruler toggle */}
        <button
          onClick={toggleRuler}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            showRuler
              ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
              : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          Ruler
        </button>

        {/* Compare mode */}
        <button
          onClick={() => setCompare({ isComparing: !compare.isComparing, frameA: null, frameB: null })}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            compare.isComparing
              ? 'bg-purple-600/20 border-purple-500/50 text-purple-400'
              : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
          }`}
        >
          <Columns2 className="w-3.5 h-3.5" />
          Compare
        </button>

        {/* Show/hide all */}
        <button
          onClick={() => toggleAllFrames(!allVisible)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white text-xs font-medium transition-colors"
        >
          {allVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {allVisible ? 'Hide All' : 'Show All'}
        </button>

        {/* Dark/light toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white text-xs font-medium transition-colors ml-auto"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          {darkMode ? 'Light' : 'Dark'}
        </button>

        <span className="text-xs text-neutral-500">{activeCount} devices</span>
      </div>

      {/* Device preset chips */}
      <div className="flex flex-wrap gap-1.5">
        {DEVICE_PRESETS.map((preset) => {
          const isActive = frames.some((f) => f.id === preset.id && f.isVisible);
          return (
            <button
              key={preset.id}
              onClick={() => toggleFrame(preset.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-600'
              }`}
            >
              {preset.name}
              <span className="ml-1 opacity-60">{preset.width}×{preset.height}</span>
            </button>
          );
        })}

        {/* Custom size */}
        <div className="flex items-center gap-1 ml-2">
          <input
            type="number"
            value={customWidth}
            onChange={(e) => setCustomWidth(Number(e.target.value))}
            className="w-16 bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-xs text-white text-center"
            min={100}
            max={5000}
          />
          <span className="text-neutral-500 text-xs">×</span>
          <input
            type="number"
            value={customHeight}
            onChange={(e) => setCustomHeight(Number(e.target.value))}
            className="w-16 bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-xs text-white text-center"
            min={100}
            max={5000}
          />
          <button
            onClick={() => addCustomFrame(customWidth, customHeight)}
            className="bg-neutral-700 hover:bg-neutral-600 text-white rounded-md px-2 py-1 text-xs transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
