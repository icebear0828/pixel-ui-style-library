import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelCard, PixelTag } from '../pixel-ui';

const meta: Meta<typeof PixelCard> = {
  title: 'Data Display/PixelCard',
  component: PixelCard,
  tags: ['autodocs'],
  parameters: {
    componentId: 'card',
    docs: {
      description: {
        component:
          '海岛像素卡片容器（PixelCard），内置 12 色海岛色卡体系与零图片 CSS 波点壁纸，并额外提供经典黑底白框 RPG 对话框风格。',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
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
      ],
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'dashed', 'rpg'],
    },
    pattern: {
      control: 'boolean',
      description: '开启海岛波点图案底纹',
    },
    hoverable: {
      control: 'boolean',
      description: '悬浮上浮微动效',
    },
    title: {
      control: 'text',
    },
  },
  args: {
    title: '狸克建设事务所公告',
    color: 'default',
    variant: 'default',
    pattern: true,
    hoverable: true,
    children: '今日海滩南侧新木桥已竣工！欢迎各位岛民前往散步垂钓与观赏流星雨。',
  },
};

export default meta;
type Story = StoryObj<typeof PixelCard>;

export const CardPlayground: Story = {
  name: 'Card 交互卡片预览',
};

export const TwelveIslandColors: Story = {
  name: '12 色波点海岛色卡矩阵',
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {(
        ['mint', 'pink', 'yellow', 'blue', 'purple', 'orange', 'green', 'red', 'peach'] as const
      ).map((color) => (
        <PixelCard key={color} color={color} pattern hoverable>
          <div className="font-extrabold text-sm uppercase">{color}</div>
          <div className="text-xs opacity-85 mt-1">Polka Wallpaper</div>
        </PixelCard>
      ))}
    </div>
  ),
};

export const RpgDialogBox: Story = {
  name: 'RPG 经典像素对话窗',
  render: () => (
    <PixelCard
      variant="rpg"
      title="★ 守门人傅达"
      extra={<PixelTag color="yellow" size="sm">NPC</PixelTag>}
    >
      呼呼～这件远古三叶虫像素化石保存得相当完好！要立即捐赠给海岛博物馆吗？
    </PixelCard>
  ),
};
