import React, { useEffect, useState } from 'react';
import { PixelSize } from '../types';
import { PixelIcon, PixelIconName, PixelVillagerSprite } from '../icons/PixelIcons';
import { PixelButton } from './General';

/* ==========================================================================
   24. PixelProgress — HP / MP / EXP / Mint Island Pixel Bar
   ========================================================================== */
export type PixelProgressPreset = 'island' | 'hp' | 'mp' | 'exp';

export interface PixelProgressProps {
  percent: number;
  preset?: PixelProgressPreset;
  size?: PixelSize;
  segmented?: boolean;
  striped?: boolean;
  showInfo?: boolean;
  label?: string;
}

const PROGRESS_COLORS: Record<PixelProgressPreset, { fill: string; text: string }> = {
  island: { fill: 'var(--px-primary)', text: 'ISLAND' },
  hp: { fill: '#ef5350', text: 'HP' },
  mp: { fill: '#42a5f5', text: 'MP' },
  exp: { fill: '#ab47bc', text: 'EXP' },
};

export const PixelProgress: React.FC<PixelProgressProps> = ({
  percent,
  preset = 'island',
  size = 'md',
  segmented = true,
  striped = false,
  showInfo = true,
  label,
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  const conf = PROGRESS_COLORS[preset];
  const barHeight = size === 'sm' ? 'h-3.5' : size === 'lg' ? 'h-6' : 'h-5';

  return (
    <div className="w-full flex items-center gap-3">
      {label !== undefined && (
        <span className="text-xs font-black px-font-display text-[var(--px-ink)] min-w-[38px]">
          {label}
        </span>
      )}
      <div
        className={`relative flex-1 bg-[#efe7cc] border-2 border-[var(--px-border)] rounded-[4px] p-0.5 overflow-hidden shadow-[inset_0_2px_0_rgba(0,0,0,0.08)] ${barHeight}`}
      >
        <div
          style={{
            width: `${clamped}%`,
            backgroundColor: conf.fill,
            backgroundImage: striped
              ? 'linear-gradient(45deg, rgba(255,255,255,0.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.28) 75%, transparent 75%, transparent)'
              : undefined,
            backgroundSize: striped ? '24px 24px' : undefined,
            animation: striped ? 'px-stripes 0.8s linear infinite' : undefined,
          }}
          className="h-full rounded-[2px] transition-all duration-300"
        />
        {segmented && (
          <div
            aria-hidden="true"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0, transparent 14px, rgba(248,246,235,0.55) 14px, rgba(248,246,235,0.55) 16px)',
            }}
            className="pointer-events-none absolute inset-0"
          />
        )}
      </div>
      {showInfo && (
        <span className="min-w-[44px] text-right text-xs font-black px-font-display text-[var(--px-ink)]">
          {clamped}%
        </span>
      )}
    </div>
  );
};

/* ==========================================================================
   25. PixelModal — Stepped Parchment Dialog Box with Corner Rivets
   ========================================================================== */
export interface PixelModalProps {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  footer?: React.ReactNode | null;
  children: React.ReactNode;
}

export const PixelModal: React.FC<PixelModalProps> = ({
  open,
  title = '海岛广播通知',
  onClose,
  onConfirm,
  confirmText = '确认出发',
  cancelText = '稍后再说',
  footer,
  children,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241b12]/55 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[var(--px-surface)] border-4 border-[var(--px-border)] rounded-[6px] p-5 shadow-[0_8px_0_0_rgba(58,38,20,0.45)] animate-px-zoom"
      >
        {/* 4 Pixel Corner Bolts */}
        <span className="w-2 h-2 bg-[#c8b698] border border-[var(--px-border)] absolute top-1.5 left-1.5" />
        <span className="w-2 h-2 bg-[#c8b698] border border-[var(--px-border)] absolute top-1.5 right-1.5" />
        <span className="w-2 h-2 bg-[#c8b698] border border-[var(--px-border)] absolute bottom-1.5 left-1.5" />
        <span className="w-2 h-2 bg-[#c8b698] border border-[var(--px-border)] absolute bottom-1.5 right-1.5" />

        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-dashed border-[#d4c7ae]">
          <div className="inline-flex items-center gap-2 font-extrabold text-base text-[var(--px-ink)]">
            <PixelIcon name="bell" size={18} />
            <span>{title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 inline-flex items-center justify-center bg-[#efe6cf] hover:bg-[#e2d4b5] border-2 border-[var(--px-border)] rounded-[3px] cursor-pointer"
          >
            <PixelIcon name="close" size={12} />
          </button>
        </div>

        <div className="text-sm text-[var(--px-ink-body)] leading-relaxed">{children}</div>

        {footer !== null && (
          <div className="mt-5 pt-3 border-t-2 border-dashed border-[#d4c7ae] flex items-center justify-end gap-2.5">
            {footer !== undefined ? (
              footer
            ) : (
              <>
                <PixelButton size="sm" onClick={onClose}>
                  {cancelText}
                </PixelButton>
                <PixelButton
                  size="sm"
                  variant="primary"
                  icon="check"
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                >
                  {confirmText}
                </PixelButton>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   26. PixelDrawer — Slide-out Island Pocket / Inventory Drawer
   ========================================================================== */
export interface PixelDrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: 'right' | 'left' | 'bottom';
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const PixelDrawer: React.FC<PixelDrawerProps> = ({
  open,
  onClose,
  placement = 'right',
  title = '岛民随身背包',
  children,
}) => {
  if (!open) return null;

  const panelPos =
    placement === 'left'
      ? 'inset-y-0 left-0 w-80 max-w-[88vw] border-r-4'
      : placement === 'bottom'
      ? 'inset-x-0 bottom-0 h-80 max-h-[80vh] border-t-4'
      : 'inset-y-0 right-0 w-80 max-w-[88vw] border-l-4';

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-[#241b12]/45 backdrop-blur-[1px]">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed bg-[var(--px-surface)] border-[var(--px-border)] p-5 flex flex-col shadow-2xl animate-px-zoom ${panelPos}`}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-dashed border-[#d4c7ae]">
          <div className="inline-flex items-center gap-2 font-extrabold text-base">
            <PixelIcon name="chest" size={18} />
            <span>{title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 inline-flex items-center justify-center bg-[#efe6cf] hover:bg-[#e2d4b5] border-2 border-[var(--px-border)] rounded-[3px] cursor-pointer"
          >
            <PixelIcon name="close" size={12} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto text-sm text-[var(--px-ink-body)]">{children}</div>
      </div>
    </div>
  );
};

/* ==========================================================================
   27. PixelNotification — Global Imperative RPG Toast Achievement System
   ========================================================================== */
export type PixelNoticeType = 'success' | 'info' | 'warning' | 'error';

export interface PixelNoticeItem {
  id: number;
  type: PixelNoticeType;
  title: string;
  description?: string;
}

type Listener = (items: PixelNoticeItem[]) => void;
let noticeStore: PixelNoticeItem[] = [];
const listeners = new Set<Listener>();

const emitNotices = () => {
  listeners.forEach((fn) => fn([...noticeStore]));
};

export const pixelNotify = {
  open(type: PixelNoticeType, title: string, description?: string, duration = 3200) {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    noticeStore = [...noticeStore.slice(-4), { id, type, title, description }];
    emitNotices();
    if (duration > 0) {
      window.setTimeout(() => {
        noticeStore = noticeStore.filter((n) => n.id !== id);
        emitNotices();
      }, duration);
    }
  },
  success: (title: string, description?: string) => pixelNotify.open('success', title, description),
  info: (title: string, description?: string) => pixelNotify.open('info', title, description),
  warning: (title: string, description?: string) => pixelNotify.open('warning', title, description),
  error: (title: string, description?: string) => pixelNotify.open('error', title, description),
  clear() {
    noticeStore = [];
    emitNotices();
  },
};

export const PixelNotificationHost: React.FC = () => {
  const [items, setItems] = useState<PixelNoticeItem[]>([]);

  useEffect(() => {
    listeners.add(setItems);
    return () => {
      listeners.delete(setItems);
    };
  }, []);

  if (items.length === 0) return null;

  const iconByType: Record<PixelNoticeType, { icon: PixelIconName; border: string; bg: string }> = {
    success: { icon: 'trophy', border: '#276624', bg: '#ecfdf3' },
    info: { icon: 'bell', border: '#19695e', bg: '#edfcf9' },
    warning: { icon: 'star', border: '#7a5912', bg: '#fffbeb' },
    error: { icon: 'apple', border: '#7d201c', bg: '#fef2f2' },
  };

  return (
    <div className="fixed top-4 right-4 z-[80] flex flex-col gap-2.5 w-80 max-w-[calc(100vw-2rem)] pointer-events-none">
      {items.map((item) => {
        const meta = iconByType[item.type];
        return (
          <div
            key={item.id}
            style={{ background: meta.bg, borderColor: meta.border }}
            className="pointer-events-auto flex items-start gap-3 p-3.5 border-2 rounded-[5px] shadow-[0_4px_0_0_rgba(58,38,20,0.24)] animate-px-zoom"
          >
            <PixelIcon name={meta.icon} size={20} className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-xs text-[var(--px-ink)]">{item.title}</div>
              {item.description && (
                <div className="mt-0.5 text-xs text-[var(--px-ink-body)] leading-snug">
                  {item.description}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                noticeStore = noticeStore.filter((n) => n.id !== item.id);
                emitNotices();
              }}
              className="opacity-60 hover:opacity-100 cursor-pointer"
            >
              <PixelIcon name="close" size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   28. PixelPagination — Stepped 8-Bit Page Navigator
   ========================================================================== */
export interface PixelPaginationProps {
  total: number;
  pageSize?: number;
  current?: number;
  defaultCurrent?: number;
  onChange?: (page: number) => void;
}

export const PixelPagination: React.FC<PixelPaginationProps> = ({
  total,
  pageSize = 10,
  current,
  defaultCurrent = 1,
  onChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isControlled = current !== undefined;
  const [innerPage, setInnerPage] = useState(defaultCurrent);
  const page = Math.min(totalPages, isControlled ? current : innerPage);

  const go = (next: number) => {
    const safe = Math.min(totalPages, Math.max(1, next));
    if (!isControlled) setInnerPage(safe);
    onChange?.(safe);
  };

  return (
    <nav className="inline-flex flex-wrap items-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className="h-8 px-2.5 text-xs font-extrabold border-2 border-[var(--px-border)] rounded-[3px] bg-[var(--px-surface)] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-[0_2px_0_0_var(--px-shadow-card)]"
      >
        ◀ 上一页
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
        const active = num === page;
        return (
          <button
            key={num}
            type="button"
            onClick={() => go(num)}
            style={
              active
                ? {
                    background: 'var(--px-primary)',
                    color: '#fff',
                    boxShadow: '0 2px 0 0 var(--px-primary-shadow)',
                  }
                : undefined
            }
            className={`w-8 h-8 text-xs font-black px-font-display border-2 border-[var(--px-border)] rounded-[3px] cursor-pointer transition-transform ${
              active ? '-translate-y-0.5' : 'bg-[var(--px-surface)] hover:bg-[var(--px-surface-warm)]'
            }`}
          >
            {num}
          </button>
        );
      })}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        className="h-8 px-2.5 text-xs font-extrabold border-2 border-[var(--px-border)] rounded-[3px] bg-[var(--px-surface)] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-[0_2px_0_0_var(--px-shadow-card)]"
      >
        下一页 ▶
      </button>
      <span className="ml-2 text-xs font-bold text-[var(--px-ink-muted)]">共 {total} 条</span>
    </nav>
  );
};

/* ==========================================================================
   29. PixelSkeleton & PixelLoading & PixelBackTop
   ========================================================================== */
export const PixelSkeleton: React.FC<{
  loading?: boolean;
  rows?: number;
  avatar?: boolean;
  children?: React.ReactNode;
}> = ({ loading = true, rows = 3, avatar = true, children }) => {
  if (!loading && children) return <>{children}</>;

  const shimmerStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(90deg, #eae2cc 0%, #f8f4e8 50%, #eae2cc 100%)',
    backgroundSize: '200% 100%',
    animation: 'px-shimmer 1.4s ease-in-out infinite',
  };

  return (
    <div className="flex items-start gap-3.5 w-full p-4 bg-[var(--px-surface)] border-2 border-[#d8ccb4] rounded-[5px]">
      {avatar && (
        <div
          style={shimmerStyle}
          className="w-11 h-11 shrink-0 border-2 border-[#d4c7ae] rounded-[4px]"
        />
      )}
      <div className="flex-1 flex flex-col gap-2.5">
        {Array.from({ length: rows }, (_, idx) => (
          <div
            key={idx}
            style={{
              ...shimmerStyle,
              width: idx === 0 ? '45%' : idx === rows - 1 ? '72%' : '100%',
            }}
            className="h-3.5 border border-[#dfd4bc] rounded-[2px]"
          />
        ))}
      </div>
    </div>
  );
};

export const PixelLoading: React.FC<{
  active?: boolean;
  tip?: string;
  fullscreen?: boolean;
}> = ({ active = true, tip = '正在乘船前往像素海岛...', fullscreen = false }) => {
  if (!active) return null;

  const flakes = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 19 + 7) % 96}%`,
    delay: `${(i * 0.37) % 3}s`,
    duration: `${3.2 + (i % 4) * 0.7}s`,
    size: i % 3 === 0 ? 6 : 4,
  }));

  return (
    <div
      className={`${
        fullscreen ? 'fixed inset-0 z-[90]' : 'relative w-full h-60 rounded-[6px] border-2 border-[#39415c]'
      } overflow-hidden bg-[#0e1324] flex flex-col items-center justify-center select-none`}
    >
      {flakes.map((f, i) => (
        <span
          key={i}
          style={{
            left: f.left,
            top: -10,
            width: f.size,
            height: f.size,
            animation: `px-snowfall ${f.duration} linear ${f.delay} infinite`,
          }}
          className="pointer-events-none absolute bg-white/90"
        />
      ))}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="p-2 bg-[#1c2541] border-2 border-[#5bc0be] rounded-[6px] animate-px-float">
          <PixelVillagerSprite preset="cat" size={44} />
        </div>
        <div className="px-3.5 py-1 bg-[#1c2541]/90 border border-[#3a506b] rounded-[4px] text-xs font-bold text-[#e0fbfc] flex items-center gap-2">
          <span>{tip}</span>
          <span className="animate-px-blink">...</span>
        </div>
      </div>
    </div>
  );
};

export const PixelBackTop: React.FC<{ targetSelector?: string }> = ({ targetSelector }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = targetSelector ? document.querySelector(targetSelector) : null;
    const onScroll = () => {
      const top = el ? el.scrollTop : window.scrollY;
      setVisible(top > 260);
    };
    const target: EventTarget = el || window;
    target.addEventListener('scroll', onScroll);
    return () => target.removeEventListener('scroll', onScroll);
  }, [targetSelector]);

  if (!visible) return null;

  return (
    <button
      type="button"
      title="返回顶部"
      onClick={() => {
        const el = targetSelector ? document.querySelector(targetSelector) : null;
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center bg-[var(--px-surface)] hover:bg-[#fff9db] border-2 border-[var(--px-border)] rounded-[5px] shadow-[0_4px_0_0_var(--px-shadow-btn)] cursor-pointer hover:-translate-y-1 transition-transform"
    >
      <PixelIcon name="rocket" size={22} />
    </button>
  );
};
