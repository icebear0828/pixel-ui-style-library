import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelTabs } from '../pixel-ui';

const DEMO_TABS = [
  {
    key: 'fish',
    label: '鱼类图鉴',
    icon: 'fish' as const,
    children: '已捕获：皇带鱼、腔棘鱼、蓝鳃太阳鱼（北半球夏季活跃时段 09:00 - 16:00）。',
  },
  {
    key: 'bag',
    label: '工具背包',
    icon: 'chest' as const,
    children: '当前装备：★ 星光浇水壶、黄金捕虫网、竹制竹竿与 12 枚旅行券。',
  },
  {
    key: 'quest',
    label: '每日委托',
    icon: 'scroll' as const,
    children: '今日里程任务：给 3 位岛民赠送苹果（已完成 3/3，可前往服务处领取 500 里程！）。',
  },
];

const meta: Meta<typeof PixelTabs> = {
  title: 'Data Display/PixelTabs',
  component: PixelTabs,
  tags: ['autodocs'],
  parameters: {
    componentId: 'tabs',
    docs: {
      description: {
        component:
          '像素档案夹与胶囊标签页（PixelTabs），支持 folder 档案折页风格与 pill 游戏背包胶囊风格。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['folder', 'pill'],
      description: '标签栏样式形态',
    },
  },
  args: {
    items: DEMO_TABS,
    variant: 'folder',
  },
};

export default meta;
type Story = StoryObj<typeof PixelTabs>;

export const FolderTabs: Story = {
  name: 'Folder 像素档案夹标签页',
};

export const PillTabs: Story = {
  name: 'Pill 胶囊切换标签页',
  args: {
    variant: 'pill',
  },
};
