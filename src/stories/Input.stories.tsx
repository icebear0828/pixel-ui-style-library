import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelInput } from '../pixel-ui';

const meta: Meta<typeof PixelInput> = {
  title: 'Data Entry/PixelInput',
  component: PixelInput,
  tags: ['autodocs'],
  parameters: {
    componentId: 'input',
    docs: {
      description: {
        component:
          '内凹像素边框输入框（PixelInput），遵循海岛设计准则采用暖黄高光聚焦环（#FFCC00），支持清空按钮、前后缀与校验状态。',
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: '输入框高度档位',
    },
    status: {
      control: 'inline-radio',
      options: ['default', 'warning', 'error'],
      description: '校验反馈状态',
    },
    placeholder: {
      control: 'text',
      description: '占位提示文案',
    },
    allowClear: {
      control: 'boolean',
      description: '是否显示像素清空按钮',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用输入',
    },
  },
  args: {
    size: 'md',
    status: 'default',
    placeholder: '给你的像素小岛起个名字...',
    defaultValue: '薄荷星露岛',
    allowClear: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PixelInput>;

export const DefaultInput: Story = {
  name: 'Interactive 基础输入',
};

export const ValidationStates: Story = {
  name: 'Status 校验与禁用',
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <PixelInput defaultValue="正常输入状态" allowClear />
      <PixelInput status="warning" defaultValue="岛屿名称接近字数上限" />
      <PixelInput status="error" defaultValue="包含未解锁特殊符号!" />
      <PixelInput disabled defaultValue="只读航线坐标 #8092" />
    </div>
  ),
};
