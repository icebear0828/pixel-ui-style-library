import type { Meta, StoryObj } from '@storybook/react-vite';
import { PixelAvatar, PixelCollapse, PixelPagination, PixelTable, PixelTag } from '../pixel-ui';

const VILLAGER_DATA = [
  { key: '1', avatar: 'cat', name: '橘子酱 Tangy', hobby: '果园歌唱', bells: 18500, rarity: 'SSR' },
  { key: '2', avatar: 'shiba', name: '豆柴 Kiki', hobby: '海边巡逻', bells: 12400, rarity: 'SR' },
  { key: '3', avatar: 'frog', name: '荷叶丸 Lily', hobby: '雨天垂钓', bells: 23900, rarity: 'SSR' },
  { key: '4', avatar: 'owl', name: '傅达 Blathers', hobby: '化石鉴定', bells: 31000, rarity: 'UR' },
];

const meta: Meta<typeof PixelTable> = {
  title: 'Data Display/Table & Collapse',
  component: PixelTable,
  tags: ['autodocs'],
  parameters: {
    componentId: 'table',
    docs: {
      description: {
        component:
          '像素账本数据表格（PixelTable）、任务日志折叠面板（PixelCollapse）与分页器（PixelPagination）组合展示。',
      },
    },
  },
  argTypes: {
    striped: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    striped: true,
    loading: false,
    dataSource: VILLAGER_DATA,
    columns: [
      {
        key: 'name',
        title: '岛民姓名',
        sortable: true,
        render: (_v, row) => (
          <div className="inline-flex items-center gap-2 font-bold">
            <PixelAvatar villager={row.avatar as 'cat'} size="sm" />
            <span>{String(row.name)}</span>
          </div>
        ),
      },
      { key: 'hobby', title: '日常爱好' },
      {
        key: 'bells',
        title: '存款铃钱',
        sortable: true,
        render: (v) => <span className="font-mono font-bold">{Number(v).toLocaleString()} B</span>,
      },
      {
        key: 'rarity',
        title: '评级',
        render: (v) => <PixelTag color="yellow" size="sm">{String(v)}</PixelTag>,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof PixelTable>;

export const VillagerLedgerTable: Story = {
  name: 'Table & Pagination 岛民名册表',
  render: (args) => (
    <div className="flex flex-col gap-3">
      <PixelTable {...args} />
      <div className="flex justify-end">
        <PixelPagination total={36} pageSize={10} defaultCurrent={1} />
      </div>
    </div>
  ),
};

export const QuestAccordion: Story = {
  name: 'Collapse 任务手账折叠面板',
  render: () => (
    <PixelCollapse
      defaultActiveKeys={['q1']}
      items={[
        {
          key: 'q1',
          label: '主线任务：扩建海岛博物馆',
          badge: '进行中',
          children: '收集 5 件不同的鱼类或昆虫标本交给馆长傅达，次日即可迎来盛大开馆仪式。',
        },
        {
          key: 'q2',
          label: '支线委托：铺设海滨像素步道',
          badge: '+800 里程',
          children: '使用「我的设计」像素画板铺设 10 块暖砂石板路连接机场与广场。',
        },
      ]}
    />
  ),
};
