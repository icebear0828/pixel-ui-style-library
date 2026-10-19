import type { Meta, StoryObj } from '@storybook/react-vite';
import { ALL_PIXEL_ICON_NAMES, PixelIcon } from '../pixel-ui';

const meta: Meta<typeof PixelIcon> = {
  title: 'Decoration/PixelIcon',
  component: PixelIcon,
  tags: ['autodocs'],
  parameters: {
    componentId: 'icon',
    docs: {
      description: {
        component:
          '原创 16×16 严格整数网格 SVG 像素图标库（PixelIcon），共 28 枚海岛与 RPG 常用图标，任意缩放保持零模糊像素边缘。',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ALL_PIXEL_ICON_NAMES,
      description: '像素图标名称',
    },
    size: {
      control: { type: 'range', min: 16, max: 96, step: 8 },
      description: '像素尺寸（推荐 16 的整数倍）',
    },
    color: {
      control: 'color',
      description: '单色覆盖（留空则渲染多色原画调色板）',
    },
  },
  args: {
    name: 'island',
    size: 48,
  },
};

export default meta;
type Story = StoryObj<typeof PixelIcon>;

export const SingleSprite: Story = {
  name: 'Single 像素精灵放大镜',
};

export const FullIconSheet: Story = {
  name: 'All 28 Sprites 全图鉴精灵表',
  render: () => (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
      {ALL_PIXEL_ICON_NAMES.map((iconName) => (
        <div
          key={iconName}
          className="flex flex-col items-center gap-1.5 p-2.5 bg-[var(--px-surface)] border-2 border-[var(--px-border)] rounded-[4px]"
        >
          <PixelIcon name={iconName} size={28} />
          <span className="text-[11px] font-bold text-[var(--px-ink-body)]">{iconName}</span>
        </div>
      ))}
    </div>
  ),
};
