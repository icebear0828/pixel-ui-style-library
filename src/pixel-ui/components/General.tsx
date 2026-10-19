import React, { useEffect, useState } from 'react';
import { PIXEL_PALETTE, PixelColor, PixelSize } from '../types';
import { PixelIcon, PixelIconName } from '../icons/PixelIcons';

/* ==========================================================================
   1. PixelButton — 3D Stepped Pixel Game Button
   ========================================================================== */
export type PixelButtonVariant =
  | 'primary'
  | 'default'
  | 'dashed'
  | 'ghost'
  | 'danger'
  | 'success';

export interface PixelButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: PixelButtonVariant;
  htmlType?: 'button' | 'submit' | 'reset';
  size?: PixelSize;
  icon?: PixelIconName | React.ReactNode;
  loading?: boolean;
  block?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'default',
  htmlType = 'button',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  block = false,
  className = '',
  children,
  onClick,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const sizeMap: Record<PixelSize, string> = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };

  const getVariantStyles = (): React.CSSProperties => {
    if (isDisabled) {
      return {
        background: '#ebe5d5',
        color: '#a99b84',
        borderColor: '#b8aa93',
        boxShadow: '0 2px 0 0 #cfc4b0',
      };
    }
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--px-primary)',
          color: '#ffffff',
          borderColor: 'var(--px-ink-strong)',
          boxShadow: '0 4px 0 0 var(--px-primary-shadow), inset 0 2px 0 0 rgba(255,255,255,0.35)',
          textShadow: '0 1px 0 rgba(0,0,0,0.28)',
        };
      case 'success':
        return {
          background: 'var(--px-success)',
          color: '#ffffff',
          borderColor: '#254d0c',
          boxShadow: '0 4px 0 0 var(--px-success-shadow), inset 0 2px 0 0 rgba(255,255,255,0.35)',
          textShadow: '0 1px 0 rgba(0,0,0,0.28)',
        };
      case 'danger':
        return {
          background: 'var(--px-danger)',
          color: '#ffffff',
          borderColor: '#591616',
          boxShadow: '0 4px 0 0 var(--px-danger-shadow), inset 0 2px 0 0 rgba(255,255,255,0.35)',
          textShadow: '0 1px 0 rgba(0,0,0,0.28)',
        };
      case 'dashed':
        return {
          background: 'var(--px-surface)',
          color: 'var(--px-ink)',
          borderColor: 'var(--px-border)',
          borderStyle: 'dashed',
          boxShadow: '0 3px 0 0 var(--px-shadow-card)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--px-ink)',
          borderColor: 'transparent',
          boxShadow: 'none',
        };
      case 'default':
      default:
        return {
          background: 'var(--px-surface)',
          color: 'var(--px-ink)',
          borderColor: 'var(--px-border)',
          boxShadow: '0 4px 0 0 var(--px-shadow-btn), inset 0 2px 0 0 rgba(255,255,255,0.85)',
        };
    }
  };

  return (
    <button
      type={htmlType}
      disabled={isDisabled}
      onClick={onClick}
      style={{ ...getVariantStyles(), ...style }}
      className={[
        'relative inline-flex items-center justify-center font-bold select-none border-2 rounded-[4px]',
        'transition-transform duration-75 outline-none focus-visible:ring-2 focus-visible:ring-[#ffcc00] focus-visible:ring-offset-2',
        isDisabled
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:-translate-y-[1px] active:translate-y-[3px] active:!shadow-none',
        variant === 'ghost' && !isDisabled ? 'hover:bg-[#efe7cc]/70' : '',
        block ? 'w-full flex' : '',
        sizeMap[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading ? (
        <span className="inline-grid grid-cols-2 gap-[2px] w-3.5 h-3.5 animate-spin">
          <span className="bg-current" />
          <span className="bg-current opacity-40" />
          <span className="bg-current opacity-70" />
          <span className="bg-current opacity-20" />
        </span>
      ) : typeof icon === 'string' ? (
        <PixelIcon
          name={icon as PixelIconName}
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
        />
      ) : (
        icon
      )}
      {children && <span className="tracking-wide">{children}</span>}
    </button>
  );
};

/* ==========================================================================
   2. PixelTitle — Swallowtail Pixel Ribbon Banner
   ========================================================================== */
export interface PixelTitleProps {
  children: React.ReactNode;
  color?: PixelColor;
  size?: PixelSize;
  icon?: PixelIconName;
  subtitle?: string;
  className?: string;
}

export const PixelTitle: React.FC<PixelTitleProps> = ({
  children,
  color = 'mint',
  size = 'md',
  icon,
  subtitle,
  className = '',
}) => {
  const palette = PIXEL_PALETTE[color] || PIXEL_PALETTE.mint;
  const sizeClasses: Record<PixelSize, string> = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-lg',
    lg: 'px-8 py-2.5 text-2xl',
  };

  return (
    <div className={`inline-flex flex-col items-start mb-3 ${className}`}>
      <div className="relative inline-flex items-center pl-4 pr-4">
        {/* Left Pixel Swallowtail Wing */}
        <div
          aria-hidden="true"
          className="w-5 h-[calc(100%-6px)] translate-y-[4px] border-2 border-r-0 shrink-0"
          style={{
            background: palette.shadow,
            borderColor: palette.border,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 42% 50%)',
          }}
        />
        {/* Front Ribbon Banner */}
        <div
          className={`relative z-10 inline-flex items-center gap-2.5 font-extrabold border-2 rounded-[3px] tracking-wide ${sizeClasses[size]}`}
          style={{
            background: palette.bg,
            color: palette.text,
            borderColor: palette.border,
            boxShadow: `0 4px 0 0 ${palette.shadow}, inset 0 2px 0 0 rgba(255,255,255,0.45)`,
          }}
        >
          {icon && <PixelIcon name={icon} size={size === 'lg' ? 22 : size === 'sm' ? 15 : 18} />}
          <span>{children}</span>
        </div>
        {/* Right Pixel Swallowtail Wing */}
        <div
          aria-hidden="true"
          className="w-5 h-[calc(100%-6px)] translate-y-[4px] border-2 border-l-0 shrink-0"
          style={{
            background: palette.shadow,
            borderColor: palette.border,
            clipPath: 'polygon(0 0, 100% 0, 58% 50%, 100% 100%, 0 100%)',
          }}
        />
      </div>
      {subtitle && (
        <p className="mt-2 ml-4 text-xs font-medium text-[var(--px-ink-body)]">{subtitle}</p>
      )}
    </div>
  );
};

/* ==========================================================================
   3. PixelDivider — 5 Decorative Island Pixel Dividers
   ========================================================================== */
export type PixelDividerVariant = 'dashed' | 'coins' | 'leaves' | 'hearts' | 'stars';

export interface PixelDividerProps {
  variant?: PixelDividerVariant;
  label?: string;
  className?: string;
}

export const PixelDivider: React.FC<PixelDividerProps> = ({
  variant = 'dashed',
  label,
  className = '',
}) => {
  const iconMap: Record<Exclude<PixelDividerVariant, 'dashed'>, PixelIconName> = {
    coins: 'coin',
    leaves: 'leaf',
    hearts: 'heart',
    stars: 'star',
  };

  return (
    <div className={`w-full flex items-center gap-3 my-4 select-none ${className}`} role="separator">
      <div className="flex-1 border-t-2 border-dashed border-[#c7b89c]" />
      {variant !== 'dashed' || label ? (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-[var(--px-surface-warm)] border-2 border-[#c7b89c] text-xs font-bold text-[var(--px-ink-body)]">
          {variant !== 'dashed' && (
            <>
              <PixelIcon name={iconMap[variant]} size={13} />
              {!label && <PixelIcon name={iconMap[variant]} size={13} />}
              {!label && <PixelIcon name={iconMap[variant]} size={13} />}
            </>
          )}
          {label && <span>{label}</span>}
          {variant !== 'dashed' && label && <PixelIcon name={iconMap[variant]} size={13} />}
        </div>
      ) : (
        <span className="w-2 h-2 bg-[#c7b89c] rotate-45" />
      )}
      <div className="flex-1 border-t-2 border-dashed border-[#c7b89c]" />
    </div>
  );
};

/* ==========================================================================
   4. PixelBackground — Zero-Asset Pure CSS Pixel Wallpaper Container
   ========================================================================== */
export type PixelBackgroundPattern =
  | 'cream-dots'
  | 'meadow-grid'
  | 'sprinkles'
  | 'starry-night'
  | 'sand-dither'
  | 'mint-polka';

export interface PixelBackgroundProps {
  pattern?: PixelBackgroundPattern;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PATTERN_STYLES: Record<PixelBackgroundPattern, React.CSSProperties> = {
  'cream-dots': {
    backgroundColor: '#faf6e8',
    backgroundImage:
      'radial-gradient(#d5c7ab 2px, transparent 2px), radial-gradient(#e4d9c0 2px, #faf6e8 2px)',
    backgroundSize: '24px 24px',
    backgroundPosition: '0 0, 12px 12px',
  },
  'meadow-grid': {
    backgroundColor: '#76c893',
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.16) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px)',
    backgroundSize: '20px 20px',
    color: '#163c24',
  },
  sprinkles: {
    backgroundColor: '#fff9ed',
    backgroundImage:
      'radial-gradient(#ff8da1 2px, transparent 2px), radial-gradient(#56cfe1 2px, transparent 2px), radial-gradient(#ffd166 2.2px, transparent 2.2px)',
    backgroundSize: '36px 36px',
    backgroundPosition: '0 0, 14px 18px, 26px 8px',
  },
  'starry-night': {
    backgroundColor: '#1a1b2e',
    backgroundImage:
      'radial-gradient(#ffe66d 1.6px, transparent 1.6px), radial-gradient(#72efdd 1.4px, transparent 1.4px), radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    backgroundPosition: '4px 6px, 24px 28px, 38px 14px',
    color: '#f8fafc',
  },
  'sand-dither': {
    backgroundColor: '#f6e7c1',
    backgroundImage:
      'linear-gradient(45deg, #ebd6a7 25%, transparent 25%), linear-gradient(-45deg, #ebd6a7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ebd6a7 75%), linear-gradient(-45deg, transparent 75%, #ebd6a7 75%)',
    backgroundSize: '12px 12px',
    backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0',
  },
  'mint-polka': {
    backgroundColor: '#d9f8f2',
    backgroundImage: 'radial-gradient(#7be0ce 2.5px, transparent 2.5px)',
    backgroundSize: '20px 20px',
  },
};

export const PixelBackground: React.FC<PixelBackgroundProps> = ({
  pattern = 'cream-dots',
  children,
  className = '',
  style,
}) => {
  return (
    <div
      className={`relative border-2 border-[var(--px-border)] rounded-[4px] p-5 ${className}`}
      style={{ ...PATTERN_STYLES[pattern], ...style }}
    >
      {children}
    </div>
  );
};

/* ==========================================================================
   5. PixelTypewriter — RPG Dialogue Typewriter Component
   ========================================================================== */
export interface PixelTypewriterProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const PixelTypewriter: React.FC<PixelTypewriterProps> = ({
  text,
  speed = 42,
  cursor = true,
  onComplete,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) {
      onComplete?.();
      return;
    }
    const timer = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, speed);
    return () => window.clearTimeout(timer);
  }, [index, text, speed, onComplete]);

  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span>{text.slice(0, index)}</span>
      {cursor && (
        <span
          aria-hidden="true"
          className="inline-block text-[10px] text-[var(--px-primary-active)] animate-px-blink select-none"
        >
          ▼
        </span>
      )}
    </span>
  );
};

/* ==========================================================================
   6. PixelCodeBlock — Warm Dark Espresso Syntax-Highlighted Code Block
   ========================================================================== */
export interface PixelCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

const highlightLine = (line: string): React.ReactNode[] => {
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*')) {
    return [
      <span key="c" style={{ color: '#8a7a68', fontStyle: 'italic' }}>
        {line}
      </span>,
    ];
  }

  const regex =
    /('[^']*'|"[^"]*"|`[^`]*`|\b(?:import|from|export|const|let|function|return|interface|type|async|await|npm|npx|install|run|true|false)\b|<\/?[A-Z][A-Za-z0-9.]*|--[a-z0-9-]+|#[0-9a-fA-F]{3,8}\b)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    const token = match[0];
    let color = '#e8d5bc';
    if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
      color = '#a8d4a0';
    } else if (token.startsWith('<')) {
      color = '#7be0ce';
    } else if (token.startsWith('--')) {
      color = '#f6d57a';
    } else if (token.startsWith('#')) {
      color = '#8cc0f0';
    } else {
      color = '#f3a66e';
    }
    parts.push(
      <span key={k++} style={{ color }}>
        {token}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }
  return parts;
};

export const PixelCodeBlock: React.FC<PixelCodeBlockProps> = ({
  code,
  language = 'tsx',
  title,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className={`rounded-[6px] overflow-hidden border-2 border-[#473729] shadow-[0_4px_0_0_#1e1610] ${className}`}
      style={{ background: '#261d15' }}
    >
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#33271d] border-b-2 border-[#473729]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#ff6b6b] inline-block" />
          <span className="w-2.5 h-2.5 bg-[#ffd438] inline-block" />
          <span className="w-2.5 h-2.5 bg-[#6be075] inline-block" />
          <span className="ml-1.5 text-xs font-bold text-[#c4b199] px-font-display uppercase">
            {title || language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-0.5 text-xs font-bold rounded-[3px] bg-[#453528] hover:bg-[#574434] text-[#f3e5d0] border border-[#6b5642] cursor-pointer transition-colors"
        >
          {copied ? '✓ 已复制' : '复制代码'}
        </button>
      </div>
      <pre className="m-0 p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-[#e8d5bc]">
        <code>
          {code.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {highlightLine(line)}
              {i < arr.length - 1 ? '\n' : ''}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
};

/* ==========================================================================
   7. PixelCursor — Custom Pixel Game Cursor Zone + Click Burst
   ========================================================================== */
export type PixelCursorType = 'glove' | 'sword' | 'wand';

export interface PixelCursorProps {
  cursorType?: PixelCursorType;
  children: React.ReactNode;
  className?: string;
}

const CURSOR_SVG_URI: Record<PixelCursorType, string> = {
  glove: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='2' y='1' width='3' height='8' fill='%233a2614'/%3E%3Crect x='3' y='2' width='2' height='9' fill='%23ffffff'/%3E%3Crect x='5' y='5' width='7' height='8' fill='%233a2614'/%3E%3Crect x='5' y='6' width='6' height='6' fill='%23fff8e7'/%3E%3Crect x='4' y='12' width='6' height='3' fill='%2319c8b9'/%3E%3C/svg%3E") 4 2, pointer`,
  sword: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='1' y='1' width='4' height='4' fill='%237bd5f5'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23aef0ff'/%3E%3Crect x='7' y='7' width='4' height='4' fill='%23ffd438'/%3E%3Crect x='10' y='10' width='4' height='4' fill='%238a5529'/%3E%3C/svg%3E") 2 2, pointer`,
  wand: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='2' y='1' width='3' height='7' fill='%23ffd438'/%3E%3Crect x='0' y='3' width='7' height='3' fill='%23ffd438'/%3E%3Crect x='6' y='6' width='3' height='3' fill='%23c394f6'/%3E%3Crect x='9' y='9' width='5' height='5' fill='%239c6234'/%3E%3C/svg%3E") 3 3, pointer`,
};

export const PixelCursor: React.FC<PixelCursorProps> = ({
  cursorType = 'glove',
  children,
  className = '',
}) => {
  const [clicks, setClicks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setClicks((prev) => [...prev.slice(-5), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => {
      setClicks((prev) => prev.filter((item) => item.id !== id));
    }, 550);
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: CURSOR_SVG_URI[cursorType] }}
      className={`relative overflow-hidden select-none ${className}`}
    >
      {children}
      {clicks.map((c) => (
        <span
          key={c.id}
          style={{ left: c.x - 10, top: c.y - 10 }}
          className="pointer-events-none absolute inline-flex items-center justify-center animate-ping"
        >
          <PixelIcon name="sparkles" size={20} />
        </span>
      ))}
    </div>
  );
};
