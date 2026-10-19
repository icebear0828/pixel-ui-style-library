import React from 'react';
import { PixelVillagerPreset } from '../types';

export type PixelIconName =
  | 'leaf'
  | 'island'
  | 'coin'
  | 'heart'
  | 'star'
  | 'sword'
  | 'chest'
  | 'fish'
  | 'apple'
  | 'bell'
  | 'potion'
  | 'scroll'
  | 'sparkles'
  | 'home'
  | 'search'
  | 'settings'
  | 'trophy'
  | 'clock'
  | 'mail'
  | 'rocket'
  | 'sun'
  | 'moon'
  | 'music'
  | 'gamepad'
  | 'book'
  | 'flag'
  | 'check'
  | 'close';

export const ALL_PIXEL_ICON_NAMES: PixelIconName[] = [
  'leaf',
  'island',
  'coin',
  'heart',
  'star',
  'sword',
  'chest',
  'fish',
  'apple',
  'bell',
  'potion',
  'scroll',
  'sparkles',
  'home',
  'search',
  'settings',
  'trophy',
  'clock',
  'mail',
  'rocket',
  'sun',
  'moon',
  'music',
  'gamepad',
  'book',
  'flag',
  'check',
  'close',
];

export interface PixelIconProps {
  name: PixelIconName;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

type RectDef = [x: number, y: number, w: number, h: number, fill?: string];

const ICON_PIXELS: Record<PixelIconName, RectDef[]> = {
  leaf: [
    [8, 1, 5, 2, '#2d5a27'],
    [5, 3, 9, 2, '#5ec956'],
    [3, 5, 11, 3, '#5ec956'],
    [2, 8, 10, 3, '#43a83c'],
    [3, 11, 7, 2, '#43a83c'],
    [2, 13, 2, 2, '#7c532d'],
    [8, 5, 2, 2, '#b6f28d'],
    [6, 7, 2, 2, '#2d5a27'],
    [4, 9, 2, 2, '#2d5a27'],
  ],
  island: [
    [6, 1, 5, 2, '#3cae49'],
    [4, 3, 9, 2, '#5dd168'],
    [8, 5, 2, 4, '#9b6738'],
    [3, 9, 10, 2, '#62cf60'],
    [2, 11, 12, 2, '#f5d77f'],
    [1, 13, 14, 2, '#3dc2d6'],
    [4, 14, 3, 1, '#b6f7ff'],
    [10, 14, 3, 1, '#b6f7ff'],
  ],
  coin: [
    [5, 1, 6, 1, '#7a520c'],
    [3, 2, 10, 12, '#ffd438'],
    [2, 4, 12, 8, '#ffd438'],
    [5, 14, 6, 1, '#7a520c'],
    [5, 3, 2, 2, '#fff7b2'],
    [7, 4, 2, 8, '#d49015'],
    [6, 5, 1, 6, '#fff7b2'],
  ],
  heart: [
    [2, 2, 4, 2, '#ff4d6d'],
    [10, 2, 4, 2, '#ff4d6d'],
    [1, 4, 14, 4, '#ff4d6d'],
    [2, 8, 12, 2, '#e63353'],
    [4, 10, 8, 2, '#e63353'],
    [6, 12, 4, 2, '#c91f3e'],
    [7, 14, 2, 1, '#c91f3e'],
    [3, 4, 2, 2, '#ffb3c1'],
  ],
  star: [
    [7, 1, 2, 3, '#ffd438'],
    [6, 4, 4, 2, '#ffd438'],
    [1, 6, 14, 2, '#ffd438'],
    [3, 8, 10, 2, '#f4b41a'],
    [4, 10, 8, 2, '#f4b41a'],
    [3, 12, 3, 3, '#d9930d'],
    [10, 12, 3, 3, '#d9930d'],
    [6, 5, 2, 2, '#fff7bd'],
  ],
  sword: [
    [12, 1, 3, 3, '#d8f3ff'],
    [10, 3, 3, 3, '#a9def9'],
    [8, 5, 3, 3, '#a9def9'],
    [6, 7, 3, 3, '#7cc6ee'],
    [3, 8, 2, 2, '#f5b82e'],
    [4, 10, 3, 2, '#f5b82e'],
    [6, 11, 2, 2, '#f5b82e'],
    [2, 12, 3, 3, '#8a5529'],
  ],
  chest: [
    [2, 3, 12, 4, '#c9823b'],
    [1, 5, 14, 3, '#b56e28'],
    [1, 8, 14, 2, '#ffd438'],
    [2, 10, 12, 4, '#9a591c'],
    [7, 7, 2, 4, '#fff3a8'],
    [3, 4, 4, 1, '#ebb06b'],
  ],
  fish: [
    [4, 4, 7, 2, '#4cc9f0'],
    [2, 6, 10, 4, '#38b6ff'],
    [4, 10, 7, 2, '#2189d6'],
    [12, 5, 3, 6, '#72ddf7'],
    [4, 7, 2, 2, '#1d2d44'],
    [7, 6, 2, 2, '#b8f2ff'],
  ],
  apple: [
    [7, 1, 2, 3, '#7c4d27'],
    [9, 2, 4, 2, '#5ec956'],
    [3, 4, 10, 3, '#f24b4b'],
    [2, 7, 12, 4, '#e03535'],
    [3, 11, 10, 3, '#c42525'],
    [4, 5, 2, 3, '#ff9e9e'],
  ],
  bell: [
    [7, 1, 2, 2, '#d49015'],
    [4, 3, 8, 3, '#ffd438'],
    [3, 6, 10, 5, '#f6be24'],
    [2, 11, 12, 2, '#e0a112'],
    [6, 13, 4, 2, '#9e6b0b'],
    [5, 4, 2, 4, '#fff7bd'],
  ],
  potion: [
    [6, 1, 4, 2, '#c89b6d'],
    [5, 3, 6, 2, '#a7e8f7'],
    [6, 5, 4, 2, '#a7e8f7'],
    [3, 7, 10, 3, '#d7f4fb'],
    [2, 10, 12, 4, '#a864f7'],
    [4, 14, 8, 1, '#7935c9'],
    [4, 10, 2, 2, '#e2c4ff'],
  ],
  scroll: [
    [2, 2, 11, 2, '#e5c68b'],
    [3, 4, 10, 8, '#fbf1d6'],
    [2, 12, 12, 2, '#d4af70'],
    [5, 6, 6, 1, '#9c7c4c'],
    [5, 8, 5, 1, '#9c7c4c'],
    [5, 10, 6, 1, '#9c7c4c'],
  ],
  sparkles: [
    [9, 1, 2, 2, '#ffd438'],
    [7, 3, 6, 2, '#ffd438'],
    [9, 5, 2, 2, '#ffd438'],
    [3, 7, 2, 2, '#4ce0d2'],
    [1, 9, 6, 2, '#4ce0d2'],
    [3, 11, 2, 2, '#4ce0d2'],
    [10, 10, 2, 4, '#ff85a1'],
    [9, 11, 4, 2, '#ff85a1'],
  ],
  home: [
    [7, 1, 2, 2, '#e56b55'],
    [5, 3, 6, 2, '#e56b55'],
    [3, 5, 10, 2, '#d6523a'],
    [1, 7, 14, 2, '#c24129'],
    [3, 9, 10, 6, '#f9eed4'],
    [7, 11, 3, 4, '#9c6639'],
    [4, 10, 2, 2, '#7bd5f5'],
  ],
  search: [
    [4, 2, 6, 2, '#5c4328'],
    [2, 4, 2, 6, '#5c4328'],
    [10, 4, 2, 6, '#5c4328'],
    [4, 10, 6, 2, '#5c4328'],
    [4, 4, 6, 6, '#aef0ff'],
    [10, 10, 2, 2, '#8a5a32'],
    [12, 12, 3, 3, '#8a5a32'],
  ],
  settings: [
    [6, 1, 4, 2, '#7b8794'],
    [6, 13, 4, 2, '#7b8794'],
    [1, 6, 2, 4, '#7b8794'],
    [13, 6, 2, 4, '#7b8794'],
    [3, 3, 10, 10, '#9aa5b1'],
    [6, 6, 4, 4, '#f8f6eb'],
  ],
  trophy: [
    [3, 2, 10, 5, '#ffd438'],
    [1, 3, 2, 3, '#e8ac19'],
    [13, 3, 2, 3, '#e8ac19'],
    [5, 7, 6, 3, '#f2ba24'],
    [7, 10, 2, 3, '#d49015'],
    [4, 13, 8, 2, '#9e6b0b'],
    [5, 3, 2, 3, '#fff9c4'],
  ],
  clock: [
    [4, 1, 8, 2, '#5c4328'],
    [4, 13, 8, 2, '#5c4328'],
    [1, 4, 2, 8, '#5c4328'],
    [13, 4, 2, 8, '#5c4328'],
    [3, 3, 10, 10, '#fffdf2'],
    [7, 4, 2, 5, '#19c8b9'],
    [7, 8, 4, 2, '#e25555'],
  ],
  mail: [
    [1, 3, 14, 10, '#fff7df'],
    [1, 3, 14, 2, '#d9c6a3'],
    [3, 5, 3, 2, '#e26d5a'],
    [10, 5, 3, 2, '#e26d5a'],
    [6, 7, 4, 2, '#e26d5a'],
    [1, 12, 14, 1, '#9f8864'],
  ],
  rocket: [
    [7, 1, 2, 2, '#ff6b6b'],
    [5, 3, 6, 3, '#f8fafc'],
    [4, 6, 8, 5, '#e2e8f0'],
    [6, 6, 4, 3, '#38bdf8'],
    [2, 9, 2, 4, '#ff6b6b'],
    [12, 9, 2, 4, '#ff6b6b'],
    [6, 11, 4, 3, '#f59e0b'],
    [7, 14, 2, 2, '#fde047'],
  ],
  sun: [
    [7, 1, 2, 2, '#ffb703'],
    [7, 13, 2, 2, '#ffb703'],
    [1, 7, 2, 2, '#ffb703'],
    [13, 7, 2, 2, '#ffb703'],
    [4, 4, 8, 8, '#ffd438'],
    [5, 5, 4, 3, '#fff9c4'],
  ],
  moon: [
    [6, 2, 6, 2, '#fde047'],
    [4, 4, 5, 3, '#fde047'],
    [3, 7, 5, 3, '#facc15'],
    [4, 10, 6, 2, '#facc15'],
    [6, 12, 6, 2, '#eab308'],
  ],
  music: [
    [6, 2, 8, 2, '#a855f7'],
    [6, 4, 2, 7, '#a855f7'],
    [12, 4, 2, 6, '#9333ea'],
    [3, 10, 4, 4, '#7e22ce'],
    [9, 9, 4, 4, '#7e22ce'],
  ],
  gamepad: [
    [2, 4, 12, 8, '#8fa6f8'],
    [1, 6, 14, 5, '#728ce6'],
    [4, 6, 1, 3, '#ffffff'],
    [3, 7, 3, 1, '#ffffff'],
    [11, 6, 2, 2, '#ff6b8b'],
    [9, 8, 2, 2, '#ffd438'],
  ],
  book: [
    [2, 2, 12, 12, '#3b9c8f'],
    [4, 2, 9, 11, '#2dd4bf'],
    [3, 12, 10, 2, '#fef9e7'],
    [6, 4, 5, 2, '#fff7bd'],
    [6, 7, 4, 1, '#115e59'],
  ],
  flag: [
    [3, 1, 2, 14, '#7c532d'],
    [5, 2, 9, 3, '#ff6b6b'],
    [5, 5, 7, 3, '#ff8787'],
    [5, 8, 9, 2, '#fa5252'],
  ],
  check: [
    [12, 3, 2, 2, 'currentColor'],
    [10, 5, 2, 2, 'currentColor'],
    [8, 7, 2, 2, 'currentColor'],
    [6, 9, 2, 2, 'currentColor'],
    [4, 7, 2, 2, 'currentColor'],
    [2, 5, 2, 2, 'currentColor'],
  ],
  close: [
    [3, 3, 2, 2, 'currentColor'],
    [11, 3, 2, 2, 'currentColor'],
    [5, 5, 2, 2, 'currentColor'],
    [9, 5, 2, 2, 'currentColor'],
    [7, 7, 2, 2, 'currentColor'],
    [5, 9, 2, 2, 'currentColor'],
    [9, 9, 2, 2, 'currentColor'],
    [3, 11, 2, 2, 'currentColor'],
    [11, 11, 2, 2, 'currentColor'],
  ],
};

export const PixelIcon: React.FC<PixelIconProps> = ({
  name,
  size = 18,
  color,
  className = '',
  style,
}) => {
  const rects = ICON_PIXELS[name] || ICON_PIXELS.leaf;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      shapeRendering="crispEdges"
      className={`inline-block shrink-0 select-none ${className}`}
      style={{ color, ...style }}
      aria-hidden="true"
    >
      {rects.map(([x, y, w, h, fill], idx) => (
        <rect
          key={idx}
          x={x}
          y={y}
          width={w}
          height={h}
          fill={color || fill || 'currentColor'}
        />
      ))}
    </svg>
  );
};

/* ==========================================================================
   6 Original 16x16 Pixel Animal Villager Sprites (for PixelAvatar & Demos)
   ========================================================================== */
const VILLAGER_SPRITES: Record<PixelVillagerPreset, { bg: string; rects: RectDef[] }> = {
  cat: {
    bg: '#ffe5ec',
    rects: [
      [3, 2, 2, 3, '#f59e56'],
      [11, 2, 2, 3, '#f59e56'],
      [2, 5, 12, 8, '#f7b267'],
      [5, 5, 6, 7, '#fff7e6'],
      [4, 8, 2, 2, '#3a2614'],
      [10, 8, 2, 2, '#3a2614'],
      [7, 9, 2, 1, '#ff6b8b'],
      [2, 9, 2, 1, '#ffb3c1'],
      [12, 9, 2, 1, '#ffb3c1'],
    ],
  },
  shiba: {
    bg: '#fff3d6',
    rects: [
      [2, 2, 3, 3, '#d98a3c'],
      [11, 2, 3, 3, '#d98a3c'],
      [2, 5, 12, 8, '#e69d45'],
      [4, 8, 8, 5, '#fffaf0'],
      [5, 6, 1, 1, '#fffaf0'],
      [10, 6, 1, 1, '#fffaf0'],
      [4, 8, 2, 2, '#2d1e12'],
      [10, 8, 2, 2, '#2d1e12'],
      [7, 10, 2, 2, '#2d1e12'],
    ],
  },
  frog: {
    bg: '#dff8eb',
    rects: [
      [3, 3, 4, 3, '#69cf5e'],
      [9, 3, 4, 3, '#69cf5e'],
      [4, 4, 2, 2, '#233d1b'],
      [10, 4, 2, 2, '#233d1b'],
      [2, 6, 12, 7, '#69cf5e'],
      [4, 10, 8, 3, '#d8f9b8'],
      [3, 8, 2, 2, '#ff8da1'],
      [11, 8, 2, 2, '#ff8da1'],
      [6, 9, 4, 1, '#233d1b'],
    ],
  },
  bunny: {
    bg: '#eee5ff',
    rects: [
      [4, 1, 3, 5, '#ffffff'],
      [9, 1, 3, 5, '#ffffff'],
      [5, 2, 1, 3, '#ffa6c1'],
      [10, 2, 1, 3, '#ffa6c1'],
      [3, 6, 10, 7, '#ffffff'],
      [5, 8, 2, 2, '#4a2545'],
      [9, 8, 2, 2, '#4a2545'],
      [7, 10, 2, 1, '#ff7aa2'],
      [3, 10, 2, 1, '#ffc2d4'],
      [11, 10, 2, 1, '#ffc2d4'],
    ],
  },
  tanuki: {
    bg: '#e5f4df',
    rects: [
      [2, 2, 3, 3, '#6f4e37'],
      [11, 2, 3, 3, '#6f4e37'],
      [2, 5, 12, 8, '#a67b5b'],
      [3, 7, 4, 3, '#4a3222'],
      [9, 7, 4, 3, '#4a3222'],
      [4, 8, 2, 1, '#ffffff'],
      [10, 8, 2, 1, '#ffffff'],
      [6, 10, 4, 3, '#f3e5d0'],
      [7, 10, 2, 1, '#2c1d13'],
      [6, 3, 4, 2, '#5ec956'],
    ],
  },
  owl: {
    bg: '#e0f2fe',
    rects: [
      [2, 3, 2, 2, '#8b6f5c'],
      [12, 3, 2, 2, '#8b6f5c'],
      [3, 4, 10, 9, '#9f816c'],
      [4, 6, 4, 4, '#fffdf5'],
      [8, 6, 4, 4, '#fffdf5'],
      [5, 7, 2, 2, '#2b2118'],
      [9, 7, 2, 2, '#2b2118'],
      [7, 9, 2, 2, '#f59e0b'],
      [5, 11, 6, 2, '#e6d5c3'],
    ],
  },
};

export const PixelVillagerSprite: React.FC<{
  preset: PixelVillagerPreset;
  size?: number;
}> = ({ preset, size = 36 }) => {
  const sprite = VILLAGER_SPRITES[preset] || VILLAGER_SPRITES.cat;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className="block select-none"
    >
      <rect x={0} y={0} width={16} height={16} fill={sprite.bg} />
      {sprite.rects.map(([x, y, w, h, fill], idx) => (
        <rect key={idx} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  );
};

/* ==========================================================================
   32x32 Handcrafted Pixel Floating Island Hero Emblem Illustration
   ========================================================================== */
export const PixelIslandHeroArt: React.FC<{ size?: number; className?: string }> = ({
  size = 188,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      shapeRendering="crispEdges"
      className={`select-none drop-shadow-[0_10px_0_rgba(36,78,52,0.28)] ${className}`}
    >
      {/* Soft sky pixel halo */}
      <rect x={4} y={3} width={24} height={22} fill="#d9fbff" fillOpacity={0.35} />
      {/* Floating pixel cloud top-left */}
      <rect x={2} y={5} width={6} height={2} fill="#ffffff" />
      <rect x={4} y={4} width={3} height={1} fill="#ffffff" />
      {/* Sun top-right */}
      <rect x={24} y={3} width={4} height={4} fill="#ffe156" />
      <rect x={25} y={4} width={2} height={2} fill="#fff9c4" />

      {/* Palm Tree & Lush Leaves */}
      <rect x={11} y={10} width={2} height={7} fill="#9c6234" />
      <rect x={12} y={8} width={2} height={3} fill="#b57642" />
      <rect x={7} y={6} width={11} height={2} fill="#46bd55" />
      <rect x={9} y={4} width={7} height={2} fill="#6be075" />
      <rect x={6} y={8} width={4} height={2} fill="#2f9a3e" />
      <rect x={15} y={8} width={4} height={2} fill="#2f9a3e" />
      {/* Coconuts */}
      <rect x={11} y={8} width={1} height={1} fill="#6e421f" />
      <rect x={13} y={8} width={1} height={1} fill="#6e421f" />

      {/* Cozy Red-Roof Island Cottage */}
      <rect x={17} y={10} width={7} height={2} fill="#ef5b5b" />
      <rect x={16} y={12} width={9} height={2} fill="#d94343" />
      <rect x={17} y={14} width={7} height={4} fill="#fff5db" />
      <rect x={20} y={15} width={2} height={3} fill="#9a6234" />
      <rect x={18} y={15} width={1} height={1} fill="#67d5f8" />

      {/* Golden Treasure Chest on Left */}
      <rect x={6} y={15} width={4} height={3} fill="#d98732" />
      <rect x={6} y={16} width={4} height={1} fill="#ffe156" />

      {/* Island Meadow Top Layer */}
      <rect x={4} y={18} width={24} height={3} fill="#5cd669" />
      <rect x={6} y={17} width={20} height={1} fill="#82ea8b" />
      {/* Little Pixel Flowers */}
      <rect x={8} y={17} width={1} height={1} fill="#ff6b8b" />
      <rect x={15} y={17} width={1} height={1} fill="#ffd438" />
      <rect x={24} y={17} width={1} height={1} fill="#ff6b8b" />

      {/* Sandy Beach Rim & Earth Cliff */}
      <rect x={5} y={21} width={22} height={2} fill="#f7da83" />
      <rect x={7} y={23} width={18} height={3} fill="#9e673a" />
      <rect x={10} y={26} width={12} height={2} fill="#7d4f29" />
      <rect x={13} y={28} width={6} height={2} fill="#5e3a1c" />

      {/* Sparkling Waterfall */}
      <rect x={14} y={20} width={3} height={9} fill="#4ad8f0" />
      <rect x={15} y={21} width={1} height={7} fill="#d6fcff" />
      <rect x={12} y={29} width={7} height={1} fill="#b8f6ff" />
    </svg>
  );
};
