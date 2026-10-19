import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PixelBackground,
  PixelClock,
  PixelCountdown,
  PixelCountUp,
  PixelDivider,
  PixelLoading,
  PixelSkeleton,
  PixelTypewriter,
} from '../pixel-ui';

const meta: Meta<typeof PixelBackground> = {
  title: 'Decoration/Wallpapers & HUD',
  component: PixelBackground,
  tags: ['autodocs'],
  parameters: {
    componentId: 'background',
    docs: {
      description: {
        component:
          '海岛装饰壁纸（PixelBackground）、RPG 打字机（PixelTypewriter）、实时 HUD 时钟（PixelClock）、数字滚动（PixelCountUp）与夜空落雪加载（PixelLoading）。',
      },
    },
  },
  argTypes: {
    pattern: {
      control: 'select',
      options: [
        'cream-dots',
        'meadow-grid',
        'sprinkles',
        'starry-night',
        'sand-dither',
        'mint-polka',
      ],
    },
  },
  args: {
    pattern: 'sprinkles',
  },
};

export default meta;
type Story = StoryObj<typeof PixelBackground>;

export const WallpaperAndHud: Story = {
  name: 'Background + HUD 时钟与计分动效',
  render: (args) => (
    <PixelBackground {...args} className="flex flex-col gap-4">
      <div className="font-bold text-sm">
        <PixelTypewriter text="欢迎来到薄荷星露岛！今天也是阳光明媚的好天气～" />
      </div>
      <PixelDivider variant="leaves" label="HUD 实时组件" />
      <div className="flex flex-wrap items-center gap-4">
        <PixelClock />
        <PixelCountUp end={99850} suffix=" Bells" />
        <PixelCountdown seconds={3725} />
      </div>
    </PixelBackground>
  ),
};

export const NightSnowfallAndSkeleton: Story = {
  name: 'Loading 夜空落雪 & Skeleton 骨架屏',
  render: () => (
    <div className="flex flex-col gap-4">
      <PixelLoading tip="正在前往神秘流星岛" />
      <PixelSkeleton rows={3} avatar />
    </div>
  ),
};
