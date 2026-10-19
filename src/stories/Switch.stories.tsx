import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelSwitch } from '../pixel-ui';

const meta: Meta<typeof PixelSwitch> = {
  title: 'Data Entry/PixelSwitch',
  component: PixelSwitch,
  tags: ['autodocs'],
  parameters: {
    componentId: 'switch',
    docs: {
      description: {
        component: '8-Bit 机械拨杆像素开关（PixelSwitch），支持自定义开启/关闭像素标签文字与两档尺寸。',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    checkedText: { control: 'text' },
    uncheckedText: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    defaultChecked: true,
    size: 'md',
    checkedText: 'ON',
    uncheckedText: 'OFF',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PixelSwitch>;

export const DefaultSwitch: Story = {
  name: 'Toggle 像素拨杆开关',
};

export const SwitchMatrix: Story = {
  name: 'Sizes & Disabled 矩阵',
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      <PixelSwitch defaultChecked checkedText="昼" uncheckedText="夜" />
      <PixelSwitch size="sm" defaultChecked />
      <PixelSwitch disabled defaultChecked />
    </div>
  ),
};
