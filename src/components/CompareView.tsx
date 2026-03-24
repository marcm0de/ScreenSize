'use client';

import { useAppStore } from '@/store';
import DeviceFrameCard from './DeviceFrameCard';

export default function CompareView() {
  const { frames, compare } = useAppStore();

  if (!compare.isComparing) return null;

  const frameA = frames.find((f) => f.id === compare.frameA);
  const frameB = frames.find((f) => f.id === compare.frameB);

  if (!frameA && !frameB) {
    return (
      <div className="text-center py-8 text-neutral-500 text-sm">
        Click the <span className="text-purple-400">compare icon</span> on two device frames to compare them side-by-side
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center gap-6 py-4">
      {frameA && <DeviceFrameCard frame={frameA} />}
      {frameB && <DeviceFrameCard frame={frameB} />}
      {!frameB && frameA && (
        <div className="flex items-center justify-center border-2 border-dashed border-neutral-700 rounded-xl p-12 text-neutral-500 text-sm">
          Select a second device
        </div>
      )}
    </div>
  );
}
