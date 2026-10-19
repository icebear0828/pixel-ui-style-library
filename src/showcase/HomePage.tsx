import React, { useMemo, useRef, useState } from 'react';
import {
  PixelAvatar,
  PixelButton,
  PixelCard,
  PixelCodeBlock,
  PixelIcon,
  PixelIconName,
  PixelInput,
  PixelIslandHeroArt,
  pixelNotify,
  PixelProgress,
  PixelRate,
  PixelSwitch,
  PixelTag,
  PixelTitle,
} from '../pixel-ui';
import {
  CATEGORY_LABELS,
  COMPONENT_CATALOG,
  ComponentCategoryKey,
} from './catalog';

export type ThemeKey = 'mint' | 'coral' | 'starry' | 'gameboy';

export const THEME_PRESETS: Array<{
  key: ThemeKey;
  name: string;
  swatch: string;
  desc: string;
  cssSnippet: string;
}> = [
  {
    key: 'mint',
    name: '🌿 海岛薄荷 Mint Island',
    swatch: '#19c8b9',
    desc: '经典治愈海岛主色，清透薄荷青搭配暖奶油羊皮纸',
    cssSnippet: `:root {\n  --px-primary: #19c8b9;\n  --px-primary-shadow: #0d7e74;\n  --px-meadow-top: #6bc489;\n  --px-bg: #f8f6eb;\n}`,
  },
  {
    key: 'coral',
    name: '🌅 落日珊瑚 Sunset Coral',
    swatch: '#ff7a59',
    desc: '黄昏海滩暖橘珊瑚色调，充满夏夜烟花祭活力',
    cssSnippet: `[data-px-theme="coral"] {\n  --px-primary: #ff7a59;\n  --px-primary-shadow: #b54225;\n  --px-meadow-top: #f29f67;\n  --px-bg: #f8f6eb;\n}`,
  },
  {
    key: 'starry',
    name: '🔮 星夜露谷 Starry Valley',
    swatch: '#9368e9',
    desc: '流星雨观测夜薰衣草紫，适合奇幻 RPG 与魔法工坊',
    cssSnippet: `[data-px-theme="starry"] {\n  --px-primary: #9368e9;\n  --px-primary-shadow: #5731a6;\n  --px-meadow-top: #6f74c9;\n  --px-bg: #f8f6eb;\n}`,
  },
  {
    key: 'gameboy',
    name: '🎮 复古掌机 GameBoy Olive',
    swatch: '#6ea820',
    desc: '致敬 1989 经典掌机四阶橄榄绿液晶屏复古质感',
    cssSnippet: `[data-px-theme="gameboy"] {\n  --px-primary: #6ea820;\n  --px-primary-shadow: #3d630c;\n  --px-meadow-top: #7ea346;\n  --px-bg: #eef2dc;\n}`,
  },
];

const HERO_GIANT_ICONS: Array<{
  icon: PixelIconName;
  left: string;
  top: string;
  size: number;
  rotate: number;
}> = [
  { icon: 'leaf', left: '4%', top: '8%', size: 150, rotate: -14 },
  { icon: 'star', left: '78%', top: '6%', size: 130, rotate: 12 },
  { icon: 'coin', left: '62%', top: '62%', size: 145, rotate: -8 },
  { icon: 'fish', left: '12%', top: '66%', size: 135, rotate: 10 },
  { icon: 'apple', left: '44%', top: '12%', size: 115, rotate: -10 },
  { icon: 'sparkles', left: '86%', top: '58%', size: 125, rotate: 8 },
];

const FEATURES: Array<{
  icon: PixelIconName;
  title: string;
  desc: string;
  color: 'mint' | 'yellow' | 'pink' | 'blue' | 'purple' | 'orange';
}> = [
  {
    icon: 'island',
    title: '像素海岛设计语言',
    desc: '治愈暖棕羊皮纸色板、8-Bit 阶梯硬阴影、燕尾丝带横幅与铆钉边框，构成完整的海岛视觉语言。',
    color: 'mint',
  },
  {
    icon: 'book',
    title: 'Storybook 10 交互管理',
    desc: '内置完整 CSF 3.0 (.stories.tsx) 文档体系，支持实时 Controls 参数面板、Autodocs、Actions 日志与网格检视。',
    color: 'pink',
  },
  {
    icon: 'sparkles',
    title: '零外部图片 SVG 精灵',
    desc: '28 枚 16×16 像素图标、6 位动物村民与 6 款波点壁纸全由矢量网格与 CSS 实时合成，体积轻盈零闪烁。',
    color: 'yellow',
  },
  {
    icon: 'gamepad',
    title: '掌机级按压微交互',
    desc: '3px 物理下压回弹、暖阳黄聚焦高光、RPG 逐字打字机与铃钱滚动庆祝贴纸，处处充满游戏温度。',
    color: 'blue',
  },
  {
    icon: 'potion',
    title: '运行时 CSS 变量换肤',
    desc: '所有色彩、圆角、阴影均收敛至 :root CSS Tokens，无需重新构建即可一键切换海岛、珊瑚、星夜、掌机皮肤。',
    color: 'purple',
  },
  {
    icon: 'trophy',
    title: 'TypeScript 严格类型',
    desc: '全部组件与 Props 提供完整 TS 类型导出，兼顾 React 19 现代工程与无障碍键盘交互。',
    color: 'orange',
  },
];

interface HomePageProps {
  theme: ThemeKey;
  onChangeTheme: (next: ThemeKey) => void;
  onSelectComponent: (componentId: string) => void;
  onOpenStorybook: (storyComponentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  theme,
  onChangeTheme,
  onSelectComponent,
  onOpenStorybook,
}) => {
  const [catFilter, setCatFilter] = useState<'all' | ComponentCategoryKey>('all');
  const [search, setSearch] = useState('');
  const [islandEnergy, setIslandEnergy] = useState(76);
  const [quickMusic, setQuickMusic] = useState(true);
  const overviewRef = useRef<HTMLDivElement>(null);

  const filteredComponents = useMemo(() => {
    return COMPONENT_CATALOG.filter((item) => {
      const matchCat = catFilter === 'all' || item.category === catFilter;
      const q = search.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.cnName.includes(q) ||
        item.desc.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [catFilter, search]);

  const activeThemeMeta = THEME_PRESETS.find((t) => t.key === theme) ?? THEME_PRESETS[0];

  const cycleTheme = () => {
    const idx = THEME_PRESETS.findIndex((t) => t.key === theme);
    const next = THEME_PRESETS[(idx + 1) % THEME_PRESETS.length];
    onChangeTheme(next.key);
    pixelNotify.info(`已切换主题：${next.name}`, next.desc);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* =====================================================================
          HERO BANNER — Meadow floating-icon hero
          ===================================================================== */}
      <section
        style={{
          background: `linear-gradient(180deg, var(--px-meadow-top) 0%, var(--px-meadow-bottom) 100%)`,
        }}
        className="relative min-h-[78vh] flex flex-col justify-between px-6 sm:px-12 pt-12 pb-8 overflow-hidden border-b-4 border-[var(--px-border)]"
      >
        {/* Pixel Grid Overlay + Floating Giant Translucent Icons */}
        <div
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          className="pointer-events-none absolute inset-0"
        />
        {HERO_GIANT_ICONS.map((g, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              left: g.left,
              top: g.top,
              transform: `rotate(${g.rotate}deg)`,
            }}
            className="pointer-events-none absolute opacity-15 animate-px-float-slow"
          >
            <PixelIcon name={g.icon} size={g.size} color="#ffffff" />
          </div>
        ))}

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-5xl w-full mx-auto my-auto grid lg:grid-cols-[1.25fr_0.75fr] items-center gap-10 py-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-[#fff9e6]/95 border-2 border-[var(--px-border)] rounded-[4px] shadow-[0_3px_0_0_rgba(58,38,20,0.2)]">
              <PixelIcon name="sparkles" size={15} />
              <span className="text-xs font-extrabold text-[var(--px-ink)]">
                COZY PIXEL ART UI · REACT 19 + STORYBOOK 10
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3 mb-4">
              <h1
                style={{
                  color: '#fff9e6',
                  textShadow: '0 5px 0 rgba(58, 38, 20, 0.42)',
                }}
                className="m-0 text-4xl sm:text-5xl font-black px-font-display tracking-tight leading-tight"
              >
                Pixel Island UI
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-black px-font-display bg-[#e6f9f6] text-[#0f766e] border-2 border-[#134e4a] rounded-[4px] shadow-[0_2px_0_0_rgba(0,0,0,0.2)]">
                v1.0.0
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold text-[#2f2113] bg-[#fffdf2]/80 backdrop-blur-[2px] border-2 border-[var(--px-border)]/30 rounded-[5px] px-4 py-3 max-w-xl leading-relaxed mb-7">
              海岛治愈系像素风格 React 组件库。内置 28+ 原创像素组件、12 色波点海岛色卡，并集成{' '}
              <strong>Storybook 10 (CSF 3.0)</strong> 进行交互式文档管理与实时参数预览。
            </p>

            {/* Primary CTA Row */}
            <div className="flex flex-wrap items-center gap-3.5">
              <PixelButton
                size="lg"
                variant="primary"
                icon="island"
                onClick={() => onSelectComponent('button')}
              >
                组件文档
              </PixelButton>
              <PixelButton
                size="lg"
                variant="default"
                icon="book"
                onClick={() => onOpenStorybook('button')}
              >
                打开 Storybook 预览
              </PixelButton>
              <PixelButton size="md" variant="dashed" icon="sparkles" onClick={cycleTheme}>
                换肤：{activeThemeMeta.name.split(' ')[1]}
              </PixelButton>
            </div>

            {/* Key Metrics Strip */}
            <div className="mt-7 grid grid-cols-3 max-w-md gap-2.5">
              {[
                { num: '28+', label: '原创像素组件' },
                { num: '17 份', label: 'CSF 3.0 Stories' },
                { num: '0 张', label: '外部位图依赖' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-3 py-2 bg-[#fffdf2]/90 border-2 border-[var(--px-border)] rounded-[4px] shadow-[0_3px_0_0_rgba(58,38,20,0.18)]"
                >
                  <div className="text-base font-black px-font-display text-[var(--px-ink)]">
                    {stat.num}
                  </div>
                  <div className="text-[11px] font-bold text-[var(--px-ink-body)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Floating Pixel Island Emblem + NPC Speech Card */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-5 bg-[#fffdf4]/35 backdrop-blur-[2px] border-2 border-white/60 rounded-[8px] animate-px-float">
              <PixelIslandHeroArt size={216} />
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-[#fffdf2] border-2 border-[var(--px-border)] rounded-[5px] shadow-[0_4px_0_0_rgba(58,38,20,0.22)] max-w-xs">
              <PixelAvatar villager="cat" size="sm" />
              <div className="text-xs font-bold text-[var(--px-ink)] leading-snug">
                向导橘子酱：点击下方任意组件卡片，即可一键直达演示文档或 Storybook 调试台喵！
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="relative z-10 flex justify-center pt-2">
          <button
            type="button"
            onClick={() => overviewRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fffdf2]/90 hover:bg-[#fffdf2] border-2 border-[var(--px-border)] rounded-full text-xs font-extrabold text-[var(--px-ink)] cursor-pointer shadow-[0_3px_0_0_rgba(58,38,20,0.18)]"
          >
            <span>向下滑动查看全部组件总览</span>
            <span className="animate-px-bounce-arrow">▼</span>
          </button>
        </div>
      </section>

      {/* =====================================================================
          MAIN SHOWCASE CONTENT CONTAINER
          ===================================================================== */}
      <div className="max-w-5xl mx-auto px-5 sm:px-10 py-14 flex flex-col gap-16">
        {/* 1. FEATURES SECTION */}
        <section>
          <PixelTitle color="mint" size="md" icon="sparkles">
            特性 Features
          </PixelTitle>
          <p className="text-sm font-semibold text-[var(--px-ink-body)] mb-6">
            为什么选择 Pixel Island UI 构建充满游戏温度与辨识度的现代 Web 应用
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <PixelCard key={f.title} hoverable pattern className="flex flex-col gap-2.5 bg-[var(--px-surface)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 flex items-center justify-center bg-[var(--px-surface-warm)] border-2 border-[var(--px-border)] rounded-[4px]">
                    <PixelIcon name={f.icon} size={22} />
                  </div>
                  <h3 className="m-0 text-base font-extrabold text-[var(--px-ink)]">{f.title}</h3>
                </div>
                <p className="m-0 text-xs font-medium text-[var(--px-ink-body)] leading-relaxed">
                  {f.desc}
                </p>
              </PixelCard>
            ))}
          </div>
        </section>

        {/* 2. COMPONENTS OVERVIEW GALLERY */}
        <section ref={overviewRef}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <PixelTitle color="yellow" size="md" icon="island">
                组件一览 Components
              </PixelTitle>
              <p className="m-0 text-sm font-semibold text-[var(--px-ink-body)]">
                点击卡片进入组件交互示例页，或点击右上角「Storybook」直接在 Controls 画布中调试参数
              </p>
            </div>
            <div className="w-full sm:w-64">
              <PixelInput
                size="sm"
                allowClear
                value={search}
                onValueChange={setSearch}
                prefix={<PixelIcon name="search" size={14} />}
                placeholder="筛选组件名称 / 关键字..."
              />
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={() => setCatFilter('all')}
              className={`px-3 py-1.5 text-xs font-extrabold border-2 border-[var(--px-border)] rounded-[4px] cursor-pointer transition-all ${
                catFilter === 'all'
                  ? 'bg-[var(--px-primary)] text-white shadow-[0_2px_0_0_var(--px-primary-shadow)]'
                  : 'bg-[var(--px-surface)] text-[var(--px-ink)] hover:bg-[var(--px-surface-warm)]'
              }`}
            >
              全部 ({COMPONENT_CATALOG.length})
            </button>
            {(Object.keys(CATEGORY_LABELS) as ComponentCategoryKey[]).map((key) => {
              const count = COMPONENT_CATALOG.filter((c) => c.category === key).length;
              const active = catFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCatFilter(key)}
                  className={`px-3 py-1.5 text-xs font-extrabold border-2 border-[var(--px-border)] rounded-[4px] cursor-pointer transition-all ${
                    active
                      ? 'bg-[var(--px-primary)] text-white shadow-[0_2px_0_0_var(--px-primary-shadow)]'
                      : 'bg-[var(--px-surface)] text-[var(--px-ink)] hover:bg-[var(--px-surface-warm)]'
                  }`}
                >
                  {CATEGORY_LABELS[key].label} ({count})
                </button>
              );
            })}
          </div>

          {/* Interactive Component Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onSelectComponent(comp.id)}
                className="group flex flex-col justify-between p-4 bg-[var(--px-surface)] border-2 border-[var(--px-border)] rounded-[5px] shadow-[0_4px_0_0_var(--px-shadow-card)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-7 h-7 inline-flex items-center justify-center bg-[var(--px-surface-warm)] border-2 border-[var(--px-border)] rounded-[4px] group-hover:scale-110 transition-transform">
                        <PixelIcon name={comp.icon} size={16} />
                      </span>
                      <div>
                        <span className="font-extrabold text-sm text-[var(--px-ink)]">
                          {comp.name}
                        </span>
                        <span className="ml-1.5 text-xs font-bold text-[var(--px-ink-muted)]">
                          {comp.cnName}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      title="在 Storybook Controls 中打开"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStorybook(comp.storyComponentId);
                      }}
                      className="px-2 py-0.5 text-[10px] font-black px-font-display bg-[#ff4785] text-white border border-[#591029] rounded-[3px] hover:brightness-110 cursor-pointer shrink-0"
                    >
                      SB ↗
                    </button>
                  </div>

                  {/* Live Miniature Preview Stage */}
                  <div className="h-16 mb-3 px-3 flex items-center justify-center bg-[var(--px-surface-warm)]/65 border-2 border-dashed border-[#d9ceb6] rounded-[4px] overflow-hidden">
                    {comp.miniPreview()}
                  </div>

                  <p className="m-0 text-xs font-medium text-[var(--px-ink-body)] leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#e5dcc8] flex items-center justify-between text-[11px] font-extrabold text-[var(--px-primary-active)]">
                  <span>{CATEGORY_LABELS[comp.category].label}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    查看交互示例 →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. INSTALLATION & STORYBOOK COMMANDS */}
        <section>
          <PixelTitle color="blue" size="md" icon="rocket">
            安装与 Storybook 命令
          </PixelTitle>
          <p className="text-sm font-semibold text-[var(--px-ink-body)] mb-5">
            一行命令安装组件库，或启动本地 Storybook 6006 端口独立文档服务器
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <PixelCodeBlock
              title="1. 安装组件库"
              language="bash"
              code={`# 使用 npm 或 pnpm 安装\nnpm install pixel-island-ui\n\n# 引入像素海岛主题样式令牌\nimport '@/pixel-ui';`}
            />
            <PixelCodeBlock
              title="2. 启动原生 Storybook 10"
              language="bash"
              code={`# 启动本地交互式 Storybook 开发环境\nnpx storybook dev -p 6006\n\n# 构建静态 Storybook 组件文档站点\nnpx storybook build -o dist-storybook`}
            />
          </div>
        </section>

        {/* 4. QUICK START + LIVE MINI ISLAND PLAYGROUND */}
        <section>
          <PixelTitle color="pink" size="md" icon="heart">
            快速上手 Quick Start
          </PixelTitle>
          <p className="text-sm font-semibold text-[var(--px-ink-body)] mb-5">
            开箱即用的声明式组件组合，右侧卡片即为下方 JSX 代码的真实交互渲染结果
          </p>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
            <PixelCodeBlock
              title="IslandDashboard.tsx"
              code={`import { PixelCard, PixelButton, PixelProgress, PixelRate, PixelSwitch } from '@/pixel-ui';\n\nexport function IslandStatusCard() {\n  return (\n    <PixelCard title="🏝️ 今日海岛活力看板" color="default" pattern>\n      <PixelRate character="star" defaultValue={5} />\n      <PixelProgress label="VIBE" percent={${islandEnergy}} striped />\n      <PixelSwitch defaultChecked checkedText="ON" uncheckedText="OFF" />\n      <PixelButton variant="primary" icon="coin">\n        注入海岛活力 +10%\n      </PixelButton>\n    </PixelCard>\n  );\n}`}
            />

            <PixelCard
              title="🏝️ 今日海岛活力看板（实时可交互）"
              extra={<PixelTag color="mint" size="sm">LIVE</PixelTag>}
              pattern
              className="flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">岛屿星级评定：</span>
                  <PixelRate character="star" defaultValue={5} size="sm" />
                </div>

                <div>
                  <div className="text-xs font-extrabold mb-1.5">海岛繁荣度指数：</div>
                  <PixelProgress label="VIBE" percent={islandEnergy} striped />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">海浪白噪音背景乐：</span>
                  <PixelSwitch
                    checked={quickMusic}
                    onChange={setQuickMusic}
                    checkedText="ON"
                    uncheckedText="OFF"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                <PixelButton
                  variant="primary"
                  size="sm"
                  icon="coin"
                  onClick={() => {
                    const next = islandEnergy >= 100 ? 40 : Math.min(100, islandEnergy + 12);
                    setIslandEnergy(next);
                    if (next === 100) {
                      pixelNotify.success('海岛繁荣度 100% 达成！', 'S.S. 像素游轮已停靠南侧码头！');
                    }
                  }}
                >
                  注入活力 +12%
                </PixelButton>
                <PixelButton
                  size="sm"
                  icon="book"
                  onClick={() => onOpenStorybook('progress')}
                >
                  去 Storybook 调参
                </PixelButton>
              </div>
            </PixelCard>
          </div>
        </section>

        {/* 5. RUNTIME THEME CUSTOMIZER */}
        <section>
          <PixelTitle color="purple" size="md" icon="potion">
            主题定制 Theme Tokens
          </PixelTitle>
          <p className="text-sm font-semibold text-[var(--px-ink-body)] mb-5">
            点击下方任意色卡即可实时切换整站 CSS 自定义属性（无需重新构建）
          </p>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-5 items-start">
            <div className="grid sm:grid-cols-2 gap-3">
              {THEME_PRESETS.map((preset) => {
                const selected = preset.key === theme;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => onChangeTheme(preset.key)}
                    className={`p-3.5 text-left border-2 rounded-[5px] transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#fffdf4] border-[var(--px-ink-strong)] -translate-y-0.5 shadow-[0_4px_0_0_var(--px-primary)]'
                        : 'bg-[var(--px-surface)] border-[var(--px-border)] shadow-[0_3px_0_0_var(--px-shadow-card)] hover:bg-[var(--px-surface-warm)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-extrabold text-xs text-[var(--px-ink)]">
                        {preset.name}
                      </span>
                      <span
                        style={{ background: preset.swatch }}
                        className="w-4 h-4 border-2 border-[var(--px-border)] rounded-[2px] shrink-0"
                      />
                    </div>
                    <p className="m-0 text-[11px] font-medium text-[var(--px-ink-body)] leading-snug">
                      {preset.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <PixelCodeBlock title="theme-tokens.css" language="css" code={activeThemeMeta.cssSnippet} />
          </div>
        </section>
      </div>

      {/* =====================================================================
          PIXEL COASTLINE & TREES FOOTER
          ===================================================================== */}
      <footer className="mt-10 pt-10 pb-12 px-6 bg-[var(--px-surface-warm)] border-t-4 border-[var(--px-border)] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <PixelIcon name="leaf" size={22} />
            <PixelIcon name="island" size={26} />
            <PixelIcon name="star" size={22} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <PixelButton size="sm" variant="primary" icon="gamepad" onClick={() => onSelectComponent('button')}>
              浏览组件文档
            </PixelButton>
            <PixelButton size="sm" variant="default" icon="book" onClick={() => onOpenStorybook('button')}>
              Storybook 交互工作台
            </PixelButton>
          </div>
          <p className="m-0 text-xs font-bold text-[var(--px-ink-muted)]">
            © 2026 Pixel Island UI · Generated with gemini-4-argon · Managed with Storybook 10 · MIT License
          </p>
        </div>
      </footer>
    </div>
  );
};
