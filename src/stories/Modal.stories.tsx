import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelButton, PixelDrawer, PixelModal, pixelNotify } from '../pixel-ui';

const ModalPlaygroundDemo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <PixelButton variant="primary" icon="bell" onClick={() => setModalOpen(true)}>
        打开像素模态框 Modal
      </PixelButton>
      <PixelButton variant="default" icon="chest" onClick={() => setDrawerOpen(true)}>
        滑出背包抽屉 Drawer
      </PixelButton>
      <PixelButton
        variant="success"
        icon="trophy"
        onClick={() =>
          pixelNotify.success('解锁海岛成就！', '恭喜获得「像素园艺大师」金色徽章 +500 铃钱')
        }
      >
        触发全局通知 Toast
      </PixelButton>

      <PixelModal
        open={modalOpen}
        title="Dodo 航空登机确认"
        onClose={() => setModalOpen(false)}
        onConfirm={() => pixelNotify.info('水上飞机已起飞！', '预计 10 秒后抵达神秘素材岛～')}
      >
        机长莫里：航线风平浪静！准备好携带你的旅行券前往未知的像素群岛探险了吗？
      </PixelModal>

      <PixelDrawer
        open={drawerOpen}
        title="岛民随身百宝箱"
        onClose={() => setDrawerOpen(false)}
      >
        <p className="mb-3">当前背包容量：14 / 20 格，按 ESC 或点击遮罩即可收起抽屉。</p>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <div className="p-2.5 bg-[#fff9db] border-2 border-[#7a5912] rounded-[4px]">
            🍎 特产红苹果 × 10
          </div>
          <div className="p-2.5 bg-[#e4faf7] border-2 border-[#19695e] rounded-[4px]">
            🧪 体力回复药 × 3
          </div>
        </div>
      </PixelDrawer>
    </div>
  );
};

const meta: Meta<typeof PixelModal> = {
  title: 'Feedback/Overlays & Toast',
  component: PixelModal,
  tags: ['autodocs'],
  parameters: {
    componentId: 'modal',
    docs: {
      description: {
        component:
          '像素浮层交互套件（PixelModal 铆钉羊皮纸弹窗、PixelDrawer 背包抽屉、pixelNotify 全局成就通知）。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PixelModal>;

export const InteractiveOverlays: Story = {
  name: 'Modal / Drawer / Notification 联动演示',
  render: () => <ModalPlaygroundDemo />,
};
