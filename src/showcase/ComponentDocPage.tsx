import React, { useState } from 'react';
import {
  PixelButton,
  PixelCard,
  PixelCodeBlock,
  PixelColor,
  PixelIcon,
  PixelTable,
  PixelTag,
  PixelTitle,
  PixelTypewriter,
} from '../pixel-ui';
import { CATEGORY_LABELS, COMPONENT_CATALOG } from './catalog';

const RIBBON_COLORS: PixelColor[] = [
  'mint',
  'yellow',
  'pink',
  'blue',
  'purple',
  'orange',
  'green',
  'peach',
];

interface ComponentDocPageProps {
  componentId: string;
  onSelectComponent: (id: string) => void;
  onOpenStorybook: (storyComponentId: string) => void;
  onBackOverview: () => void;
}

export const ComponentDocPage: React.FC<ComponentDocPageProps> = ({
  componentId,
  onSelectComponent,
  onOpenStorybook,
  onBackOverview,
}) => {
  const [openCodes, setOpenCodes] = useState<Record<number, boolean>>({ 0: true });

  const currentIndex = COMPONENT_CATALOG.findIndex((c) => c.id === componentId);
  const item = COMPONENT_CATALOG[currentIndex >= 0 ? currentIndex : 0];
  const prevItem = currentIndex > 0 ? COMPONENT_CATALOG[currentIndex - 1] : null;
  const nextItem =
    currentIndex >= 0 && currentIndex < COMPONENT_CATALOG.length - 1
      ? COMPONENT_CATALOG[currentIndex + 1]
      : null;

  const ribbonColor =
    RIBBON_COLORS[
      Math.abs(item.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) %
        RIBBON_COLORS.length
    ];

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-10 py-8 sm:py-10 flex flex-col gap-7">
      {/* Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--px-ink-muted)]">
          <button
            type="button"
            onClick={onBackOverview}
            className="hover:text-[var(--px-ink)] underline cursor-pointer"
          >
            首页总览
          </button>
          <span>/</span>
          <span>{CATEGORY_LABELS[item.category].label}</span>
          <span>/</span>
          <span className="text-[var(--px-ink)] font-extrabold">{item.name}</span>
        </div>

        <PixelButton
          size="sm"
          variant="primary"
          icon="book"
          onClick={() => onOpenStorybook(item.storyComponentId)}
        >
          在 Storybook Controls 中交互调试 ↗
        </PixelButton>
      </div>

      {/* Ribbon Banner + Typewriter Description (Direct nod to animal-island-ui ComponentPage.tsx) */}
      <div>
        <PixelTitle color={ribbonColor} size="lg" icon={item.icon}>
          {item.name} {item.cnName}
        </PixelTitle>
        <div className="mt-1 text-sm font-semibold text-[var(--px-ink-body)]">
          <PixelTypewriter key={item.id} text={item.desc} speed={22} />
        </div>
      </div>

      {/* Live Demo Blocks */}
      {item.demos.map((demo, idx) => {
        const showCode = !!openCodes[idx];
        return (
          <PixelCard
            key={demo.title}
            title={
              <span className="inline-flex items-center gap-2">
                <PixelIcon name="sparkles" size={16} />
                <span>{demo.title}</span>
              </span>
            }
            extra={
              <button
                type="button"
                onClick={() => setOpenCodes((p) => ({ ...p, [idx]: !p[idx] }))}
                className="px-2.5 py-1 text-xs font-bold bg-[var(--px-surface-warm)] hover:bg-[#e8dec3] border-2 border-[var(--px-border)] rounded-[3px] cursor-pointer"
              >
                {showCode ? '收起 JSX 源码 ▲' : '查看 JSX 源码 </>'}
              </button>
            }
            className="bg-[var(--px-surface)]"
          >
            <p className="m-0 mb-4 text-xs font-medium text-[var(--px-ink-muted)]">{demo.desc}</p>
            <div className="p-4 sm:p-5 bg-[#faf7ec] border-2 border-dashed border-[#d8ccb4] rounded-[4px]">
              {demo.render()}
            </div>
            {showCode && (
              <div className="mt-4">
                <PixelCodeBlock title={`${item.name}Demo.tsx`} code={demo.code} />
              </div>
            )}
          </PixelCard>
        );
      })}

      {/* API Props Table */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="m-0 text-lg font-extrabold text-[var(--px-ink)]">API 属性说明</h2>
          <PixelTag color="blue" size="sm">
            TypeScript
          </PixelTag>
        </div>
        <PixelTable
          striped
          dataSource={item.api.map((r) => ({ ...r, key: r.prop }))}
          columns={[
            {
              key: 'prop',
              title: '属性 Prop',
              width: '22%',
              render: (v) => (
                <code className="px-1.5 py-0.5 bg-[var(--px-surface-warm)] border border-[#d6c8ad] rounded text-xs font-extrabold text-[#b45309]">
                  {String(v)}
                </code>
              ),
            },
            { key: 'desc', title: '说明 Description', width: '38%' },
            {
              key: 'type',
              title: '类型 Type',
              width: '26%',
              render: (v) => (
                <code className="font-mono text-xs text-[#0f766e] font-bold">{String(v)}</code>
              ),
            },
            {
              key: 'defaultVal',
              title: '默认值 Default',
              width: '14%',
              render: (v) => <code className="font-mono text-xs">{String(v)}</code>,
            },
          ]}
        />
      </section>

      {/* Bottom Prev / Next Navigation */}
      <div className="pt-4 border-t-2 border-dashed border-[#d8ccb4] flex items-center justify-between gap-3">
        {prevItem ? (
          <PixelButton
            size="sm"
            icon={prevItem.icon}
            onClick={() => onSelectComponent(prevItem.id)}
          >
            ← {prevItem.name} {prevItem.cnName}
          </PixelButton>
        ) : (
          <PixelButton size="sm" icon="home" onClick={onBackOverview}>
            ← 返回总览首页
          </PixelButton>
        )}

        {nextItem && (
          <PixelButton
            size="sm"
            variant="primary"
            icon={nextItem.icon}
            onClick={() => onSelectComponent(nextItem.id)}
          >
            {nextItem.name} {nextItem.cnName} →
          </PixelButton>
        )}
      </div>
    </div>
  );
};
