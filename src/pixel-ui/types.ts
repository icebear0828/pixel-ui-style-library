export type PixelSize = 'sm' | 'md' | 'lg';

export type PixelColor =
  | 'default'
  | 'mint'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'red'
  | 'lime'
  | 'brown'
  | 'peach';

export interface PixelPaletteEntry {
  bg: string;
  border: string;
  shadow: string;
  text: string;
  dot: string;
}

export const PIXEL_PALETTE: Record<PixelColor, PixelPaletteEntry> = {
  default: {
    bg: '#f9f5e3',
    border: '#6c5132',
    shadow: '#cbbd9f',
    text: '#4d351e',
    dot: 'rgba(155, 134, 101, 0.22)',
  },
  mint: {
    bg: '#7be0ce',
    border: '#19695e',
    shadow: '#3ca896',
    text: '#103e38',
    dot: 'rgba(255, 255, 255, 0.35)',
  },
  pink: {
    bg: '#f9a8b8',
    border: '#7a2e40',
    shadow: '#d17386',
    text: '#4a1824',
    dot: 'rgba(255, 255, 255, 0.36)',
  },
  purple: {
    bg: '#c394f6',
    border: '#502980',
    shadow: '#9260cc',
    text: '#2d144d',
    dot: 'rgba(255, 255, 255, 0.34)',
  },
  blue: {
    bg: '#8fa6f8',
    border: '#2b408a',
    shadow: '#5f77cf',
    text: '#182759',
    dot: 'rgba(255, 255, 255, 0.36)',
  },
  yellow: {
    bg: '#fae06b',
    border: '#7a5912',
    shadow: '#cfa932',
    text: '#4a3305',
    dot: 'rgba(255, 255, 255, 0.42)',
  },
  orange: {
    bg: '#f49d65',
    border: '#7c3912',
    shadow: '#c86f38',
    text: '#4a1e06',
    dot: 'rgba(255, 255, 255, 0.34)',
  },
  green: {
    bg: '#8fd98a',
    border: '#276624',
    shadow: '#5cae57',
    text: '#153d13',
    dot: 'rgba(255, 255, 255, 0.34)',
  },
  red: {
    bg: '#fa7e79',
    border: '#7d201c',
    shadow: '#cc4e49',
    text: '#4a0f0d',
    dot: 'rgba(255, 255, 255, 0.32)',
  },
  lime: {
    bg: '#d9e55b',
    border: '#4d5c12',
    shadow: '#a8b62c',
    text: '#2d3806',
    dot: 'rgba(255, 255, 255, 0.38)',
  },
  brown: {
    bg: '#b6996c',
    border: '#4f3a1d',
    shadow: '#876c43',
    text: '#fffaf0',
    dot: 'rgba(255, 255, 255, 0.24)',
  },
  peach: {
    bg: '#f29f83',
    border: '#783620',
    shadow: '#c47054',
    text: '#471b0d',
    dot: 'rgba(255, 255, 255, 0.34)',
  },
};

export type PixelVillagerPreset = 'cat' | 'shiba' | 'frog' | 'bunny' | 'tanuki' | 'owl';
