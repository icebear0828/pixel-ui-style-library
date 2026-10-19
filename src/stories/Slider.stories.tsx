import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelSlider } from '../pixel-ui';

const meta: Meta<typeof PixelSlider> = {
  title: 'Data Entry/PixelSlider',
  component: PixelSlider,
  tags: ['autodocs'],
  parameters: {
    componentId: 'slider',
    docs: {
      description: {
        component:
          '像素步进数值滑块（PixelSlider），配备高对比度方块拨片与实时 HUD 数值铭牌，适合音量、海风强度与 RPG 能力配点。',
      },
    },
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    defaultValue: 70,
    min: 0,
    max: 100,
    step: 5,
    showValue: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PixelSlider>;

export const SliderPlayground: Story = {
  name: 'Slider 步进滑块',
};
