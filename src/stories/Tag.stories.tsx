import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelTag } from '../pixel-ui';

const meta: Meta<typeof PixelTag> = {
  title: 'Data Display/PixelTag',
  component: PixelTag,
  tags: ['autodocs'],
  parameters: {
    componentId: 'tag',
    docs: {
      description: {
        component:
          '像素胶囊标签（PixelTag），支持实心 Solid、描边 Outlined、虚线 Dashed 三种形态与 12 色海岛主题色，支持图标与可关闭交互。',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['mint', 'pink', 'purple', 'blue', 'yellow', 'orange', 'green', 'red', 'peach'],
    },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outlined', 'dashed'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: 'select',
      options: ['leaf', 'star', 'coin', 'heart', 'fish', 'trophy'],
    },
    closable: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: '春季限定樱花祭',
    color: 'pink',
    variant: 'solid',
    size: 'md',
    icon: 'sparkles',
    closable: false,
  },
};

export default meta;
type Story = StoryObj<typeof PixelTag>;

export const TagPlayground: Story = {
  name: 'Tag 标签交互预览',
};

export const TagVariants: Story = {
  name: 'Solid / Outlined / Dashed 组合',
  render: () => (
    <div className="flex flex-wrap gap-2.5">
      <PixelTag color="mint" icon="leaf">海岛居民</PixelTag>
      <PixelTag color="yellow" icon="coin">稀有度 SSR</PixelTag>
      <PixelTag color="purple" variant="outlined" icon="potion">附魔药水</PixelTag>
      <PixelTag color="orange" variant="dashed" icon="chest">待鉴定化石</PixelTag>
    </div>
  ),
};
