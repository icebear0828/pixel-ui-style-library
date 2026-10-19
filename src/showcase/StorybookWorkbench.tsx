import React, { useEffect, useMemo, useState } from 'react';
import {
  PixelButton,
  PixelCodeBlock,
  PixelIcon,
  PixelSwitch,
  PixelTag,
} from '../pixel-ui';
import {
  ParsedArgType,
  ParsedStoryGroup,
  STORYBOOK_GROUPS,
} from '../stories/storyRegistry';

interface ActionLogEntry {
  id: number;
  time: string;
  name: string;
  payload: string;
}

interface StorybookWorkbenchProps {
  initialComponentId?: string;
  onBackToSite: () => void;
  onJumpComponentDoc: (componentId: string) => void;
}

const CANVAS_BACKGROUNDS = [
  { id: 'parchment', label: '羊皮纸', value: '#f8f6eb', dark: false },
  { id: 'meadow', label: '海岛草地', value: '#7dc395', dark: false },
  { id: 'night', label: '星空暗色', value: '#1a1b2e', dark: true },
  { id: 'white', label: '纯白画布', value: '#ffffff', dark: false },
];

export const StorybookWorkbench: React.FC<StorybookWorkbenchProps> = ({
  initialComponentId = 'button',
  onBackToSite,
  onJumpComponentDoc,
}) => {
  const defaultGroup =
    STORYBOOK_GROUPS.find((g) => g.componentId === initialComponentId) ?? STORYBOOK_GROUPS[0];

  const [selectedGroupId, setSelectedGroupId] = useState<string>(defaultGroup.groupId);
  const [selectedStoryId, setSelectedStoryId] = useState<string>(
    defaultGroup.stories[0]?.id ?? ''
  );
  const [viewTab, setViewTab] = useState<'canvas' | 'docs'>('canvas');
  const [addonTab, setAddonTab] = useState<'controls' | 'actions' | 'jsx' | 'csf'>('controls');
  const [addonOpen, setAddonOpen] = useState(true);
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [bgId, setBgId] = useState('parchment');
  const [showGrid, setShowGrid] = useState(true);
  const [viewport, setViewport] = useState<'full' | 'tablet' | 'mobile'>('full');
  const [zoom, setZoom] = useState<number>(1);
  const [remountSeed, setRemountSeed] = useState(0);

  const [liveArgs, setLiveArgs] = useState<Record<string, unknown>>({
    ...(defaultGroup.stories[0]?.args ?? defaultGroup.defaultArgs),
  });
  const [actions, setActions] = useState<ActionLogEntry[]>([
    {
      id: 1,
      time: new Date().toTimeString().slice(0, 8),
      name: 'storybook/ready',
      payload: `Loaded ${STORYBOOK_GROUPS.length} CSF 3.0 modules`,
    },
  ]);

  useEffect(() => {
    const matched = STORYBOOK_GROUPS.find((g) => g.componentId === initialComponentId);
    if (matched) {
      setSelectedGroupId(matched.groupId);
      const firstStory = matched.stories[0];
      if (firstStory) {
        setSelectedStoryId(firstStory.id);
        setLiveArgs({ ...firstStory.args });
      }
    }
  }, [initialComponentId]);

  const activeGroup: ParsedStoryGroup =
    STORYBOOK_GROUPS.find((g) => g.groupId === selectedGroupId) ?? STORYBOOK_GROUPS[0];
  const activeStory =
    activeGroup.stories.find((s) => s.id === selectedStoryId) ?? activeGroup.stories[0];

  const pushAction = (name: string, detail: unknown) => {
    const formatted =
      typeof detail === 'string'
        ? detail
        : (() => {
            try {
              return JSON.stringify(detail);
            } catch {
              return String(detail);
            }
          })();

    setActions((prev) => [
      {
        id: Date.now() + Math.random(),
        time: new Date().toTimeString().slice(0, 8),
        name,
        payload: formatted,
      },
      ...prev.slice(0, 29),
    ]);
  };

  const selectStory = (group: ParsedStoryGroup, storyId: string, mode: 'canvas' | 'docs') => {
    setSelectedGroupId(group.groupId);
    setSelectedStoryId(storyId);
    setViewTab(mode);
    const st = group.stories.find((s) => s.id === storyId) ?? group.stories[0];
    if (st) setLiveArgs({ ...st.args });
    setMobileExplorerOpen(false);
    pushAction('story/selected', `${group.category}/${group.componentName} -> ${st?.name ?? 'Docs'}`);
  };

  const updateArg = (propName: string, val: unknown) => {
    setLiveArgs((prev) => ({ ...prev, [propName]: val }));
    pushAction(`args/${propName}`, val);
  };

  const resetArgs = () => {
    const base = activeStory ? { ...activeStory.args } : { ...activeGroup.defaultArgs };
    setLiveArgs(base);
    setRemountSeed((s) => s + 1);
    pushAction('controls/reset', 'Restored default CSF story args');
  };

  /* Instrument callbacks so clicks/changes inside Canvas log to Actions panel */
  const instrumentedArgs = useMemo(() => {
    return {
      ...liveArgs,
      onClick: () => pushAction('onClick', { component: activeGroup.componentName }),
      onChange: (val: unknown) => {
        if (val && typeof val === 'object' && 'target' in val) {
          pushAction('onChange', (val as { target: { value?: unknown } }).target.value);
        } else {
          pushAction('onChange', val);
        }
      },
      onValueChange: (val: string) => pushAction('onValueChange', val),
      onClose: () => pushAction('onClose', { closed: true }),
    };
  }, [liveArgs, activeGroup.componentName]);

  /* Grouped Explorer Sidebar Tree */
  const groupedTree = useMemo(() => {
    const q = search.trim().toLowerCase();
    const map = new Map<string, ParsedStoryGroup[]>();
    STORYBOOK_GROUPS.forEach((g) => {
      const hitGroup =
        !q ||
        g.componentName.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.stories.some((s) => s.name.toLowerCase().includes(q));
      if (!hitGroup) return;
      const list = map.get(g.category) ?? [];
      list.push(g);
      map.set(g.category, list);
    });
    return Array.from(map.entries());
  }, [search]);

  /* Dynamic JSX serializer for current Controls args */
  const liveJsxCode = useMemo(() => {
    const tag = activeGroup.componentName.replace(/[^A-Za-z0-9]/g, '') || 'PixelComponent';
    const propLines: string[] = [];
    let childrenText: string | null = null;

    Object.entries(liveArgs).forEach(([k, v]) => {
      if (v === undefined || typeof v === 'function') return;
      if (k === 'children' && typeof v === 'string') {
        childrenText = v;
        return;
      }
      if (typeof v === 'string') propLines.push(`  ${k}="${v}"`);
      else if (typeof v === 'boolean') {
        if (v) propLines.push(`  ${k}`);
        else propLines.push(`  ${k}={false}`);
      } else if (typeof v === 'number') {
        propLines.push(`  ${k}={${v}}`);
      }
    });

    const propsBlock = propLines.length ? `\n${propLines.join('\n')}\n` : '';
    return childrenText !== null
      ? `<${tag}${propsBlock}>\n  ${childrenText}\n</${tag}>`
      : `<${tag}${propsBlock} />`;
  }, [activeGroup.componentName, liveArgs]);

  const activeBg = CANVAS_BACKGROUNDS.find((b) => b.id === bgId) ?? CANVAS_BACKGROUNDS[0];

  const renderControlInput = (argDef: ParsedArgType) => {
    const val = liveArgs[argDef.name];

    switch (argDef.controlType) {
      case 'boolean':
        return (
          <PixelSwitch
            size="sm"
            checked={Boolean(val)}
            onChange={(next) => updateArg(argDef.name, next)}
          />
        );
      case 'inline-radio':
        return (
          <div className="flex flex-wrap gap-1">
            {(argDef.options ?? []).map((opt) => {
              const active = String(val) === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateArg(argDef.name, opt)}
                  className={`px-2 py-0.5 text-xs font-bold border rounded-[3px] cursor-pointer ${
                    active
                      ? 'bg-[#ff4785] text-white border-[#a61b4d]'
                      : 'bg-white text-[#334155] border-[#cbd5e1] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        );
      case 'select':
        return (
          <select
            value={String(val ?? '')}
            onChange={(e) => updateArg(argDef.name, e.target.value)}
            className="px-2.5 py-1 text-xs font-bold bg-white border-2 border-[#cbd5e1] rounded-[4px] outline-none focus:border-[#ff4785]"
          >
            {(argDef.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case 'range':
        return (
          <div className="flex items-center gap-2.5 max-w-xs">
            <input
              type="range"
              min={argDef.min ?? 0}
              max={argDef.max ?? 100}
              step={argDef.step ?? 1}
              value={Number(val ?? argDef.min ?? 0)}
              onChange={(e) => updateArg(argDef.name, Number(e.target.value))}
              className="flex-1 accent-[#ff4785] cursor-pointer"
            />
            <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-[#f1f5f9] border rounded">
              {String(val ?? 0)}
            </span>
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            value={Number(val ?? 0)}
            onChange={(e) => updateArg(argDef.name, Number(e.target.value))}
            className="w-24 px-2 py-1 text-xs font-mono font-bold bg-white border-2 border-[#cbd5e1] rounded-[4px]"
          />
        );
      case 'color':
        return (
          <div className="inline-flex items-center gap-2">
            <input
              type="color"
              value={typeof val === 'string' && val.startsWith('#') ? val : '#19c8b9'}
              onChange={(e) => updateArg(argDef.name, e.target.value)}
              className="w-8 h-7 p-0 border rounded cursor-pointer"
            />
            {Boolean(val) && (
              <button
                type="button"
                onClick={() => updateArg(argDef.name, undefined)}
                className="text-[11px] font-bold text-[#64748b] underline cursor-pointer"
              >
                恢复原画多色
              </button>
            )}
          </div>
        );
      case 'text':
      default:
        return (
          <input
            type="text"
            value={String(val ?? '')}
            onChange={(e) => updateArg(argDef.name, e.target.value)}
            className="w-full max-w-xs px-2.5 py-1 text-xs font-semibold bg-white border-2 border-[#cbd5e1] rounded-[4px] outline-none focus:border-[#ff4785]"
          />
        );
    }
  };

  const explorerContent = (
    <div className="h-full flex flex-col bg-[#fcfbf7] select-none">
      {/* Storybook Brand Header */}
      <div className="p-3.5 border-b-2 border-[#e5dfd0] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center bg-[#ff4785] text-white font-black px-font-display text-sm border-2 border-[#591029] rounded-[4px] shadow-[0_2px_0_0_#a61b4d]">
            S
          </span>
          <div>
            <div className="text-xs font-black text-[var(--px-ink)] leading-none">
              Storybook 10
            </div>
            <div className="text-[10px] font-bold text-[var(--px-ink-muted)] mt-0.5">
              Pixel Island CSF 3.0
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onBackToSite}
          className="px-2 py-1 text-[11px] font-extrabold bg-[var(--px-surface-warm)] hover:bg-[#e5dac0] border-2 border-[var(--px-border)] rounded-[4px] cursor-pointer"
        >
          ← 总览官网
        </button>
      </div>

      {/* Story Search Filter */}
      <div className="p-2.5 border-b border-[#ebe5d6]">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border-2 border-[#d5cbb8] rounded-[4px]">
          <PixelIcon name="search" size={13} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索 Story / 组件..."
            className="w-full text-xs font-semibold bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Story Tree */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
        {groupedTree.map(([category, groups]) => (
          <div key={category}>
            <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8a7b66]">
              {category}
            </div>
            <div className="space-y-1.5 mt-1">
              {groups.map((grp) => {
                const isCurrentGroup = grp.groupId === activeGroup.groupId;
                return (
                  <div key={grp.groupId} className="space-y-0.5">
                    <div className="px-2 py-1 text-xs font-extrabold text-[var(--px-ink)] flex items-center gap-1.5">
                      <span className="text-[#ff4785]">▣</span>
                      <span>{grp.componentName}</span>
                    </div>
                    <div className="pl-4 space-y-0.5">
                      {/* Autodocs Item */}
                      <button
                        type="button"
                        onClick={() =>
                          selectStory(grp, grp.stories[0]?.id ?? '', 'docs')
                        }
                        className={`w-full flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-[4px] text-left cursor-pointer ${
                          isCurrentGroup && viewTab === 'docs'
                            ? 'bg-[#ff4785]/15 text-[#b81d52]'
                            : 'text-[#695036] hover:bg-[#efe9da]'
                        }`}
                      >
                        <span className="text-[11px] text-[#f59e0b]">📄</span>
                        <span>Docs 自动文档</span>
                      </button>

                      {/* Named CSF Stories */}
                      {grp.stories.map((st) => {
                        const selected =
                          isCurrentGroup && viewTab === 'canvas' && activeStory?.id === st.id;
                        return (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => selectStory(grp, st.id, 'canvas')}
                            className={`w-full flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-[4px] text-left cursor-pointer transition-colors ${
                              selected
                                ? 'bg-[#19c8b9] text-white shadow-[0_2px_0_0_#0d7e74]'
                                : 'text-[#695036] hover:bg-[#efe9da]'
                            }`}
                          >
                            <span className="text-[11px]">◇</span>
                            <span className="truncate">{st.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-[#f4f2ea]">
      {/* Desktop Left Explorer */}
      <aside className="hidden lg:block w-64 shrink-0 border-r-2 border-[#d8d0be] h-full">
        {explorerContent}
      </aside>

      {/* Mobile Explorer Drawer */}
      {mobileExplorerOpen && (
        <div
          onClick={() => setMobileExplorerOpen(false)}
          className="fixed inset-0 z-50 bg-black/45 lg:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-72 max-w-[85vw] h-full shadow-2xl"
          >
            {explorerContent}
          </div>
        </div>
      )}

      {/* Right Main Workbench Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Storybook Toolbar */}
        <header className="h-12 px-3 sm:px-4 bg-white border-b-2 border-[#d8d0be] flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileExplorerOpen(true)}
              className="lg:hidden px-2.5 py-1 text-xs font-extrabold bg-[#f6f0da] border-2 border-[var(--px-border)] rounded-[4px] cursor-pointer"
            >
              ☰ Stories
            </button>

            {/* Canvas vs Docs Tabs */}
            <div className="inline-flex p-0.5 bg-[#f1efe7] border border-[#d5cbb8] rounded-[4px]">
              <button
                type="button"
                onClick={() => setViewTab('canvas')}
                className={`px-3 py-1 text-xs font-extrabold rounded-[3px] cursor-pointer ${
                  viewTab === 'canvas' ? 'bg-white text-[#ff4785] shadow-xs' : 'text-[#64748b]'
                }`}
              >
                Canvas 画布
              </button>
              <button
                type="button"
                onClick={() => setViewTab('docs')}
                className={`px-3 py-1 text-xs font-extrabold rounded-[3px] cursor-pointer ${
                  viewTab === 'docs' ? 'bg-white text-[#ff4785] shadow-xs' : 'text-[#64748b]'
                }`}
              >
                Docs 文档
              </button>
            </div>

            <span className="hidden md:inline-block h-4 w-[1px] bg-[#e2e8f0] mx-1" />

            {/* Background Swatches */}
            <div className="hidden sm:flex items-center gap-1">
              {CANVAS_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  title={`画布背景：${bg.label}`}
                  onClick={() => setBgId(bg.id)}
                  style={{ background: bg.value }}
                  className={`w-5 h-5 rounded-[3px] border-2 cursor-pointer ${
                    bgId === bg.id ? 'border-[#ff4785] scale-110' : 'border-[#94a3b8]'
                  }`}
                />
              ))}
            </div>

            {/* 8px Pixel Grid Toggle */}
            <button
              type="button"
              onClick={() => setShowGrid((g) => !g)}
              className={`px-2 py-1 text-[11px] font-bold rounded-[3px] border cursor-pointer ${
                showGrid
                  ? 'bg-[#e6f9f6] text-[#0f766e] border-[#19c8b9]'
                  : 'bg-white text-[#64748b] border-[#cbd5e1]'
              }`}
            >
              # 网格
            </button>

            {/* Viewport Selector */}
            <select
              value={viewport}
              onChange={(e) => setViewport(e.target.value as 'full' | 'tablet' | 'mobile')}
              aria-label="Viewport size"
              className="hidden sm:block px-2 py-1 text-[11px] font-bold bg-white border border-[#cbd5e1] rounded-[3px]"
            >
              <option value="full">视口: 自适应 100%</option>
              <option value="tablet">视口: Tablet 768px</option>
              <option value="mobile">视口: Mobile 375px</option>
            </select>

            {/* Zoom & Remount */}
            <button
              type="button"
              onClick={() => setZoom((z) => (z >= 1.25 ? 0.85 : Number((z + 0.15).toFixed(2))))}
              className="hidden md:inline-block px-2 py-1 text-[11px] font-mono font-bold bg-white border border-[#cbd5e1] rounded-[3px] cursor-pointer"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              title="重新挂载组件实例"
              onClick={() => {
                setRemountSeed((s) => s + 1);
                pushAction('canvas/remount', activeStory?.name ?? '');
              }}
              className="px-2 py-1 text-xs font-bold bg-white border border-[#cbd5e1] rounded-[3px] cursor-pointer hover:bg-[#f8fafc]"
            >
              ↻
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <PixelButton
              size="sm"
              icon="island"
              onClick={() => onJumpComponentDoc(activeGroup.componentId)}
            >
              查看官网文档页
            </PixelButton>
          </div>
        </header>

        {/* Center Canvas OR Autodocs Page */}
        {viewTab === 'canvas' ? (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Live Interactive Canvas Viewport */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#eae6da]">
              <div
                style={{
                  backgroundColor: activeBg.value,
                  backgroundImage: showGrid
                    ? activeBg.dark
                      ? 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)'
                      : 'linear-gradient(rgba(92,67,40,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(92,67,40,0.07) 1px, transparent 1px)'
                    : undefined,
                  backgroundSize: '16px 16px',
                  width:
                    viewport === 'mobile'
                      ? '375px'
                      : viewport === 'tablet'
                      ? '768px'
                      : '100%',
                }}
                className="min-h-[240px] max-w-full rounded-[6px] border-2 border-[#c8bfab] shadow-sm p-6 sm:p-10 flex items-center justify-center transition-all relative"
              >
                <span className="absolute top-2.5 left-3 text-[11px] font-mono font-bold opacity-55 select-none">
                  {activeGroup.fileName} · {activeStory?.exportName}
                </span>
                <div
                  key={`${activeStory?.id}-${remountSeed}`}
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className="max-w-full"
                >
                  {activeStory?.render(instrumentedArgs)}
                </div>
              </div>
            </div>

            {/* Bottom Addons Panel (Controls / Actions / JSX / CSF Source) */}
            <div
              className={`bg-white border-t-2 border-[#d8d0be] flex flex-col transition-all ${
                addonOpen ? 'h-72 sm:h-80' : 'h-10'
              }`}
            >
              <div className="h-10 px-3 bg-[#f9f8f3] border-b border-[#e5dfd0] flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
                <div className="flex items-center gap-1">
                  {[
                    { id: 'controls', label: `Controls 参数 (${activeGroup.argTypes.length})` },
                    { id: 'actions', label: `Actions 事件 (${actions.length})` },
                    { id: 'jsx', label: 'JSX 实时代码' },
                    { id: 'csf', label: 'CSF 3.0 (.stories.tsx)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setAddonTab(tab.id as typeof addonTab);
                        setAddonOpen(true);
                      }}
                      className={`px-3 py-1.5 text-xs font-extrabold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        addonTab === tab.id && addonOpen
                          ? 'border-[#ff4785] text-[#ff4785]'
                          : 'border-transparent text-[#64748b] hover:text-[#1e293b]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {addonTab === 'controls' && addonOpen && (
                    <button
                      type="button"
                      onClick={resetArgs}
                      className="px-2 py-0.5 text-[11px] font-bold bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded cursor-pointer"
                    >
                      重置参数 Reset
                    </button>
                  )}
                  {addonTab === 'actions' && addonOpen && (
                    <button
                      type="button"
                      onClick={() => setActions([])}
                      className="px-2 py-0.5 text-[11px] font-bold bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded cursor-pointer"
                    >
                      清空日志
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setAddonOpen((o) => !o)}
                    className="px-2 py-0.5 text-xs font-bold text-[#64748b] cursor-pointer"
                  >
                    {addonOpen ? '▼ 收起' : '▲ 展开面板'}
                  </button>
                </div>
              </div>

              {addonOpen && (
                <div className="flex-1 overflow-auto p-3 sm:p-4">
                  {addonTab === 'controls' &&
                    (activeGroup.argTypes.length === 0 ? (
                      <div className="py-6 text-center text-xs font-semibold text-[#64748b]">
                        该复合交互 Story 使用内部状态控制，可直接点击上方画布中的按钮交互体验，并在「Actions 事件」面板查看回调日志。
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#e2e8f0] text-[#64748b]">
                            <th className="py-2 pr-3 font-extrabold w-1/5">属性 Name</th>
                            <th className="py-2 pr-3 font-extrabold w-2/5">说明 Description</th>
                            <th className="py-2 font-extrabold w-2/5">实时控件 Control</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1f5f9]">
                          {activeGroup.argTypes.map((arg) => (
                            <tr key={arg.name}>
                              <td className="py-2.5 pr-3 font-mono font-bold text-[#be185d]">
                                {arg.name}
                              </td>
                              <td className="py-2.5 pr-3 text-[#475569]">
                                {arg.description || `${arg.controlType} interactive prop`}
                              </td>
                              <td className="py-2.5">{renderControlInput(arg)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ))}

                  {addonTab === 'actions' && (
                    <div className="space-y-1.5 font-mono text-xs">
                      {actions.map((act) => (
                        <div
                          key={act.id}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded"
                        >
                          <span className="text-[#94a3b8]">{act.time}</span>
                          <span className="px-1.5 py-0.5 bg-[#ffe4e6] text-[#be123c] font-bold rounded">
                            {act.name}
                          </span>
                          <span className="text-[#334155] truncate">{act.payload}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {addonTab === 'jsx' && (
                    <PixelCodeBlock title="LiveJSXPreview.tsx" code={liveJsxCode} />
                  )}

                  {addonTab === 'csf' && (
                    <PixelCodeBlock title={activeGroup.fileName} code={activeGroup.rawCode} />
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ===============================================================
             STORYBOOK AUTODOCS PAGE VIEW
             =============================================================== */
          <div className="flex-1 overflow-y-auto bg-white p-6 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PixelTag color="pink" size="sm">
                    CSF 3.0 AUTODOCS
                  </PixelTag>
                  <code className="text-xs text-[#64748b] font-mono">{activeGroup.fileName}</code>
                </div>
                <h1 className="m-0 text-3xl font-black text-[var(--px-ink)]">
                  {activeGroup.category} / {activeGroup.componentName}
                </h1>
                <p className="mt-2 text-sm font-medium text-[var(--px-ink-body)]">
                  {activeGroup.description}
                </p>
              </div>

              {/* Primary Interactive Canvas Card + Args Table */}
              <div className="border-2 border-[#e2e8f0] rounded-[6px] overflow-hidden">
                <div className="p-8 bg-[#f8f6eb] flex items-center justify-center border-b-2 border-[#e2e8f0]">
                  {activeGroup.stories[0]?.render(instrumentedArgs)}
                </div>
                <div className="p-4 bg-white">
                  {activeGroup.argTypes.length > 0 && (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#e2e8f0] text-[#64748b]">
                          <th className="py-2 pr-3 font-extrabold">Prop</th>
                          <th className="py-2 pr-3 font-extrabold">Description</th>
                          <th className="py-2 font-extrabold">Control</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {activeGroup.argTypes.map((arg) => (
                          <tr key={arg.name}>
                            <td className="py-2.5 pr-3 font-mono font-bold text-[#be185d]">
                              {arg.name}
                            </td>
                            <td className="py-2.5 pr-3 text-[#475569]">
                              {arg.description || '-'}
                            </td>
                            <td className="py-2.5">{renderControlInput(arg)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* All Exported Stories Stack */}
              <div className="space-y-5">
                <h2 className="m-0 text-lg font-extrabold text-[var(--px-ink)]">
                  All Stories 全部导出故事 ({activeGroup.stories.length})
                </h2>
                {activeGroup.stories.map((st) => (
                  <div
                    key={st.id}
                    className="border-2 border-[#e5dfd0] rounded-[6px] overflow-hidden"
                  >
                    <div className="px-4 py-2.5 bg-[#faf8f2] border-b border-[#e5dfd0] flex items-center justify-between">
                      <span className="font-extrabold text-xs text-[var(--px-ink)]">{st.name}</span>
                      <button
                        type="button"
                        onClick={() => selectStory(activeGroup, st.id, 'canvas')}
                        className="text-xs font-bold text-[#ff4785] hover:underline cursor-pointer"
                      >
                        在独立 Canvas 中打开 →
                      </button>
                    </div>
                    <div className="p-6 bg-[#f8f6eb]">{st.render(st.args)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
