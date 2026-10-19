import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelCheckboxGroup, PixelRadioGroup } from '../pixel-ui';

const meta: Meta<typeof PixelCheckboxGroup> = {
  title: 'Data Entry/Checkbox & Radio',
  component: PixelCheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    componentId: 'checkbox',
    docs: {
      description: {
        component:
          '像素多选框组（PixelCheckboxGroup）与像素单选框组（PixelRadioGroup），支持水平/垂直排布与胶囊按钮分段模式。',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    options: [
      { label: '苹果果园', value: 'apple' },
      { label: '竹林温泉', value: 'bamboo' },
      { label: '灯塔码头', value: 'pier' },
      { label: '观星高地', value: 'star' },
    ],
    defaultValue: ['apple', 'pier'],
    direction: 'horizontal',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof PixelCheckboxGroup>;

export const CheckboxPlayground: Story = {
  name: 'CheckboxGroup 多选框组',
};

export const RadioStyles: Story = {
  name: 'RadioGroup 单选与胶囊按钮',
  render: () => (
    <div className="flex flex-col gap-4">
      <PixelRadioGroup
        defaultValue="north"
        options={[
          { label: '北半球岛屿', value: 'north' },
          { label: '南半球岛屿', value: 'south' },
        ]}
      />
      <PixelRadioGroup
        optionType="button"
        defaultValue="spring"
        options={[
          { label: '🌸 春季', value: 'spring' },
          { label: '🌊 夏季', value: 'summer' },
          { label: '🍁 秋季', value: 'autumn' },
          { label: '❄️ 冬季', value: 'winter' },
        ]}
      />
    </div>
  ),
};
