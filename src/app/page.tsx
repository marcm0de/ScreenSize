'use client';

import { useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { useAppStore } from '@/store';
import UrlBar from '@/components/UrlBar';
import Toolbar from '@/components/Toolbar';
import DeviceGrid from '@/components/DeviceGrid';

export default function Home() {
  const { darkMode } = useAppStore();

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-[1800px] mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-white">ScreenSize</h1>
            <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">v1.0</span>
          </div>
          <UrlBar />
          <Toolbar />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto px-6 py-4">
        <div className="max-w-[1800px] mx-auto">
          <DeviceGrid />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-xs text-neutral-500">
          <span>ScreenSize — Open Source Responsive Design Testing</span>
          <div className="flex items-center gap-3">
            <span className="text-neutral-600">Breakpoints:</span>
            {[
              { label: 'XS', color: '#ef4444', range: '<640' },
              { label: 'SM', color: '#f97316', range: '640-767' },
              { label: 'MD', color: '#eab308', range: '768-1023' },
              { label: 'LG', color: '#22c55e', range: '1024-1279' },
              { label: 'XL', color: '#3b82f6', range: '1280-1535' },
              { label: '2XL', color: '#8b5cf6', range: '1536+' },
            ].map((bp) => (
              <span key={bp.label} className="flex items-center gap-1" title={`${bp.range}px`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bp.color }} />
                <span style={{ color: bp.color }}>{bp.label}</span>
              </span>
            ))}
          </div>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  );
}
