'use client';

import { RotateCw, Camera, Columns2, X, Smartphone, Tablet, Laptop, Monitor } from 'lucide-react';
import { useAppStore } from '@/store';
import { DeviceFrame } from '@/types';
import { motion } from 'framer-motion';

function getBreakpoint(width: number): { label: string; color: string; tailwind: string } {
  if (width < 640) return { label: 'XS', color: '#ef4444', tailwind: 'sm' };
  if (width < 768) return { label: 'SM', color: '#f97316', tailwind: 'md' };
  if (width < 1024) return { label: 'MD', color: '#eab308', tailwind: 'lg' };
  if (width < 1280) return { label: 'LG', color: '#22c55e', tailwind: 'xl' };
  if (width < 1536) return { label: 'XL', color: '#3b82f6', tailwind: '2xl' };
  return { label: '2XL', color: '#8b5cf6', tailwind: '2xl+' };
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'phone': return <Smartphone className="w-3 h-3" />;
    case 'tablet': return <Tablet className="w-3 h-3" />;
    case 'laptop': return <Laptop className="w-3 h-3" />;
    default: return <Monitor className="w-3 h-3" />;
  }
}

interface Props {
  frame: DeviceFrame;
}

export default function DeviceFrameCard({ frame }: Props) {
  const { url, toggleLandscape, toggleFrame, showRuler, scale, compare, setCompare } = useAppStore();
  const { preset, isLandscape } = frame;

  const displayWidth = isLandscape ? preset.height : preset.width;
  const displayHeight = isLandscape ? preset.width : preset.height;

  const scaledW = displayWidth * scale;
  const scaledH = displayHeight * scale;

  const breakpoint = getBreakpoint(displayWidth);
  const isCompareSelected = compare.frameA === frame.id || compare.frameB === frame.id;

  const handleCompareClick = () => {
    if (!compare.isComparing) return;
    if (compare.frameA === frame.id) {
      setCompare({ frameA: null });
    } else if (compare.frameB === frame.id) {
      setCompare({ frameB: null });
    } else if (!compare.frameA) {
      setCompare({ frameA: frame.id });
    } else if (!compare.frameB) {
      setCompare({ frameB: frame.id });
    }
  };

  const handleScreenshot = () => {
    // Placeholder — real html2canvas or dom-to-image would go here
    alert(`Screenshot placeholder for ${preset.name} (${displayWidth}×${displayHeight})`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex flex-col rounded-xl overflow-hidden border transition-colors ${
        isCompareSelected
          ? 'border-purple-500 shadow-lg shadow-purple-500/20'
          : 'border-neutral-700 hover:border-neutral-600'
      } bg-neutral-850`}
      style={{ width: scaledW + 2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-800 border-b border-neutral-700">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-neutral-400">{getCategoryIcon(preset.category)}</span>
          <span className="text-xs font-medium text-neutral-200 truncate">{preset.name}</span>
          <span className="text-[10px] text-neutral-500 shrink-0">{displayWidth}×{displayHeight}</span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
            style={{ backgroundColor: `${breakpoint.color}20`, color: breakpoint.color, border: `1px solid ${breakpoint.color}40` }}
          >
            {breakpoint.label}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {compare.isComparing && (
            <button
              onClick={handleCompareClick}
              className={`p-1 rounded transition-colors ${
                isCompareSelected ? 'text-purple-400 bg-purple-500/20' : 'text-neutral-500 hover:text-purple-400'
              }`}
              title="Select for comparison"
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => toggleLandscape(frame.id)}
            className="p-1 rounded text-neutral-500 hover:text-white transition-colors"
            title="Rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleScreenshot}
            className="p-1 rounded text-neutral-500 hover:text-white transition-colors"
            title="Screenshot"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => toggleFrame(frame.id)}
            className="p-1 rounded text-neutral-500 hover:text-red-400 transition-colors"
            title="Remove"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div
        className="relative overflow-hidden bg-white"
        style={{ width: scaledW, height: scaledH }}
      >
        {url ? (
          <iframe
            src={url}
            title={`${preset.name} preview`}
            className="border-0 origin-top-left"
            style={{
              width: displayWidth,
              height: displayHeight,
              transform: `scale(${scale})`,
              pointerEvents: 'none',
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/50 gap-2">
            <span className="text-neutral-500">{getCategoryIcon(preset.category)}</span>
            <span className="text-neutral-600 text-xs">Enter a URL to preview</span>
            <span className="text-neutral-700 text-[10px]">{displayWidth}×{displayHeight}</span>
          </div>
        )}

        {/* Breakpoint indicator bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${breakpoint.color}00, ${breakpoint.color}, ${breakpoint.color}00)`,
            opacity: 0.7,
          }}
        />

        {/* Ruler overlay */}
        {showRuler && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px),
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: `${10 * scale}px ${10 * scale}px, ${10 * scale}px ${10 * scale}px, ${50 * scale}px ${50 * scale}px, ${50 * scale}px ${50 * scale}px`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
