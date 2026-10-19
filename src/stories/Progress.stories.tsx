import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelProgress } from '../pixel-ui';

const meta: Meta<typeof PixelProgress> = {
  title: 'Feedback/PixelProgress',
  component: PixelProgress,
  tags: ['autodocs'],
  parameters: {
    componentId: 'progress',
    docs: {
      description: {
        component:
          'RPG 属性条与海岛建设进度条（PixelProgress），内置 ISLAND 薄荷绿、HP 生命红、MP 魔力蓝、EXP 经验紫 4 套预设，支持分格刻度与动态斜纹。',
      },
    },
  },
  argTypes: {
    percent: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: '当前完成百分比',
    },
    preset: {
      control: 'inline-radio',
      options: ['island', 'hp', 'mp', 'exp'],
      description: 'RPG 颜色主题预设',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    segmented: {
      control: 'boolean',
      description: '像素分格刻度线',
    },
    striped: {
      control: 'boolean',
      description: '动态流动斜纹',
    },
    showInfo: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    percent: 75,
    preset: 'island',
    size: 'md',
    segmented: true,
    striped: true,
    showInfo: true,
    label: 'ISLAND',
  },
};

export default meta;
type Story = StoryObj<typeof PixelProgress>;

export const ProgressPlayground: Story = {
  name: 'Progress 进度条调试',
};

export const RpgStatusBars: Story = {
  name: 'HP / MP / EXP 角色状态面板',
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <PixelProgress label="HP" preset="hp" percent={85} segmented />
      <PixelProgress label="MP" preset="mp" percent={60} segmented />
      <PixelProgress label="EXP" preset="exp" percent={92} striped />
    </div>
  ),
};
