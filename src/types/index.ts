export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  category: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'ultrawide';
  icon: string;
}

export interface DeviceFrame {
  id: string;
  preset: DevicePreset;
  isLandscape: boolean;
  isVisible: boolean;
}

export interface FavoriteUrl {
  id: string;
  url: string;
  title: string;
  addedAt: number;
}
