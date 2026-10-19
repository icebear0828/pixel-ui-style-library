import React, { useEffect, useState } from 'react';
import { PIXEL_PALETTE, PixelColor, PixelSize, PixelVillagerPreset } from '../types';
import { PixelIcon, PixelIconName, PixelVillagerSprite } from '../icons/PixelIcons';

/* ==========================================================================
   15. PixelCard — 12 Island Colors + Polka Pattern + RPG Dialog Variant
   ========================================================================== */
export interface PixelCardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  color?: PixelColor;
  variant?: 'default' | 'dashed' | 'rpg';
  pattern?: boolean;
  hoverable?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  title,
  extra,
  color = 'default',
  variant = 'default',
  pattern = false,
  hoverable = false,
  children,
  onClick,
  className = '',
  style,
}) => {
  const p = PIXEL_PALETTE[color] || PIXEL_PALETTE.default;
  const isRpg = variant === 'rpg';

  const cardStyle: React.CSSProperties = isRpg
    ? {
        background: '#222034',
        color: '#f8f5e6',
        borderColor: '#ffffff',
        boxShadow: '0 0 0 3px #222034, 0 6px 0 0 rgba(0,0,0,0.35)',
        ...style,
      }
    : {
        backgroundColor: p.bg,
        color: p.text,
        borderColor: p.border,
        borderStyle: variant === 'dashed' ? 'dashed' : 'solid',
        boxShadow: `0 4px 0 0 ${p.shadow}, inset 0 2px 0 0 rgba(255,255,255,0.5)`,
        backgroundImage: pattern
          ? `radial-gradient(${p.dot} 2.2px, transparent 2.2px)`
          : undefined,
        backgroundSize: pattern ? '18px 18px' : undefined,
        ...style,
      };

  return (
    <div
      onClick={onClick}
      style={cardStyle}
      className={`relative border-2 rounded-[5px] p-4 transition-transform duration-150 ${
        hoverable ? 'cursor-pointer hover:-translate-y-1 active:translate-y-0.5' : ''
      } ${className}`}
    >
      {(title || extra) && (
        <div
          className={`flex items-center justify-between gap-2 pb-2.5 mb-3 border-b-2 border-dashed ${
            isRpg ? 'border-white/25' : 'border-current/20'
          }`}
        >
          {title && <div className="font-extrabold text-sm flex items-center gap-2">{title}</div>}
          {extra && <div className="text-xs shrink-0">{extra}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

/* ==========================================================================
   16. PixelTag — Solid / Outlined / Dashed Pixel Capsule Badge
   ========================================================================== */
export interface PixelTagProps {
  children: React.ReactNode;
  color?: PixelColor;
  variant?: 'solid' | 'outlined' | 'dashed';
  size?: PixelSize;
  icon?: PixelIconName;
  closable?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

export const PixelTag: React.FC<PixelTagProps> = ({
  children,
  color = 'mint',
  variant = 'solid',
  size = 'md',
  icon,
  closable = false,
  onClose,
  onClick,
  className = '',
}) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const p = PIXEL_PALETTE[color] || PIXEL_PALETTE.mint;
  const sizeCls: Record<PixelSize, string> = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-0.5 text-xs gap-1.5',
    lg: 'px-3.5 py-1 text-sm gap-1.5',
  };

  const tagStyle: React.CSSProperties =
    variant === 'solid'
      ? {
          background: p.bg,
          color: p.text,
          borderColor: p.border,
          boxShadow: `0 2px 0 0 ${p.shadow}`,
        }
      : {
          background: 'rgba(255,255,255,0.72)',
          color: p.border,
          borderColor: p.border,
          borderStyle: variant === 'dashed' ? 'dashed' : 'solid',
        };

  return (
    <span
      onClick={onClick}
      style={tagStyle}
      className={`inline-flex items-center font-bold border-2 rounded-[3px] select-none ${
        sizeCls[size]
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5 transition-transform' : ''} ${className}`}
    >
      {icon && <PixelIcon name={icon} size={size === 'sm' ? 11 : 13} />}
      <span>{children}</span>
      {closable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
            onClose?.();
          }}
          className="ml-0.5 hover:opacity-75 cursor-pointer inline-flex items-center"
        >
          <PixelIcon name="close" size={10} />
        </button>
      )}
    </span>
  );
};

/* ==========================================================================
   17. PixelBadge — Corner Pixel Counter (99+) & Status Dot
   ========================================================================== */
export interface PixelBadgeProps {
  count?: number;
  overflowCount?: number;
  dot?: boolean;
  color?: PixelColor;
  children?: React.ReactNode;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  count = 0,
  overflowCount = 99,
  dot = false,
  color = 'red',
  children,
}) => {
  const p = PIXEL_PALETTE[color] || PIXEL_PALETTE.red;
  const label = count > overflowCount ? `${overflowCount}+` : String(count);
  const show = dot || count > 0;

  if (!children) {
    return (
      <span
        style={{ background: p.bg, color: p.text, borderColor: p.border }}
        className="inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-black border-2 rounded-[3px] px-font-display"
      >
        {dot ? '' : label}
      </span>
    );
  }

  return (
    <span className="relative inline-flex">
      {children}
      {show && (
        <span
          style={{ background: p.bg, color: p.text, borderColor: p.border }}
          className={`absolute -top-2 -right-2 inline-flex items-center justify-center border-2 font-black px-font-display leading-none ${
            dot ? 'w-3 h-3 rounded-[2px]' : 'min-w-[20px] h-5 px-1 text-[10px] rounded-[3px]'
          }`}
        >
          {dot ? '' : label}
        </span>
      )}
    </span>
  );
};

/* ==========================================================================
   18. PixelAvatar & PixelAvatarGroup — Built-in 8-bit Animal Villagers!
   ========================================================================== */
export interface PixelAvatarProps {
  villager?: PixelVillagerPreset;
  src?: string;
  text?: string;
  size?: PixelSize | number;
  shape?: 'square' | 'round';
  className?: string;
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  villager,
  src,
  text,
  size = 'md',
  shape = 'square',
  className = '',
}) => {
  const [imgErr, setImgErr] = useState(false);
  const px = typeof size === 'number' ? size : size === 'sm' ? 32 : size === 'lg' ? 52 : 42;

  return (
    <div
      style={{
        width: px,
        height: px,
        boxShadow: '0 3px 0 0 var(--px-shadow-card)',
      }}
      className={`inline-flex items-center justify-center overflow-hidden bg-[var(--px-surface-warm)] border-2 border-[var(--px-border)] font-extrabold text-[var(--px-ink)] shrink-0 ${
        shape === 'round' ? 'rounded-full' : 'rounded-[4px]'
      } ${className}`}
    >
      {src && !imgErr ? (
        <img
          src={src}
          alt={text || 'avatar'}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover"
        />
      ) : villager ? (
        <PixelVillagerSprite preset={villager} size={px} />
      ) : (
        <span style={{ fontSize: Math.max(11, Math.round(px * 0.36)) }}>
          {(text || 'IS').slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export const PixelAvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  size?: PixelSize;
}> = ({ children, max = 4, size = 'md' }) => {
  const items = React.Children.toArray(children);
  const shown = items.slice(0, max);
  const restCount = items.length - max;

  return (
    <div className="inline-flex items-center -space-x-2">
      {shown.map((item, idx) => (
        <div key={idx} className="ring-2 ring-[var(--px-bg)] rounded-[4px]">
          {item}
        </div>
      ))}
      {restCount > 0 && (
        <PixelAvatar text={`+${restCount}`} size={size} className="bg-[#fae06b]" />
      )}
    </div>
  );
};

/* ==========================================================================
   19. PixelCollapse — Smooth CSS Grid 0fr <-> 1fr Quest Accordion
   ========================================================================== */
export interface PixelCollapseItem {
  key: string;
  label: React.ReactNode;
  badge?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface PixelCollapseProps {
  items: PixelCollapseItem[];
  defaultActiveKeys?: string[];
  accordion?: boolean;
}

export const PixelCollapse: React.FC<PixelCollapseProps> = ({
  items,
  defaultActiveKeys = [],
  accordion = false,
}) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKeys);

  const toggle = (key: string) => {
    setActiveKeys((prev) => {
      const exists = prev.includes(key);
      if (accordion) return exists ? [] : [key];
      return exists ? prev.filter((k) => k !== key) : [...prev, key];
    });
  };

  return (
    <div className="border-2 border-[var(--px-border)] rounded-[5px] bg-[var(--px-surface)] divide-y-2 divide-[var(--px-border)] overflow-hidden shadow-[0_4px_0_0_var(--px-shadow-card)]">
      {items.map((item) => {
        const isOpen = activeKeys.includes(item.key);
        return (
          <div key={item.key}>
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.key)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left font-bold text-sm transition-colors ${
                item.disabled
                  ? 'opacity-45 cursor-not-allowed bg-[#efead9]'
                  : isOpen
                  ? 'bg-[var(--px-surface-warm)] cursor-pointer'
                  : 'hover:bg-[var(--px-surface-warm)]/60 cursor-pointer'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-xs text-[var(--px-primary-active)]">
                  {isOpen ? '▼' : '▶'}
                </span>
                <span>{item.label}</span>
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 text-[11px] rounded-[3px] bg-[var(--px-primary-soft)] border border-[var(--px-primary)] text-[var(--px-ink)]">
                  {item.badge}
                </span>
              )}
            </button>
            <div
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              className="grid transition-[grid-template-rows] duration-200 ease-out"
            >
              <div className="overflow-hidden">
                <div className="px-4 py-3 text-sm text-[var(--px-ink-body)] bg-white/60 border-t-2 border-dashed border-[#dfd4bc]">
                  {item.children}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   20. PixelTabs — Folder Tab & Capsule Inventory Switcher
   ========================================================================== */
export interface PixelTabItem {
  key: string;
  label: string;
  icon?: PixelIconName;
  children: React.ReactNode;
}

export interface PixelTabsProps {
  items: PixelTabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: 'folder' | 'pill';
}

export const PixelTabs: React.FC<PixelTabsProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant = 'folder',
}) => {
  const isControlled = activeKey !== undefined;
  const [innerKey, setInnerKey] = useState(defaultActiveKey ?? items[0]?.key ?? '');
  const currentKey = isControlled ? activeKey : innerKey;
  const activeTab = items.find((t) => t.key === currentKey) ?? items[0];

  const handleSelect = (k: string) => {
    if (!isControlled) setInnerKey(k);
    onChange?.(k);
  };

  return (
    <div className="w-full">
      <div
        className={
          variant === 'pill'
            ? 'inline-flex flex-wrap gap-1.5 p-1.5 bg-[var(--px-surface-sunk)] border-2 border-[var(--px-border)] rounded-[5px] mb-3'
            : 'flex flex-wrap gap-1.5 border-b-2 border-[var(--px-border)] pl-1'
        }
      >
        {items.map((tab) => {
          const active = tab.key === currentKey;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleSelect(tab.key)}
              className={
                variant === 'pill'
                  ? `inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold rounded-[3px] transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--px-primary)] text-white border-2 border-[var(--px-ink-strong)] shadow-[0_2px_0_0_var(--px-primary-shadow)]'
                        : 'text-[var(--px-ink-body)] hover:bg-[var(--px-surface)]'
                    }`
                  : `inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-t-[4px] border-2 border-b-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--px-surface)] text-[var(--px-ink)] border-[var(--px-border)] translate-y-[2px]'
                        : 'bg-[var(--px-surface-sunk)] text-[var(--px-ink-muted)] border-[#b9aa90] hover:bg-[var(--px-surface-warm)]'
                    }`
              }
            >
              {tab.icon && <PixelIcon name={tab.icon} size={15} />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div
        className={
          variant === 'folder'
            ? 'p-4 bg-[var(--px-surface)] border-2 border-t-0 border-[var(--px-border)] rounded-b-[5px] shadow-[0_4px_0_0_var(--px-shadow-card)]'
            : 'p-4 bg-[var(--px-surface)] border-2 border-[var(--px-border)] rounded-[5px] shadow-[0_4px_0_0_var(--px-shadow-card)]'
        }
      >
        {activeTab?.children}
      </div>
    </div>
  );
};

/* ==========================================================================
   21. PixelTable — Pixel Ledger Data Table with Sorting & Loading State
   ========================================================================== */
export interface PixelTableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  width?: string | number;
  sortable?: boolean;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}

export interface PixelTableProps<T = Record<string, unknown>> {
  columns: PixelTableColumn<T>[];
  dataSource: T[];
  rowKey?: string;
  striped?: boolean;
  loading?: boolean;
}

export function PixelTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'key',
  striped = true,
  loading = false,
}: PixelTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return dataSource;
    return [...dataSource].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') {
        return asc ? va - vb : vb - va;
      }
      return asc
        ? String(va ?? '').localeCompare(String(vb ?? ''))
        : String(vb ?? '').localeCompare(String(va ?? ''));
    });
  }, [dataSource, sortKey, asc]);

  return (
    <div className="relative overflow-x-auto border-2 border-[var(--px-border)] rounded-[5px] bg-[var(--px-surface)] shadow-[0_4px_0_0_var(--px-shadow-card)]">
      {loading && (
        <div className="absolute inset-0 z-10 bg-[var(--px-surface)]/75 backdrop-blur-[1px] flex items-center justify-center gap-2 font-bold text-sm">
          <PixelIcon name="sparkles" size={20} className="animate-spin" />
          <span>读取海岛图鉴数据中...</span>
        </div>
      )}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--px-surface-warm)] border-b-2 border-[var(--px-border)]">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                onClick={() => {
                  if (!col.sortable) return;
                  if (sortKey === col.key) setAsc((p) => !p);
                  else {
                    setSortKey(col.key);
                    setAsc(true);
                  }
                }}
                className={`px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[var(--px-ink)] ${
                  col.sortable ? 'cursor-pointer select-none hover:bg-[#ebe1c5]' : ''
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>{col.title}</span>
                  {col.sortable && (
                    <span className="text-[10px] text-[var(--px-primary-active)]">
                      {sortKey === col.key ? (asc ? '▲' : '▼') : '⇅'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#dfd5be]">
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-[var(--px-ink-muted)]">
                <div className="flex flex-col items-center gap-2">
                  <PixelIcon name="island" size={28} />
                  <span className="text-xs font-bold">暂无岛屿记录</span>
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr
                key={String(row[rowKey] ?? idx)}
                className={`transition-colors hover:bg-[var(--px-primary-soft)]/60 ${
                  striped && idx % 2 === 1 ? 'bg-[#f8f3e3]/80' : ''
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2.5 font-medium text-[var(--px-ink-body)]">
                    {col.render ? col.render(row[col.key], row, idx) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ==========================================================================
   22. PixelTooltip — Speech Bubble Pixel Tooltip
   ========================================================================== */
export interface PixelTooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'dark' | 'island';
  children: React.ReactNode;
}

export const PixelTooltip: React.FC<PixelTooltipProps> = ({
  content,
  placement = 'top',
  variant = 'dark',
  children,
}) => {
  const [open, setOpen] = useState(false);

  const posMap: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap px-3 py-1.5 text-xs font-bold border-2 rounded-[4px] animate-px-zoom ${
            posMap[placement]
          } ${
            variant === 'island'
              ? 'bg-[#fffbe8] text-[var(--px-ink)] border-[var(--px-border)] shadow-[0_3px_0_0_var(--px-shadow-card)]'
              : 'bg-[#231c18] text-[#fff9e6] border-[#614f3d] shadow-[0_3px_0_0_rgba(0,0,0,0.35)]'
          }`}
        >
          {content}
        </span>
      )}
    </span>
  );
};

/* ==========================================================================
   23. PixelClock, PixelCountUp & PixelCountdown — HUD Time & Score Widgets
   ========================================================================== */
export const PixelClock: React.FC<{ size?: PixelSize }> = ({ size = 'md' }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#fffdf0] border-2 border-[var(--px-border)] rounded-[5px] shadow-[0_4px_0_0_var(--px-shadow-card)]">
      <PixelIcon name={now.getHours() >= 6 && now.getHours() < 18 ? 'sun' : 'moon'} size={22} />
      <div>
        <div className="text-[10px] font-bold text-[var(--px-ink-muted)] px-font-display">
          {now.getMonth() + 1}/{now.getDate()} · {days[now.getDay()]}
        </div>
        <div
          className={`font-black text-[var(--px-ink)] px-font-display tracking-wider ${
            size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg'
          }`}
        >
          {pad(now.getHours())}
          <span className="animate-px-blink mx-0.5 text-[var(--px-primary)]">:</span>
          {pad(now.getMinutes())}
          <span className="text-xs ml-1 text-[var(--px-ink-muted)]">{pad(now.getSeconds())}</span>
        </div>
      </div>
    </div>
  );
};

export interface PixelCountUpProps {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  celebrate?: boolean;
}

export const PixelCountUp: React.FC<PixelCountUpProps> = ({
  start = 0,
  end,
  duration = 1200,
  prefix = '',
  suffix = '',
  celebrate = true,
}) => {
  const [val, setVal] = useState(start);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);

  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-[#fff9db] border-2 border-[#7a5912] rounded-[5px] shadow-[0_4px_0_0_#cfa932]">
      <PixelIcon name="coin" size={20} />
      <span className="text-xl font-black text-[#4a3305] px-font-display">
        {prefix}
        {val.toLocaleString()}
        {suffix}
      </span>
      {celebrate && done && (
        <span className="ml-1 px-1.5 py-0.5 text-[10px] font-black bg-[#ff6b8b] text-white border border-[#591628] rounded-[3px] px-font-display">
          MAX!
        </span>
      )}
    </div>
  );
};

export const PixelCountdown: React.FC<{ seconds?: number; label?: string }> = ({
  seconds = 5420,
  label = '海岛烟花大会倒计时',
}) => {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(left / 3600)).padStart(2, '0');
  const mins = String(Math.floor((left % 3600) / 60)).padStart(2, '0');
  const secs = String(left % 60).padStart(2, '0');

  return (
    <div className="inline-flex flex-col gap-1.5">
      {label && <span className="text-xs font-bold text-[var(--px-ink-muted)]">{label}</span>}
      <div className="inline-flex items-center gap-1.5 px-font-display">
        {[hrs, mins, secs].map((unit, i) => (
          <React.Fragment key={i}>
            <span className="px-2.5 py-1.5 bg-[#2a211b] text-[#ffe169] border-2 border-[#5c4328] rounded-[4px] text-base font-black shadow-[0_3px_0_0_#cabfa6]">
              {unit}
            </span>
            {i < 2 && <span className="font-black text-[var(--px-ink)]">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
