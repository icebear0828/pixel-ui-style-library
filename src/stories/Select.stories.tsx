import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelSelect } from '../pixel-ui';

const ISLAND_OPTIONS = [
  { label: '黄金钓鱼竿 Golden Rod', value: 'rod', icon: 'fish' as const },
  { label: '星露生命药水 Potion', value: 'potion', icon: 'potion' as const },
  { label: '铃钱袋 99,000 Bells', value: 'coin', icon: 'coin' as const },
  { label: '红富士苹果 Apple', value: 'apple', icon: 'apple' as const },
  { label: '远古藏宝图 Scroll', value: 'scroll', icon: 'scroll' as const },
];

const meta: Meta<typeof PixelSelect> = {
  title: 'Data Entry/PixelSelect',
  component: PixelSelect,
  tags: ['autodocs'],
  parameters: {
    componentId: 'select',
    docs: {
      description: {
        component:
          '像素下拉选择器（PixelSelect），支持关键字实时检索过滤、像素图标选项、一键清空及禁用项。',
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    showSearch: {
      control: 'boolean',
      description: '开启下拉搜索框',
    },
    allowClear: {
      control: 'boolean',
      description: '允许清空选中值',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    options: ISLAND_OPTIONS,
    defaultValue: 'rod',
    size: 'md',
    showSearch: true,
    allowClear: true,
    disabled: false,
    placeholder: '选择背包道具...',
  },
};

export default meta;
type Story = StoryObj<typeof PixelSelect>;

export const SearchableSelect: Story = {
  name: 'Searchable 搜索下拉',
};
