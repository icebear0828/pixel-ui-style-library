import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelAvatar, PixelAvatarGroup, PixelBadge } from '../pixel-ui';

const meta: Meta<typeof PixelAvatar> = {
  title: 'Data Display/PixelAvatar',
  component: PixelAvatar,
  tags: ['autodocs'],
  parameters: {
    componentId: 'avatar',
    docs: {
      description: {
        component:
          '像素岛民头像组件（PixelAvatar & PixelAvatarGroup），内置橘猫、柴犬、青蛙、白兔、狸猫、猫头鹰 6 位原创 16×16 像素动物村民精灵，并支持角标与头像组折叠。',
      },
    },
  },
  argTypes: {
    villager: {
      control: 'select',
      options: ['cat', 'shiba', 'frog', 'bunny', 'tanuki', 'owl'],
      description: '内置像素小动物岛民角色',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'inline-radio',
      options: ['square', 'round'],
    },
  },
  args: {
    villager: 'cat',
    size: 'lg',
    shape: 'square',
  },
};

export default meta;
type Story = StoryObj<typeof PixelAvatar>;

export const VillagerAvatar: Story = {
  name: 'Villager 岛民头像',
};

export const VillagerSquad: Story = {
  name: 'AvatarGroup & Badge 岛民小队',
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <PixelBadge count={8} color="red">
        <PixelAvatar villager="cat" size="lg" />
      </PixelBadge>
      <PixelBadge dot color="green">
        <PixelAvatar villager="shiba" size="lg" />
      </PixelBadge>
      <PixelAvatarGroup max={4}>
        <PixelAvatar villager="cat" />
        <PixelAvatar villager="shiba" />
        <PixelAvatar villager="frog" />
        <PixelAvatar villager="bunny" />
        <PixelAvatar villager="tanuki" />
        <PixelAvatar villager="owl" />
      </PixelAvatarGroup>
    </div>
  ),
};
