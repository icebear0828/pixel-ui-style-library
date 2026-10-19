import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelButton } from '../pixel-ui';

const meta: Meta<typeof PixelButton> = {
  title: 'General/PixelButton',
  component: PixelButton,
  tags: ['autodocs'],
  parameters: {
    componentId: 'button',
    docs: {
      description: {
        component:
          '3D 阶梯阴影像素游戏按钮（PixelButton），支持 6 种语义变体、3 档尺寸、28 种内置像素图标、加载态与按压回弹物理反馈。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'ghost', 'success', 'danger'],
      description: '按钮视觉变体类型',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: '按钮尺寸档位',
    },
    icon: {
      control: 'select',
      options: ['island', 'leaf', 'coin', 'heart', 'star', 'rocket', 'sword', 'chest'],
      description: '内置 16×16 像素图标名称',
    },
    children: {
      control: 'text',
      description: '按钮文本内容',
    },
    loading: {
      control: 'boolean',
      description: '是否处于像素旋转加载中',
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态',
    },
    block: {
      control: 'boolean',
      description: '是否撑满父容器宽度',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    icon: 'island',
    children: '登岛冒险 Start!',
    loading: false,
    disabled: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof PixelButton>;

export const Primary: Story = {
  name: 'Primary 主按钮',
};

export const AllVariants: Story = {
  name: 'Variants 六种变体',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <PixelButton {...args} variant="primary" icon="island">
        Primary 主按钮
      </PixelButton>
      <PixelButton {...args} variant="default" icon="leaf">
        Default 默认
      </PixelButton>
      <PixelButton {...args} variant="success" icon="trophy">
        Success 收获
      </PixelButton>
      <PixelButton {...args} variant="dashed" icon="scroll">
        Dashed 虚线
      </PixelButton>
      <PixelButton {...args} variant="danger" icon="sword">
        Danger 警告
      </PixelButton>
      <PixelButton {...args} variant="ghost" icon="sparkles">
        Ghost 幽灵
      </PixelButton>
    </div>
  ),
};

export const ThreeSizes: Story = {
  name: 'Sizes 三档尺寸',
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <PixelButton variant="primary" size="sm" icon="coin">
        Small (32px)
      </PixelButton>
      <PixelButton variant="primary" size="md" icon="coin">
        Medium (40px)
      </PixelButton>
      <PixelButton variant="primary" size="lg" icon="rocket">
        Large (48px)
      </PixelButton>
    </div>
  ),
};

export const States: Story = {
  name: 'Loading & Disabled 状态',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <PixelButton variant="primary" loading>
        航行加载中...
      </PixelButton>
      <PixelButton variant="default" disabled icon="chest">
        未解锁宝箱
      </PixelButton>
    </div>
  ),
};
