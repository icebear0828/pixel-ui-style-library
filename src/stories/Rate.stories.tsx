import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelRate } from '../pixel-ui';

const meta: Meta<typeof PixelRate> = {
  title: 'Data Entry/PixelRate',
  component: PixelRate,
  tags: ['autodocs'],
  parameters: {
    componentId: 'rate',
    docs: {
      description: {
        component:
          '海岛五星好感度/星级评价组件（PixelRate），支持星星、爱心、铃钱金币与红苹果 4 种像素图腾。',
      },
    },
  },
  argTypes: {
    character: {
      control: 'select',
      options: ['star', 'heart', 'coin', 'apple'],
      description: '评分像素图标样式',
    },
    count: {
      control: { type: 'range', min: 3, max: 8, step: 1 },
      description: '总星数上限',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    readonly: {
      control: 'boolean',
    },
  },
  args: {
    defaultValue: 5,
    count: 5,
    character: 'star',
    size: 'lg',
    readonly: false,
  },
};

export default meta;
type Story = StoryObj<typeof PixelRate>;

export const IslandRating: Story = {
  name: 'Interactive 五星岛屿评定',
};

export const CustomIcons: Story = {
  name: 'Heart & Coin 好感度与金币评定',
  render: () => (
    <div className="flex flex-col gap-3">
      <PixelRate character="heart" defaultValue={4} size="md" />
      <PixelRate character="coin" defaultValue={5} size="md" />
      <PixelRate character="apple" defaultValue={3} size="md" />
    </div>
  ),
};
