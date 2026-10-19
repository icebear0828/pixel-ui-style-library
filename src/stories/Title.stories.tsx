import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelTitle } from '../pixel-ui';

const meta: Meta<typeof PixelTitle> = {
  title: 'General/PixelTitle',
  component: PixelTitle,
  tags: ['autodocs'],
  parameters: {
    componentId: 'title',
    docs: {
      description: {
        component:
          '燕尾丝带标题横幅（PixelTitle），采用双侧阶梯燕尾折角与 12 色海岛主题色板。',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'mint',
        'pink',
        'purple',
        'blue',
        'yellow',
        'orange',
        'green',
        'red',
        'lime',
        'brown',
        'peach',
        'default',
      ],
      description: '丝带横幅主题色',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: '横幅尺寸',
    },
    icon: {
      control: 'select',
      options: ['island', 'star', 'trophy', 'leaf', 'bell', 'sparkles'],
      description: '前缀像素图标',
    },
    children: {
      control: 'text',
      description: '标题文字',
    },
    subtitle: {
      control: 'text',
      description: '底部副标题说明',
    },
  },
  args: {
    children: '海岛博物图鉴馆',
    color: 'mint',
    size: 'md',
    icon: 'island',
    subtitle: '收录全岛 128 种鱼类、昆虫与古代像素化石',
  },
};

export default meta;
type Story = StoryObj<typeof PixelTitle>;

export const Playground: Story = {
  name: 'Ribbon 横幅预览',
};

export const PaletteGallery: Story = {
  name: '12 色海岛丝带墙',
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        ['mint', 'pink', 'yellow', 'blue', 'purple', 'orange', 'green', 'peach'] as const
      ).map((c) => (
        <PixelTitle key={c} color={c} size="sm" icon="star">
          {c.toUpperCase()} RIBBON
        </PixelTitle>
      ))}
    </div>
  ),
};
