import React, { useState } from 'react';
import {
  ALL_PIXEL_ICON_NAMES,
  PixelAvatar,
  PixelAvatarGroup,
  PixelBackground,
  PixelBadge,
  PixelButton,
  PixelCard,
  PixelCheckbox,
  PixelCheckboxGroup,
  PixelClock,
  PixelCodeBlock,
  PixelCollapse,
  PixelColor,
  PixelCountdown,
  PixelCountUp,
  PixelCursor,
  PixelDivider,
  PixelDrawer,
  PixelIcon,
  PixelIconName,
  PixelInput,
  PixelLoading,
  PixelModal,
  pixelNotify,
  PixelPagination,
  PixelProgress,
  PixelRadioGroup,
  PixelRate,
  PixelSelect,
  PixelSkeleton,
  PixelSlider,
  PixelSwitch,
  PixelTable,
  PixelTabs,
  PixelTag,
  PixelTitle,
  PixelTooltip,
  PixelTypewriter,
} from '../pixel-ui';

export type ComponentCategoryKey =
  | 'general'
  | 'entry'
  | 'display'
  | 'feedback'
  | 'decoration';

export interface ComponentApiRow {
  prop: string;
  desc: string;
  type: string;
  defaultVal: string;
}

export interface ComponentDemoBlock {
  title: string;
  desc: string;
  code: string;
  render: () => React.ReactNode;
}

export interface ComponentCatalogItem {
  id: string;
  name: string;
  cnName: string;
  category: ComponentCategoryKey;
  icon: PixelIconName;
  desc: string;
  storyComponentId: string;
  miniPreview: () => React.ReactNode;
  demos: ComponentDemoBlock[];
  api: ComponentApiRow[];
}

export const CATEGORY_LABELS: Record<ComponentCategoryKey, { label: string; en: string }> = {
  general: { label: '通用组件', en: 'GENERAL' },
  entry: { label: '数据录入', en: 'DATA ENTRY' },
  display: { label: '数据展示', en: 'DATA DISPLAY' },
  feedback: { label: '反馈与导航', en: 'FEEDBACK & NAV' },
  decoration: { label: '海岛装饰与动效', en: 'DECORATION' },
};

/* Interactive helper stateful widgets used inside ComponentDocPage demos */
const InteractiveModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-3">
      <PixelButton variant="primary" icon="bell" onClick={() => setOpen(true)}>
        打开像素铆钉弹窗
      </PixelButton>
      <PixelModal
        open={open}
        title="海岛机场登机口"
        onClose={() => setOpen(false)}
        onConfirm={() => pixelNotify.success('登机成功！', '欢迎前往薄荷珊瑚群岛探险～')}
      >
        请确认已携带好捕虫网、钓鱼竿与像素相机！按键盘 ESC 或点击遮罩均可随时关闭。
      </PixelModal>
    </div>
  );
};

const InteractiveDrawerDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'right' | 'left' | 'bottom'>('right');
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PixelRadioGroup
        optionType="button"
        value={placement}
        onChange={(v) => setPlacement(v as 'right' | 'left' | 'bottom')}
        options={[
          { label: '右侧滑出', value: 'right' },
          { label: '左侧滑出', value: 'left' },
          { label: '底部弹出', value: 'bottom' },
        ]}
      />
      <PixelButton variant="primary" icon="chest" onClick={() => setOpen(true)}>
        打开背包抽屉
      </PixelButton>
      <PixelDrawer
        open={open}
        placement={placement}
        title="岛民随身百宝袋"
        onClose={() => setOpen(false)}
      >
        <div className="grid grid-cols-2 gap-2.5">
          <PixelCard color="yellow" pattern>
            <div className="font-extrabold text-xs">💰 铃钱袋 × 99</div>
          </PixelCard>
          <PixelCard color="mint" pattern>
            <div className="font-extrabold text-xs">🌿 像素树苗 × 12</div>
          </PixelCard>
          <PixelCard color="pink" pattern>
            <div className="font-extrabold text-xs">🍎 特产红果 × 20</div>
          </PixelCard>
          <PixelCard color="purple" pattern>
            <div className="font-extrabold text-xs">🧪 星空药水 × 5</div>
          </PixelCard>
        </div>
      </PixelDrawer>
    </div>
  );
};

const InteractiveSkeletonDemo: React.FC = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <PixelButton
          size="sm"
          variant="primary"
          icon="sparkles"
          onClick={() => setLoading((v) => !v)}
        >
          {loading ? '点击切换为真实岛民卡片' : '恢复像素骨架屏加载态'}
        </PixelButton>
      </div>
      <PixelSkeleton loading={loading} rows={3} avatar>
        <PixelCard color="mint" pattern>
          <div className="flex items-center gap-3">
            <PixelAvatar villager="cat" size="lg" />
            <div>
              <div className="font-extrabold text-sm">橘子酱 · 海岛果园园长</div>
              <div className="text-xs opacity-90 mt-1">
                口头禅：“喵呜！今天新摘的甜橙分你一半～”
              </div>
            </div>
          </div>
        </PixelCard>
      </PixelSkeleton>
    </div>
  );
};

const InteractiveCountUpDemo: React.FC = () => {
  const [seed, setSeed] = useState(1);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <PixelCountUp key={seed} end={88600 + seed * 1200} suffix=" Bells" />
      <PixelClock />
      <PixelCountdown seconds={5390} />
      <PixelButton size="sm" icon="coin" onClick={() => setSeed((s) => s + 1)}>
        重播计分滚动
      </PixelButton>
    </div>
  );
};

export const COMPONENT_CATALOG: ComponentCatalogItem[] = [
  /* ===================== GENERAL ===================== */
  {
    id: 'button',
    name: 'Button',
    cnName: '按钮',
    category: 'general',
    icon: 'gamepad',
    storyComponentId: 'button',
    desc: '3D 阶梯阴影像素游戏按钮，支持 6 种变体、3 档尺寸、28 种图标与按压回弹手感。',
    miniPreview: () => (
      <div className="flex items-center gap-2 pointer-events-none">
        <PixelButton size="sm" variant="primary" icon="island">
          出发
        </PixelButton>
        <PixelButton size="sm" variant="default">
          背包
        </PixelButton>
      </div>
    ),
    demos: [
      {
        title: '六种语义变体',
        desc: '主按钮与状态按钮采用 4px 像素硬阴影，点击时触发真实掌机按键下压反馈。',
        code: `<PixelButton variant="primary" icon="island">登岛冒险</PixelButton>\n<PixelButton variant="default" icon="leaf">日常采集</PixelButton>\n<PixelButton variant="success" icon="trophy">领取奖励</PixelButton>\n<PixelButton variant="dashed" icon="scroll">虚线委托</PixelButton>\n<PixelButton variant="danger" icon="sword">危险区域</PixelButton>\n<PixelButton variant="ghost">幽灵按钮</PixelButton>`,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <PixelButton variant="primary" icon="island">
              登岛冒险
            </PixelButton>
            <PixelButton variant="default" icon="leaf">
              日常采集
            </PixelButton>
            <PixelButton variant="success" icon="trophy">
              领取奖励
            </PixelButton>
            <PixelButton variant="dashed" icon="scroll">
              虚线委托
            </PixelButton>
            <PixelButton variant="danger" icon="sword">
              危险区域
            </PixelButton>
            <PixelButton variant="ghost">幽灵按钮</PixelButton>
          </div>
        ),
      },
      {
        title: '尺寸规格与状态',
        desc: '提供 sm (32px)、md (40px)、lg (48px) 三档高度，以及 loading 与 disabled 状态。',
        code: `<PixelButton size="sm" variant="primary">Small</PixelButton>\n<PixelButton size="md" variant="primary">Medium</PixelButton>\n<PixelButton size="lg" variant="primary" icon="rocket">Large</PixelButton>\n<PixelButton loading variant="primary">加载中</PixelButton>\n<PixelButton disabled>已锁定</PixelButton>`,
        render: () => (
          <div className="flex flex-wrap items-end gap-3">
            <PixelButton size="sm" variant="primary">
              Small
            </PixelButton>
            <PixelButton size="md" variant="primary">
              Medium
            </PixelButton>
            <PixelButton size="lg" variant="primary" icon="rocket">
              Large
            </PixelButton>
            <PixelButton loading variant="primary">
              加载中
            </PixelButton>
            <PixelButton disabled>已锁定</PixelButton>
          </div>
        ),
      },
    ],
    api: [
      { prop: 'variant', desc: '按钮视觉风格', type: "'primary' | 'default' | 'dashed' | 'ghost' | 'success' | 'danger'", defaultVal: "'default'" },
      { prop: 'size', desc: '尺寸档位', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'" },
      { prop: 'icon', desc: '内置 16×16 像素图标名或自定义节点', type: 'PixelIconName | ReactNode', defaultVal: '-' },
      { prop: 'loading', desc: '像素方块旋转加载态', type: 'boolean', defaultVal: 'false' },
      { prop: 'block', desc: '是否撑满整行宽度', type: 'boolean', defaultVal: 'false' },
    ],
  },
  {
    id: 'icon',
    name: 'Icon',
    cnName: '像素图标',
    category: 'general',
    icon: 'sparkles',
    storyComponentId: 'icon',
    desc: '28 枚纯手工绘制 16×16 整数网格 SVG 像素海岛图标，任意缩放保持零锯齿模糊。',
    miniPreview: () => (
      <div className="flex items-center gap-2.5">
        <PixelIcon name="island" size={24} />
        <PixelIcon name="coin" size={24} />
        <PixelIcon name="heart" size={24} />
        <PixelIcon name="chest" size={24} />
      </div>
    ),
    demos: [
      {
        title: '全量 28 枚原创海岛像素图标（点击即可复制 JSX）',
        desc: '全部采用 crispEdges 严格像素网格绘制，零外部图片依赖。',
        code: `<PixelIcon name="island" size={32} />\n<PixelIcon name="coin" size={24} />\n<PixelIcon name="heart" size={24} />`,
        render: () => (
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 gap-2.5">
            {ALL_PIXEL_ICON_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(`<PixelIcon name="${name}" size={24} />`);
                  pixelNotify.info(`已复制 <PixelIcon name="${name}" />`);
                }}
                className="flex flex-col items-center gap-1.5 p-2.5 bg-[var(--px-surface-warm)] hover:bg-[#fff9db] border-2 border-[var(--px-border)] rounded-[4px] cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <PixelIcon name={name} size={26} />
                <span className="text-[11px] font-bold text-[var(--px-ink)]">{name}</span>
              </button>
            ))}
          </div>
        ),
      },
    ],
    api: [
      { prop: 'name', desc: '像素图标名称（共 28 种）', type: 'PixelIconName', defaultVal: "'leaf'" },
      { prop: 'size', desc: '渲染像素尺寸（推荐 16/24/32）', type: 'number', defaultVal: '18' },
      { prop: 'color', desc: '覆盖单色填充色（默认使用原画多色）', type: 'string', defaultVal: '-' },
    ],
  },
  {
    id: 'title',
    name: 'Title',
    cnName: '丝带标题',
    category: 'general',
    icon: 'flag',
    storyComponentId: 'title',
    desc: '燕尾折角像素丝带横幅标题，复刻海岛活动横幅的立体折影质感，支持 12 色主题。',
    miniPreview: () => (
      <div className="pointer-events-none scale-90 origin-left">
        <PixelTitle size="sm" color="yellow" icon="star">
          海岛标题
        </PixelTitle>
      </div>
    ),
    demos: [
      {
        title: '多彩燕尾丝带横幅与三档尺寸',
        desc: '适用于章节标题、活动 Banner 与游戏化分组抬头。',
        code: `<PixelTitle color="mint" size="lg" icon="island">像素海岛总览</PixelTitle>\n<PixelTitle color="pink" size="md" icon="heart">春季樱花限定</PixelTitle>\n<PixelTitle color="yellow" size="sm" icon="trophy">钓鱼大赛排行榜</PixelTitle>`,
        render: () => (
          <div className="flex flex-col items-start gap-3">
            <PixelTitle color="mint" size="lg" icon="island">
              像素海岛总览
            </PixelTitle>
            <div className="flex flex-wrap gap-3">
              <PixelTitle color="pink" size="md" icon="heart">
                春季樱花限定
              </PixelTitle>
              <PixelTitle color="yellow" size="sm" icon="trophy">
                钓鱼大赛排行榜
              </PixelTitle>
              <PixelTitle color="blue" size="sm" icon="sparkles">
                流星雨观测夜
              </PixelTitle>
            </div>
          </div>
        ),
      },
    ],
    api: [
      { prop: 'color', desc: '12 色海岛主题色', type: 'PixelColor', defaultVal: "'mint'" },
      { prop: 'size', desc: '横幅尺寸', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'" },
      { prop: 'icon', desc: '左侧像素图标', type: 'PixelIconName', defaultVal: '-' },
      { prop: 'subtitle', desc: '横幅下方辅助说明文本', type: 'string', defaultVal: '-' },
    ],
  },
  {
    id: 'divider',
    name: 'Divider',
    cnName: '分割线',
    category: 'general',
    icon: 'leaf',
    storyComponentId: 'background',
    desc: '5 种海岛装饰像素分割线（虚线、铃钱、树叶、爱心、星星），支持居中徽章文案。',
    miniPreview: () => (
      <div className="w-full px-2">
        <PixelDivider variant="stars" label="STAGE 1" className="!my-1" />
      </div>
    ),
    demos: [
      {
        title: '五种装饰性像素分割线',
        desc: '轻松切分长表单、任务日志与活动说明。',
        code: `<PixelDivider variant="leaves" label="自然生态区" />\n<PixelDivider variant="coins" label="狸克商店结算" />\n<PixelDivider variant="hearts" />\n<PixelDivider variant="dashed" />`,
        render: () => (
          <div className="flex flex-col gap-1">
            <PixelDivider variant="leaves" label="自然生态区" />
            <PixelDivider variant="coins" label="狸克商店结算" />
            <PixelDivider variant="hearts" />
            <PixelDivider variant="dashed" />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'variant', desc: '分割线装饰图案', type: "'dashed' | 'coins' | 'leaves' | 'hearts' | 'stars'", defaultVal: "'dashed'" },
      { prop: 'label', desc: '居中装饰文字', type: 'string', defaultVal: '-' },
    ],
  },

  /* ===================== DATA ENTRY ===================== */
  {
    id: 'input',
    name: 'Input',
    cnName: '输入框',
    category: 'entry',
    icon: 'mail',
    storyComponentId: 'input',
    desc: '内凹像素边框输入框，聚焦高亮使用暖阳黄 #FFCC00，支持清空按钮与校验状态。',
    miniPreview: () => (
      <div className="w-full pointer-events-none">
        <PixelInput size="sm" value="薄荷星露岛" readOnly />
      </div>
    ),
    demos: [
      {
        title: '前后缀图标、清空与校验状态',
        desc: '支持受控与非受控用法，内置 allowClear 快速清除按钮。',
        code: `<PixelInput prefix={<PixelIcon name="search" size={15} />} allowClear placeholder="搜索海岛居民..." />\n<PixelInput status="warning" defaultValue="岛屿名即将达到上限" />\n<PixelInput status="error" defaultValue="无效的登岛密码" />`,
        render: () => (
          <div className="grid sm:grid-cols-2 gap-3">
            <PixelInput
              prefix={<PixelIcon name="search" size={15} />}
              allowClear
              defaultValue="橘子酱"
              placeholder="搜索海岛居民..."
            />
            <PixelInput
              prefix={<PixelIcon name="coin" size={15} />}
              suffix="Bells"
              defaultValue="25000"
            />
            <PixelInput status="warning" defaultValue="岛屿名即将达到上限" />
            <PixelInput status="error" defaultValue="无效的登岛密码" />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'size', desc: '输入框尺寸', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'" },
      { prop: 'allowClear', desc: '显示像素清除按钮', type: 'boolean', defaultVal: 'false' },
      { prop: 'status', desc: '校验状态描边', type: "'default' | 'warning' | 'error'", defaultVal: "'default'" },
      { prop: 'prefix / suffix', desc: '前缀或后缀内容', type: 'ReactNode', defaultVal: '-' },
    ],
  },
  {
    id: 'select',
    name: 'Select',
    cnName: '下拉选择器',
    category: 'entry',
    icon: 'book',
    storyComponentId: 'select',
    desc: '带像素图标与实时搜索过滤的下拉选择器，支持一键清除与外部点击自动收起。',
    miniPreview: () => (
      <div className="w-full pointer-events-none">
        <PixelSelect
          size="sm"
          value="fish"
          options={[{ label: '黄金钓竿', value: 'fish', icon: 'fish' }]}
        />
      </div>
    ),
    demos: [
      {
        title: '带图标与关键字过滤的选择器',
        desc: '点击展开像素浮层菜单，输入关键字即可即时检索。',
        code: `<PixelSelect showSearch allowClear defaultValue="apple" options={options} />`,
        render: () => (
          <div className="max-w-xs">
            <PixelSelect
              showSearch
              allowClear
              defaultValue="apple"
              options={[
                { label: '红富士苹果 Apple', value: 'apple', icon: 'apple' },
                { label: '深海蓝鳍金枪鱼 Fish', value: 'fish', icon: 'fish' },
                { label: '神秘星空药水 Potion', value: 'potion', icon: 'potion' },
                { label: '黄金藏宝箱 Chest', value: 'chest', icon: 'chest' },
              ]}
            />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'options', desc: '下拉选项数组', type: 'PixelSelectOption[]', defaultVal: '[]' },
      { prop: 'showSearch', desc: '是否启用关键字过滤搜索框', type: 'boolean', defaultVal: 'false' },
      { prop: 'allowClear', desc: '是否允许清空当前选中项', type: 'boolean', defaultVal: 'false' },
    ],
  },
  {
    id: 'switch',
    name: 'Switch',
    cnName: '开关',
    category: 'entry',
    icon: 'sun',
    storyComponentId: 'switch',
    desc: '8-Bit 机械拨杆开关，开启态使用草地翠绿 + 3D 底影，支持自定义 ON/OFF 文字。',
    miniPreview: () => (
      <div className="pointer-events-none">
        <PixelSwitch defaultChecked checkedText="ON" uncheckedText="OFF" />
      </div>
    ),
    demos: [
      {
        title: '像素拨杆开关与文案定制',
        desc: '点击体验清脆的像素方块滑动动画。',
        code: `<PixelSwitch defaultChecked checkedText="ON" uncheckedText="OFF" />\n<PixelSwitch size="sm" defaultChecked />`,
        render: () => (
          <div className="flex flex-wrap items-center gap-6">
            <PixelSwitch defaultChecked checkedText="ON" uncheckedText="OFF" />
            <PixelSwitch defaultChecked checkedText="昼" uncheckedText="夜" />
            <PixelSwitch size="sm" defaultChecked />
            <PixelSwitch disabled defaultChecked />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'checked / defaultChecked', desc: '当前选中状态', type: 'boolean', defaultVal: 'false' },
      { prop: 'size', desc: '开关尺寸', type: "'sm' | 'md'", defaultVal: "'md'" },
      { prop: 'checkedText / uncheckedText', desc: '开关状态内嵌文本', type: 'string', defaultVal: '-' },
    ],
  },
  {
    id: 'checkbox',
    name: 'Checkbox & Radio',
    cnName: '多选与单选框',
    category: 'entry',
    icon: 'check',
    storyComponentId: 'checkbox',
    desc: '像素对勾多选框组与胶囊分段单选框组，支持水平/垂直排布与键盘可访问性。',
    miniPreview: () => (
      <div className="pointer-events-none flex items-center gap-3">
        <PixelCheckbox defaultChecked label="钓鱼" size="sm" />
        <PixelCheckbox label="露营" size="sm" />
      </div>
    ),
    demos: [
      {
        title: '多选框组与胶囊分段单选器',
        desc: '适用于表单筛选、季节切换与背包分类过滤。',
        code: `<PixelCheckboxGroup defaultValue={['fish', 'camp']} options={...} />\n<PixelRadioGroup optionType="button" defaultValue="summer" options={...} />`,
        render: () => (
          <div className="flex flex-col gap-4">
            <PixelCheckboxGroup
              defaultValue={['fish', 'camp']}
              options={[
                { label: '海钓大赛', value: 'fish' },
                { label: '森林露营', value: 'camp' },
                { label: '流星许愿', value: 'star' },
              ]}
            />
            <PixelRadioGroup
              optionType="button"
              defaultValue="summer"
              options={[
                { label: '🌸 春季', value: 'spring' },
                { label: '🌊 夏季', value: 'summer' },
                { label: '🍁 秋季', value: 'autumn' },
                { label: '❄️ 冬季', value: 'winter' },
              ]}
            />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'options', desc: '选项数组', type: '{ label: string; value: string; disabled?: boolean }[]', defaultVal: '[]' },
      { prop: 'optionType', desc: 'Radio 展示风格', type: "'default' | 'button'", defaultVal: "'default'" },
      { prop: 'direction', desc: 'CheckboxGroup 排列方向', type: "'horizontal' | 'vertical'", defaultVal: "'horizontal'" },
    ],
  },
  {
    id: 'rate',
    name: 'Rate',
    cnName: '星级评分',
    category: 'entry',
    icon: 'star',
    storyComponentId: 'rate',
    desc: '五星岛屿评定组件，支持星星、爱心、铃钱金币与红苹果 4 种像素图标与悬停预览。',
    miniPreview: () => (
      <div className="pointer-events-none">
        <PixelRate defaultValue={4} size="sm" />
      </div>
    ),
    demos: [
      {
        title: '多图腾评分交互（再次点击相同分值可清零）',
        desc: '实时悬停放大反馈，完美契合岛屿环境星级与岛民好感度系统。',
        code: `<PixelRate character="star" defaultValue={5} size="lg" />\n<PixelRate character="heart" defaultValue={4} />\n<PixelRate character="coin" defaultValue={3} />`,
        render: () => (
          <div className="flex flex-col gap-3">
            <PixelRate character="star" defaultValue={5} size="lg" />
            <PixelRate character="heart" defaultValue={4} />
            <PixelRate character="coin" defaultValue={3} />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'character', desc: '评分图标样式', type: "'star' | 'heart' | 'coin' | 'apple'", defaultVal: "'star'" },
      { prop: 'count', desc: '评分总数', type: 'number', defaultVal: '5' },
      { prop: 'readonly', desc: '只读展示模式', type: 'boolean', defaultVal: 'false' },
    ],
  },
  {
    id: 'slider',
    name: 'Slider',
    cnName: '步进滑块',
    category: 'entry',
    icon: 'music',
    storyComponentId: 'slider',
    desc: 'RPG 数值步进滑条，带像素方块手柄与实时 HUD 数值铭牌。',
    miniPreview: () => (
      <div className="w-full px-1 pointer-events-none">
        <PixelSlider defaultValue={75} showValue={false} />
      </div>
    ),
    demos: [
      {
        title: '海浪音效与角色配点滑块',
        desc: '支持任意 min / max / step 步进控制。',
        code: `<PixelSlider defaultValue={75} step={5} />`,
        render: () => (
          <div className="max-w-md flex flex-col gap-4">
            <PixelSlider defaultValue={80} step={5} />
            <PixelSlider defaultValue={45} step={5} />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'min / max / step', desc: '范围与步进值', type: 'number', defaultVal: '0 / 100 / 5' },
      { prop: 'showValue', desc: '右侧是否显示像素数值框', type: 'boolean', defaultVal: 'true' },
    ],
  },

  /* ===================== DATA DISPLAY ===================== */
  {
    id: 'card',
    name: 'Card',
    cnName: '海岛卡片',
    category: 'display',
    icon: 'home',
    storyComponentId: 'card',
    desc: '12 色海岛波点色卡与经典黑底白框 RPG 对话框容器，内置悬浮上浮与像素描边阴影。',
    miniPreview: () => (
      <PixelCard color="mint" pattern className="!p-2 text-xs font-extrabold">
        🏝️ 波点海岛色卡
      </PixelCard>
    ),
    demos: [
      {
        title: '12 色海岛波点色卡矩阵与 RPG 对话框',
        desc: '纯 CSS 径向渐变生成波点壁纸，零图片请求即可营造温暖海岛质感。',
        code: `<PixelCard color="mint" pattern hoverable title="薄荷海湾">...</PixelCard>\n<PixelCard variant="rpg" title="★ 博物馆馆长傅达">...</PixelCard>`,
        render: () => (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                ['mint', 'pink', 'yellow', 'blue', 'purple', 'orange', 'green', 'peach'] as PixelColor[]
              ).map((c) => (
                <PixelCard key={c} color={c} pattern hoverable>
                  <div className="font-extrabold text-xs uppercase">{c}</div>
                  <div className="text-[11px] opacity-85 mt-0.5">Island Tile</div>
                </PixelCard>
              ))}
            </div>
            <PixelCard variant="rpg" title="★ 守门人傅达">
              呼呼～欢迎光临像素海岛自然历史博物馆！今天想先参观化石展厅还是水族馆？
            </PixelCard>
          </div>
        ),
      },
    ],
    api: [
      { prop: 'color', desc: '12 种海岛色板枚举', type: 'PixelColor', defaultVal: "'default'" },
      { prop: 'variant', desc: '边框与主题形态', type: "'default' | 'dashed' | 'rpg'", defaultVal: "'default'" },
      { prop: 'pattern', desc: '开启波点壁纸底纹', type: 'boolean', defaultVal: 'false' },
      { prop: 'hoverable', desc: '鼠标悬浮上浮反馈', type: 'boolean', defaultVal: 'false' },
    ],
  },
  {
    id: 'tag',
    name: 'Tag & Badge',
    cnName: '标签与角标',
    category: 'display',
    icon: 'bell',
    storyComponentId: 'tag',
    desc: '多彩像素胶囊标签（Solid / Outlined / Dashed）与 99+ 封顶角标徽章。',
    miniPreview: () => (
      <div className="flex items-center gap-1.5">
        <PixelTag color="pink" size="sm" icon="heart">
          可爱
        </PixelTag>
        <PixelTag color="yellow" size="sm" icon="coin">
          SSR
        </PixelTag>
      </div>
    ),
    demos: [
      {
        title: '多彩可关闭标签与右上角计数角标',
        desc: '与 Card 共享完整 12 色海岛调色板。',
        code: `<PixelTag color="mint" icon="leaf" closable>海岛园艺</PixelTag>\n<PixelBadge count={128}><PixelAvatar villager="cat" /></PixelBadge>`,
        render: () => (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <PixelTag color="mint" icon="leaf" closable>
                海岛园艺
              </PixelTag>
              <PixelTag color="pink" icon="heart" closable>
                超人气岛民
              </PixelTag>
              <PixelTag color="blue" variant="outlined" icon="fish">
                深海鱼类
              </PixelTag>
              <PixelTag color="orange" variant="dashed" icon="chest">
                限时活动
              </PixelTag>
            </div>
            <div className="flex items-center gap-6 pt-1">
              <PixelBadge count={5} color="red">
                <PixelAvatar villager="cat" />
              </PixelBadge>
              <PixelBadge count={128} color="yellow">
                <PixelAvatar villager="shiba" />
              </PixelBadge>
              <PixelBadge dot color="green">
                <PixelAvatar villager="frog" />
              </PixelBadge>
            </div>
          </div>
        ),
      },
    ],
    api: [
      { prop: 'variant', desc: 'Tag 描边或填充样式', type: "'solid' | 'outlined' | 'dashed'", defaultVal: "'solid'" },
      { prop: 'closable', desc: '是否显示关闭按钮', type: 'boolean', defaultVal: 'false' },
      { prop: 'count / overflowCount', desc: 'Badge 数字与封顶阈值', type: 'number', defaultVal: '0 / 99' },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    cnName: '岛民头像',
    category: 'display',
    icon: 'heart',
    storyComponentId: 'avatar',
    desc: '内置橘猫、柴犬、青蛙、白兔、狸猫、猫头鹰 6 位原创像素动物岛民精灵，支持头像组折叠。',
    miniPreview: () => (
      <PixelAvatarGroup max={3} size="sm">
        <PixelAvatar villager="cat" size="sm" />
        <PixelAvatar villager="shiba" size="sm" />
        <PixelAvatar villager="frog" size="sm" />
        <PixelAvatar villager="bunny" size="sm" />
      </PixelAvatarGroup>
    ),
    demos: [
      {
        title: '六位内置像素岛民精灵与 AvatarGroup 折叠',
        desc: '支持图片自动回退、文字缩写以及超出 max 自动聚合为 +N。',
        code: `<PixelAvatar villager="cat" size="lg" />\n<PixelAvatarGroup max={4}>...</PixelAvatarGroup>`,
        render: () => (
          <div className="flex flex-wrap items-center gap-4">
            {(['cat', 'shiba', 'frog', 'bunny', 'tanuki', 'owl'] as const).map((v) => (
              <PixelTooltip key={v} content={`岛民预设：${v}`} variant="island">
                <div>
                  <PixelAvatar villager={v} size="lg" />
                </div>
              </PixelTooltip>
            ))}
            <div className="pl-3">
              <PixelAvatarGroup max={4}>
                <PixelAvatar villager="cat" />
                <PixelAvatar villager="shiba" />
                <PixelAvatar villager="frog" />
                <PixelAvatar villager="bunny" />
                <PixelAvatar villager="tanuki" />
                <PixelAvatar villager="owl" />
              </PixelAvatarGroup>
            </div>
          </div>
        ),
      },
    ],
    api: [
      { prop: 'villager', desc: '内置 16×16 动物村民精灵', type: "'cat' | 'shiba' | 'frog' | 'bunny' | 'tanuki' | 'owl'", defaultVal: '-' },
      { prop: 'shape', desc: '头像形状', type: "'square' | 'round'", defaultVal: "'square'" },
      { prop: 'max', desc: 'PixelAvatarGroup 最大展开数量', type: 'number', defaultVal: '4' },
    ],
  },
  {
    id: 'tabs',
    name: 'Tabs & Collapse',
    cnName: '标签页与折叠手账',
    category: 'display',
    icon: 'scroll',
    storyComponentId: 'tabs',
    desc: '档案夹折页标签（PixelTabs）与 CSS Grid 零脚本丝滑动画折叠面板（PixelCollapse）。',
    miniPreview: () => (
      <span className="px-2.5 py-1 text-xs font-extrabold bg-[var(--px-primary)] text-white border-2 border-[var(--px-border)] rounded-[3px]">
        📁 鱼类 / 昆虫 / 化石
      </span>
    ),
    demos: [
      {
        title: '档案折页切换与任务日志手风琴',
        desc: '结合图标清晰组织多维内容面板。',
        code: `<PixelTabs variant="folder" items={items} />\n<PixelCollapse defaultActiveKeys={['1']} items={quests} />`,
        render: () => (
          <div className="flex flex-col gap-4">
            <PixelTabs
              variant="folder"
              items={[
                { key: '1', label: '鱼类图鉴', icon: 'fish', children: '夏季稀有鱼种：翻车鱼、蓝旗鱼、皇带鱼。' },
                { key: '2', label: '果树种植', icon: 'apple', children: '本岛特产红苹果，移植椰子树需种在沙滩地块。' },
                { key: '3', label: '荣誉奖杯', icon: 'trophy', children: '已集齐快乐家协会金银铜三座像素奖杯！' },
              ]}
            />
            <PixelCollapse
              defaultActiveKeys={['1']}
              items={[
                { key: '1', label: '主线任务：建造露营地', badge: '进行中', children: '收集木材、硬木材与铁矿石各 15 份交给狸克。' },
                { key: '2', label: '支线任务：海滩漂流瓶', badge: '已完成', children: '在东侧海岸拾取了装有 DIY 配方的像素玻璃瓶！' },
              ]}
            />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'variant', desc: 'PixelTabs 视觉样式', type: "'folder' | 'pill'", defaultVal: "'folder'" },
      { prop: 'accordion', desc: 'PixelCollapse 手风琴互斥展开模式', type: 'boolean', defaultVal: 'false' },
    ],
  },
  {
    id: 'table',
    name: 'Table & Pagination',
    cnName: '表格与分页',
    category: 'display',
    icon: 'trophy',
    storyComponentId: 'table',
    desc: '支持点击列头排序、斑马纹、加载蒙层的像素账本表格与步进分页导航。',
    miniPreview: () => (
      <div className="text-[11px] font-bold px-2 py-1 bg-[#f6f0da] border-2 border-[var(--px-border)] rounded-[3px]">
        📊 排序账本 + 分页器
      </div>
    ),
    demos: [
      {
        title: '岛民存款排行榜（点击「存款铃钱」列头可升/降序排列）',
        desc: '内置自定义单元格渲染与响应式横向滚动保护。',
        code: `<PixelTable columns={columns} dataSource={data} striped />\n<PixelPagination total={42} pageSize={10} />`,
        render: () => (
          <div className="flex flex-col gap-3">
            <PixelTable
              striped
              dataSource={[
                { key: '1', avatar: 'cat', name: '橘子酱', role: '果园园长', bells: 29800 },
                { key: '2', avatar: 'owl', name: '傅达馆长', role: '博物馆长', bells: 45200 },
                { key: '3', avatar: 'shiba', name: '豆柴警官', role: '码头守卫', bells: 19400 },
              ]}
              columns={[
                {
                  key: 'name',
                  title: '岛民',
                  sortable: true,
                  render: (_v, r) => (
                    <div className="inline-flex items-center gap-2 font-bold">
                      <PixelAvatar villager={r.avatar as 'cat'} size="sm" />
                      <span>{String(r.name)}</span>
                    </div>
                  ),
                },
                { key: 'role', title: '岛内职责' },
                {
                  key: 'bells',
                  title: '存款铃钱',
                  sortable: true,
                  render: (v) => <span className="font-mono font-extrabold">{Number(v).toLocaleString()} B</span>,
                },
              ]}
            />
            <PixelPagination total={42} pageSize={10} />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'columns', desc: '列配置（支持 sortable 与自定义 render）', type: 'PixelTableColumn[]', defaultVal: '[]' },
      { prop: 'striped', desc: '是否启用暖色斑马纹行', type: 'boolean', defaultVal: 'true' },
      { prop: 'loading', desc: '表格读取遮罩状态', type: 'boolean', defaultVal: 'false' },
    ],
  },
  {
    id: 'clock',
    name: 'Time & CountUp',
    cnName: '时钟、倒计时与计分',
    category: 'display',
    icon: 'clock',
    storyComponentId: 'background',
    desc: 'HUD 实时像素电子钟、烟花大会倒计时牌与带庆祝贴纸的铃钱滚动计分器。',
    miniPreview: () => (
      <span className="px-2.5 py-1 bg-[#2a211b] text-[#ffe169] text-xs font-black px-font-display rounded-[3px]">
        12:30 · +99,850
      </span>
    ),
    demos: [
      {
        title: '实时 HUD 时钟、倒计时与铃钱计分动效',
        desc: '点击按钮可随时重播 requestAnimationFrame 数字滚动与 MAX! 庆祝贴纸。',
        code: `<PixelCountUp end={89800} suffix=" Bells" />\n<PixelClock />\n<PixelCountdown seconds={5390} />`,
        render: () => <InteractiveCountUpDemo />,
      },
    ],
    api: [
      { prop: 'end', desc: 'PixelCountUp 目标数值', type: 'number', defaultVal: '0' },
      { prop: 'celebrate', desc: '滚动结束弹出 MAX! 像素贴纸', type: 'boolean', defaultVal: 'true' },
      { prop: 'seconds', desc: 'PixelCountdown 剩余秒数', type: 'number', defaultVal: '5420' },
    ],
  },

  /* ===================== FEEDBACK & NAVIGATION ===================== */
  {
    id: 'progress',
    name: 'Progress',
    cnName: '像素进度条',
    category: 'feedback',
    icon: 'potion',
    storyComponentId: 'progress',
    desc: '支持海岛薄荷绿及 HP / MP / EXP 四套 RPG 属性配色，内置像素分格线与流动斜纹。',
    miniPreview: () => (
      <div className="w-full px-1">
        <PixelProgress percent={78} size="sm" showInfo={false} segmented />
      </div>
    ),
    demos: [
      {
        title: '海岛建设进度与 RPG 角色状态栏',
        desc: '可自由开关 segmented 分格刻度与 striped 动画条纹。',
        code: `<PixelProgress label="ISLAND" preset="island" percent={85} striped />\n<PixelProgress label="HP" preset="hp" percent={90} segmented />\n<PixelProgress label="MP" preset="mp" percent={65} segmented />`,
        render: () => (
          <div className="flex flex-col gap-3 max-w-lg">
            <PixelProgress label="ISLAND" preset="island" percent={85} striped />
            <PixelProgress label="HP" preset="hp" percent={90} segmented />
            <PixelProgress label="MP" preset="mp" percent={65} segmented />
            <PixelProgress label="EXP" preset="exp" percent={45} segmented />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'percent', desc: '百分比进度 (0 - 100)', type: 'number', defaultVal: '0' },
      { prop: 'preset', desc: '配色预设', type: "'island' | 'hp' | 'mp' | 'exp'", defaultVal: "'island'" },
      { prop: 'segmented / striped', desc: '分格刻度线 / 动态流动斜纹', type: 'boolean', defaultVal: 'true / false' },
    ],
  },
  {
    id: 'modal',
    name: 'Modal & Drawer',
    cnName: '模态框与背包抽屉',
    category: 'feedback',
    icon: 'chest',
    storyComponentId: 'modal',
    desc: '四角铆钉羊皮纸模态框（PixelModal）与多方向背包抽屉（PixelDrawer），支持 ESC 关闭。',
    miniPreview: () => (
      <span className="px-2.5 py-1 text-xs font-bold bg-[#fff5db] border-2 border-[var(--px-border)] rounded-[3px]">
        🪟 铆钉弹窗 & 抽屉
      </span>
    ),
    demos: [
      {
        title: '铆钉像素弹窗交互',
        desc: '点击按钮呼出模态框，确认后自动联动触发右上角海岛通知。',
        code: `<PixelModal open={open} title="海岛机场登机口" onClose={() => setOpen(false)}>...</PixelModal>`,
        render: () => <InteractiveModalDemo />,
      },
      {
        title: '多方向滑出背包抽屉',
        desc: '支持 right / left / bottom 三个方向弹出。',
        code: `<PixelDrawer open={open} placement="right" onClose={() => setOpen(false)}>...</PixelDrawer>`,
        render: () => <InteractiveDrawerDemo />,
      },
    ],
    api: [
      { prop: 'open', desc: '是否打开浮层', type: 'boolean', defaultVal: 'false' },
      { prop: 'placement', desc: 'PixelDrawer 弹出方向', type: "'right' | 'left' | 'bottom'", defaultVal: "'right'" },
      { prop: 'onClose', desc: '点击遮罩、关闭按钮或按 ESC 回调', type: '() => void', defaultVal: '-' },
    ],
  },
  {
    id: 'notification',
    name: 'Notification & Tooltip',
    cnName: '全局通知与气泡',
    category: 'feedback',
    icon: 'rocket',
    storyComponentId: 'modal',
    desc: '命令式成就解锁通知（pixelNotify）与 4 方向像素对话气泡提示（PixelTooltip）。',
    miniPreview: () => (
      <span className="px-2.5 py-1 text-xs font-bold bg-[#ecfdf3] border-2 border-[#276624] rounded-[3px]">
        🏆 成就解锁 Toast!
      </span>
    ),
    demos: [
      {
        title: '命令式全局成就通知与方向气泡',
        desc: '一行 JS 即可在任意组件内外弹出 success / info / warning / error 通知卡片。',
        code: `pixelNotify.success('捕获稀有皇带鱼！', '已自动收录进海岛海洋生物图鉴');`,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <PixelButton
              variant="success"
              icon="trophy"
              onClick={() => pixelNotify.success('捕获稀有皇带鱼！', '体长 580cm，已收录进海岛生物图鉴')}
            >
              成功通知
            </PixelButton>
            <PixelButton
              variant="primary"
              icon="bell"
              onClick={() => pixelNotify.info('流星雨预告', '今晚 20:00 后岛屿上空将出现密集流星群！')}
            >
              岛内广播
            </PixelButton>
            <PixelButton
              variant="danger"
              icon="sword"
              onClick={() => pixelNotify.error('蜂巢震落警告！', '快躲进附近的岛民房屋或拿出捕虫网！')}
            >
              紧急提醒
            </PixelButton>
            <PixelTooltip content="✨ 悬停气泡：内含神秘铃钱礼物！" variant="island">
              <PixelButton variant="dashed" icon="sparkles">
                悬停查看气泡
              </PixelButton>
            </PixelTooltip>
          </div>
        ),
      },
    ],
    api: [
      { prop: 'pixelNotify.success(title, desc)', desc: '弹出绿色成就通知', type: 'function', defaultVal: '-' },
      { prop: 'placement', desc: 'PixelTooltip 弹出方位', type: "'top' | 'bottom' | 'left' | 'right'", defaultVal: "'top'" },
    ],
  },
  {
    id: 'loading',
    name: 'Loading & Skeleton',
    cnName: '夜空落雪与骨架屏',
    category: 'feedback',
    icon: 'moon',
    storyComponentId: 'background',
    desc: '致敬 animal-island-ui 标志性的深藍夜空落雪加载器与暖白光泽扫掠骨架屏。',
    miniPreview: () => (
      <span className="px-2.5 py-1 text-xs font-bold bg-[#1c2541] text-[#e0fbfc] border border-[#5bc0be] rounded-[3px]">
        ❄️ 夜空像素飘雪
      </span>
    ),
    demos: [
      {
        title: '深蓝夜空落雪加载面板',
        desc: '像素方块雪花错落飘舞，搭配浮动橘猫向导提示。',
        code: `<PixelLoading tip="正在前往神秘流星岛" />`,
        render: () => <PixelLoading tip="正在前往神秘流星岛" />,
      },
      {
        title: '暖色光泽骨架屏与真实内容切换',
        desc: '点击按钮体验从占位骨架平滑过渡到真实卡片。',
        code: `<PixelSkeleton loading={loading} rows={3} avatar>...</PixelSkeleton>`,
        render: () => <InteractiveSkeletonDemo />,
      },
    ],
    api: [
      { prop: 'active', desc: 'PixelLoading 激活显示状态', type: 'boolean', defaultVal: 'true' },
      { prop: 'fullscreen', desc: '是否覆盖全屏视口', type: 'boolean', defaultVal: 'false' },
      { prop: 'loading', desc: 'PixelSkeleton 是否处于占位态', type: 'boolean', defaultVal: 'true' },
    ],
  },

  /* ===================== DECORATION ===================== */
  {
    id: 'background',
    name: 'Background & Cursor',
    cnName: '波点壁纸与游戏光标',
    category: 'decoration',
    icon: 'island',
    storyComponentId: 'background',
    desc: '6 款纯 CSS 海岛像素壁纸（波点、针糖、星空、沙滩抖动）与带点击星芒粒子的像素光标区。',
    miniPreview: () => (
      <PixelBackground pattern="sprinkles" className="!p-1.5 text-[11px] font-extrabold">
        ✨ Sprinkles + Cursor
      </PixelBackground>
    ),
    demos: [
      {
        title: '六款零图片 CSS 像素壁纸与可点击星芒光标区',
        desc: '在下方卡片内移动鼠标并点击，体验自定义 SVG 像素手套光标与星芒绽放效果！',
        code: `<PixelCursor cursorType="glove">\n  <PixelBackground pattern="sprinkles">点击体验星芒粒子！</PixelBackground>\n</PixelCursor>`,
        render: () => (
          <div className="grid sm:grid-cols-3 gap-3">
            {(
              [
                'cream-dots',
                'meadow-grid',
                'sprinkles',
                'starry-night',
                'sand-dither',
                'mint-polka',
              ] as const
            ).map((pat, idx) => (
              <PixelCursor
                key={pat}
                cursorType={idx % 3 === 0 ? 'glove' : idx % 3 === 1 ? 'wand' : 'sword'}
              >
                <PixelBackground pattern={pat} className="min-h-[96px] flex flex-col justify-between">
                  <span className="font-extrabold text-xs uppercase">{pat}</span>
                  <span className="text-[11px] opacity-80">移动并点击此处试试 ✦</span>
                </PixelBackground>
              </PixelCursor>
            ))}
          </div>
        ),
      },
    ],
    api: [
      { prop: 'pattern', desc: '壁纸纹样枚举', type: "'cream-dots' | 'meadow-grid' | 'sprinkles' | 'starry-night' | 'sand-dither' | 'mint-polka'", defaultVal: "'cream-dots'" },
      { prop: 'cursorType', desc: 'PixelCursor 像素指针类型', type: "'glove' | 'sword' | 'wand'", defaultVal: "'glove'" },
    ],
  },
  {
    id: 'codeblock',
    name: 'Typewriter & CodeBlock',
    cnName: '打字机与代码高亮',
    category: 'decoration',
    icon: 'sword',
    storyComponentId: 'button',
    desc: '逐字跳出的 RPG 对话打字机（PixelTypewriter）与浓缩咖啡暗色语法高亮代码块（PixelCodeBlock）。',
    miniPreview: () => (
      <span className="px-2 py-1 bg-[#261d15] text-[#a8d4a0] font-mono text-[11px] rounded-[3px]">
        {'<PixelIsland /> ▼'}
      </span>
    ),
    demos: [
      {
        title: 'RPG 逐字对话与暗色像素代码块',
        desc: '保留光标闪烁韵律，代码块支持 JSX/TS/CSS 自动着色与一键复制。',
        code: `<PixelTypewriter text="你好呀旅行者！欢迎来到 Pixel Island UI 的世界～" />\n<PixelCodeBlock language="tsx" code={snippet} />`,
        render: () => (
          <div className="flex flex-col gap-4">
            <PixelCard color="yellow" pattern>
              <div className="flex items-center gap-3">
                <PixelAvatar villager="tanuki" />
                <PixelTypewriter
                  text="狸克：欢迎登岛！所有组件都可以在 Storybook 工作台里实时调节参数哦～"
                  className="font-bold text-sm"
                />
              </div>
            </PixelCard>
            <PixelCodeBlock
              title="App.tsx"
              code={`import { PixelButton, PixelCard } from '@/pixel-ui';\n\nexport default function IslandWelcome() {\n  return (\n    <PixelCard color="mint" pattern>\n      <PixelButton variant="primary" icon="island">开始海岛冒险</PixelButton>\n    </PixelCard>\n  );\n}`}
            />
          </div>
        ),
      },
    ],
    api: [
      { prop: 'text / speed', desc: '打字机文本与单字毫秒间隔', type: 'string / number', defaultVal: '"" / 42' },
      { prop: 'code / title', desc: '代码块源码字符串与标题栏名称', type: 'string', defaultVal: '-' },
    ],
  },
];
