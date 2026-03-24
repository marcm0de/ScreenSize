'use client';

import { useAppStore } from '@/store';
import DeviceFrameCard from './DeviceFrameCard';
import CompareView from './CompareView';
import { AnimatePresence } from 'framer-motion';

export default function DeviceGrid() {
  const { frames, compare } = useAppStore();
  const visibleFrames = frames.filter((f) => f.isVisible);

  if (compare.isComparing) {
    return <CompareView />;
  }

  if (visibleFrames.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-500">
        <p className="text-lg mb-2">No devices selected</p>
        <p className="text-sm">Toggle device presets above to start previewing</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center items-start py-4">
      <AnimatePresence mode="popLayout">
        {visibleFrames.map((frame) => (
          <DeviceFrameCard key={frame.id} frame={frame} />
        ))}
      </AnimatePresence>
    </div>
  );
}
