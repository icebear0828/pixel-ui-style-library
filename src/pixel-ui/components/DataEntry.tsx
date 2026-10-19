import React, { useEffect, useRef, useState } from 'react';
import { PixelSize } from '../types';
import { PixelIcon, PixelIconName } from '../icons/PixelIcons';

/* ==========================================================================
   8. PixelInput — Inset Stepped Pixel Text Input
   ========================================================================== */
export interface PixelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: PixelSize;
  allowClear?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  status?: 'default' | 'error' | 'warning';
  onValueChange?: (value: string) => void;
}

export const PixelInput: React.FC<PixelInputProps> = ({
  size = 'md',
  allowClear = false,
  prefix,
  suffix,
  status = 'default',
  disabled = false,
  value,
  defaultValue = '',
  onChange,
  onValueChange,
  className = '',
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [innerVal, setInnerVal] = useState(String(defaultValue));
  const [focused, setFocused] = useState(false);
  const currentValue = isControlled ? String(value) : innerVal;

  const sizeMap: Record<PixelSize, string> = {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const borderColor =
    status === 'error'
      ? 'var(--px-danger)'
      : status === 'warning'
      ? 'var(--px-warning)'
      : focused
      ? '#d9a400'
      : 'var(--px-border)';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerVal(e.target.value);
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  const handleClear = () => {
    if (!isControlled) setInnerVal('');
    onValueChange?.('');
  };

  return (
    <div
      style={{
        borderColor,
        background: disabled ? 'var(--px-input-disabled)' : 'var(--px-input-bg)',
        boxShadow: focused
          ? '0 0 0 3px rgba(255, 204, 0, 0.42), inset 0 2px 0 rgba(92, 67, 40, 0.1)'
          : 'inset 0 2px 0 rgba(92, 67, 40, 0.12), 0 2px 0 rgba(202, 191, 166, 0.7)',
      }}
      className={`inline-flex items-center gap-2 w-full border-2 rounded-[4px] transition-all ${sizeMap[size]} ${
        disabled ? 'opacity-65 cursor-not-allowed' : ''
      } ${className}`}
    >
      {prefix && <span className="text-[var(--px-ink-muted)] shrink-0 flex items-center">{prefix}</span>}
      <input
        disabled={disabled}
        value={currentValue}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        className="w-full bg-transparent outline-none text-[var(--px-ink)] placeholder:text-[var(--px-ink-disabled)] font-semibold"
        {...rest}
      />
      {allowClear && currentValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear input"
          className="w-4 h-4 rounded-[2px] bg-[#dcd2bd] hover:bg-[#c8baa0] text-[var(--px-ink)] inline-flex items-center justify-center cursor-pointer shrink-0"
        >
          <PixelIcon name="close" size={10} />
        </button>
      )}
      {suffix && <span className="text-[var(--px-ink-muted)] shrink-0 flex items-center">{suffix}</span>}
    </div>
  );
};

/* ==========================================================================
   9. PixelSwitch — 8-Bit Snap Toggle Switch
   ========================================================================== */
export interface PixelSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
  checkedText?: string;
  uncheckedText?: string;
  disabled?: boolean;
  className?: string;
}

export const PixelSwitch: React.FC<PixelSwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  size = 'md',
  checkedText,
  uncheckedText,
  disabled = false,
  className = '',
}) => {
  const isControlled = checked !== undefined;
  const [inner, setInner] = useState(defaultChecked);
  const isOn = isControlled ? checked : inner;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const dims =
    size === 'sm'
      ? { track: 'w-11 h-6', thumb: 'w-4 h-4', move: isOn ? 'translate-x-5' : 'translate-x-0.5' }
      : { track: 'w-14 h-7', thumb: 'w-5 h-5', move: isOn ? 'translate-x-7' : 'translate-x-0.5' };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      style={{
        background: isOn ? 'var(--px-success)' : '#d9cfb8',
        borderColor: isOn ? '#27590e' : 'var(--px-border)',
        boxShadow: isOn
          ? '0 3px 0 0 var(--px-success-shadow)'
          : '0 3px 0 0 #b8ac94',
      }}
      className={`relative inline-flex items-center border-2 rounded-[4px] transition-colors select-none ${
        dims.track
      } ${disabled ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {checkedText && isOn && (
        <span className="absolute left-1.5 text-[10px] font-black text-white px-font-display">
          {checkedText}
        </span>
      )}
      {uncheckedText && !isOn && (
        <span className="absolute right-1.5 text-[10px] font-black text-[#5c4328] px-font-display">
          {uncheckedText}
        </span>
      )}
      <span
        className={`inline-block bg-white border-2 border-[#4d351e] rounded-[2px] transition-transform duration-150 ${dims.thumb} ${dims.move}`}
      />
    </button>
  );
};

/* ==========================================================================
   10. PixelSelect — Searchable Pixel Dropdown Menu
   ========================================================================== */
export interface PixelSelectOption {
  label: string;
  value: string;
  icon?: PixelIconName;
  disabled?: boolean;
}

export interface PixelSelectProps {
  options: PixelSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  size?: PixelSize;
  disabled?: boolean;
  className?: string;
}

export const PixelSelect: React.FC<PixelSelectProps> = ({
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = '请选择海岛物品...',
  showSearch = false,
  allowClear = false,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const isControlled = value !== undefined;
  const [innerVal, setInnerVal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  const selectedValue = isControlled ? value : innerVal;
  const selectedOpt = options.find((o) => o.value === selectedValue);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const sizeMap: Record<PixelSize, string> = {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const selectOption = (val: string) => {
    if (!isControlled) setInnerVal(val);
    onChange?.(val);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={wrapRef} className={`relative inline-block w-full min-w-[180px] ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          background: disabled ? 'var(--px-input-disabled)' : 'var(--px-input-bg)',
          boxShadow: open
            ? '0 0 0 3px rgba(255, 204, 0, 0.45)'
            : '0 3px 0 0 var(--px-shadow-card)',
        }}
        className={`w-full flex items-center justify-between gap-2 border-2 border-[var(--px-border)] rounded-[4px] font-semibold text-left ${
          sizeMap[size]
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="inline-flex items-center gap-2 truncate">
          {selectedOpt ? (
            <>
              {selectedOpt.icon && <PixelIcon name={selectedOpt.icon} size={16} />}
              <span className="text-[var(--px-ink)]">{selectedOpt.label}</span>
            </>
          ) : (
            <span className="text-[var(--px-ink-disabled)]">{placeholder}</span>
          )}
        </span>
        <span className="inline-flex items-center gap-1 shrink-0">
          {allowClear && selectedOpt && !disabled && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                selectOption('');
              }}
              className="w-4 h-4 rounded-[2px] bg-[#dcd2bd] hover:bg-[#c8baa0] inline-flex items-center justify-center"
            >
              <PixelIcon name="close" size={10} />
            </span>
          )}
          <span className="text-[10px] text-[var(--px-ink-muted)]">
            {open ? '▲' : '▼'}
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[var(--px-surface)] border-2 border-[var(--px-border)] rounded-[4px] shadow-[0_6px_0_0_rgba(77,53,30,0.24)] p-1.5 animate-px-zoom">
          {showSearch && (
            <div className="mb-1.5">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="输入关键字筛选..."
                className="w-full px-2.5 py-1 text-xs bg-white border-2 border-[#c7b89c] rounded-[3px] outline-none font-semibold"
              />
            </div>
          )}
          <div className="max-h-52 overflow-y-auto flex flex-col gap-0.5">
            {filtered.length === 0 ? (
              <div className="py-4 text-center text-xs text-[var(--px-ink-muted)]">
                暂无匹配海岛条目
              </div>
            ) : (
              filtered.map((opt) => {
                const active = opt.value === selectedValue;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => !opt.disabled && selectOption(opt.value)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-bold rounded-[3px] text-left transition-colors ${
                      opt.disabled
                        ? 'opacity-45 cursor-not-allowed'
                        : active
                        ? 'bg-[var(--px-primary)] text-white cursor-pointer'
                        : 'text-[var(--px-ink)] hover:bg-[var(--px-surface-warm)] cursor-pointer'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {opt.icon && <PixelIcon name={opt.icon} size={15} />}
                      <span>{opt.label}</span>
                    </span>
                    {active && <PixelIcon name="check" size={13} color="#ffffff" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   11. PixelCheckbox & PixelCheckboxGroup
   ========================================================================== */
export interface PixelCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  size?: PixelSize;
  disabled?: boolean;
}

export const PixelCheckbox: React.FC<PixelCheckboxProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
}) => {
  const isControlled = checked !== undefined;
  const [inner, setInner] = useState(defaultChecked);
  const isChecked = isControlled ? checked : inner;

  const boxSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <label
      className={`inline-flex items-center gap-2 select-none font-semibold text-sm ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          const next = !isChecked;
          if (!isControlled) setInner(next);
          onChange?.(next);
        }}
        style={{
          background: isChecked ? 'var(--px-primary)' : 'var(--px-input-bg)',
          boxShadow: isChecked
            ? '0 2px 0 0 var(--px-primary-shadow)'
            : 'inset 0 2px 0 rgba(92,67,40,0.12)',
        }}
        className={`inline-flex items-center justify-center border-2 border-[var(--px-border)] rounded-[3px] transition-colors ${boxSize}`}
      >
        {isChecked && (
          <PixelIcon
            name="check"
            size={size === 'sm' ? 11 : size === 'lg' ? 16 : 13}
            color="#ffffff"
          />
        )}
      </button>
      {label && <span className="text-[var(--px-ink)]">{label}</span>}
    </label>
  );
};

export interface PixelCheckboxGroupProps {
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  direction?: 'horizontal' | 'vertical';
  size?: PixelSize;
}

export const PixelCheckboxGroup: React.FC<PixelCheckboxGroupProps> = ({
  options,
  value,
  defaultValue = [],
  onChange,
  direction = 'horizontal',
  size = 'md',
}) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string[]>(defaultValue);
  const current = isControlled ? value : inner;

  const toggleItem = (itemVal: string, checked: boolean) => {
    const next = checked ? [...current, itemVal] : current.filter((v) => v !== itemVal);
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div
      className={`flex ${
        direction === 'vertical' ? 'flex-col gap-2.5' : 'flex-wrap items-center gap-4'
      }`}
    >
      {options.map((opt) => (
        <PixelCheckbox
          key={opt.value}
          label={opt.label}
          size={size}
          disabled={opt.disabled}
          checked={current.includes(opt.value)}
          onChange={(c) => toggleItem(opt.value, c)}
        />
      ))}
    </div>
  );
};

/* ==========================================================================
   12. PixelRadioGroup — Pixel Diamond / Capsule Button Radio Selector
   ========================================================================== */
export interface PixelRadioGroupProps {
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  optionType?: 'default' | 'button';
  size?: PixelSize;
}

export const PixelRadioGroup: React.FC<PixelRadioGroupProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  optionType = 'default',
  size = 'md',
}) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value ?? '');
  const current = isControlled ? value : inner;

  const pick = (val: string) => {
    if (!isControlled) setInner(val);
    onChange?.(val);
  };

  if (optionType === 'button') {
    return (
      <div className="inline-flex flex-wrap p-1 gap-1 bg-[var(--px-surface-sunk)] border-2 border-[var(--px-border)] rounded-[4px]">
        {options.map((opt) => {
          const active = opt.value === current;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => !opt.disabled && pick(opt.value)}
              style={
                active
                  ? {
                      background: 'var(--px-primary)',
                      color: '#fff',
                      boxShadow: '0 2px 0 0 var(--px-primary-shadow)',
                    }
                  : undefined
              }
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-all ${
                opt.disabled
                  ? 'opacity-45 cursor-not-allowed'
                  : active
                  ? 'border border-[var(--px-ink-strong)]'
                  : 'text-[var(--px-ink-body)] hover:bg-[var(--px-surface)] cursor-pointer'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  const outerSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div className="flex flex-wrap items-center gap-4">
      {options.map((opt) => {
        const active = opt.value === current;
        return (
          <label
            key={opt.value}
            onClick={() => !opt.disabled && pick(opt.value)}
            className={`inline-flex items-center gap-2 text-sm font-semibold select-none ${
              opt.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span
              className={`inline-flex items-center justify-center border-2 border-[var(--px-border)] rounded-full bg-[var(--px-input-bg)] ${outerSize}`}
            >
              {active && (
                <span className="w-2.5 h-2.5 bg-[var(--px-primary)] border border-[var(--px-ink-strong)]" />
              )}
            </span>
            <span className="text-[var(--px-ink)]">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   13. PixelRate — Interactive 8-Bit Star / Heart / Coin Rating Bar
   ========================================================================== */
export interface PixelRateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  character?: 'star' | 'heart' | 'coin' | 'apple';
  size?: PixelSize;
  readonly?: boolean;
  onChange?: (val: number) => void;
}

export const PixelRate: React.FC<PixelRateProps> = ({
  value,
  defaultValue = 4,
  count = 5,
  character = 'star',
  size = 'md',
  readonly = false,
  onChange,
}) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const [hoverVal, setHoverVal] = useState<number | null>(null);

  const current = isControlled ? value : inner;
  const displayVal = hoverVal !== null ? hoverVal : current;
  const pxSize = size === 'sm' ? 18 : size === 'lg' ? 30 : 24;

  return (
    <div
      className="inline-flex items-center gap-1.5 select-none"
      onMouseLeave={() => !readonly && setHoverVal(null)}
    >
      {Array.from({ length: count }, (_, idx) => {
        const score = idx + 1;
        const lit = score <= displayVal;
        return (
          <button
            key={score}
            type="button"
            disabled={readonly}
            onMouseEnter={() => !readonly && setHoverVal(score)}
            onClick={() => {
              if (readonly) return;
              const next = current === score ? 0 : score;
              if (!isControlled) setInner(next);
              onChange?.(next);
            }}
            className={`p-0.5 transition-transform ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-120 active:scale-95'
            } ${lit ? 'opacity-100' : 'opacity-30 grayscale'}`}
          >
            <PixelIcon name={character} size={pxSize} />
          </button>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   14. PixelSlider — Stepped RPG Stat Range Slider
   ========================================================================== */
export interface PixelSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  disabled?: boolean;
  onChange?: (val: number) => void;
  className?: string;
}

export const PixelSlider: React.FC<PixelSliderProps> = ({
  value,
  defaultValue = 65,
  min = 0,
  max = 100,
  step = 5,
  showValue = true,
  disabled = false,
  onChange,
  className = '',
}) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const current = isControlled ? value : inner;
  const pct = Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));

  return (
    <div className={`flex items-center gap-3 w-full ${className}`}>
      <div className="relative flex-1 h-4 bg-[var(--px-surface-sunk)] border-2 border-[var(--px-border)] rounded-[3px]">
        <div
          style={{ width: `${pct}%`, background: 'var(--px-primary)' }}
          className="h-full transition-all duration-75"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={current}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!isControlled) setInner(v);
            onChange?.(v);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed m-0"
        />
        <span
          style={{ left: `calc(${pct}% - 8px)` }}
          className="pointer-events-none absolute -top-1.5 w-4 h-6 bg-white border-2 border-[var(--px-ink-strong)] shadow-[0_2px_0_0_rgba(0,0,0,0.25)]"
        />
      </div>
      {showValue && (
        <span className="min-w-[44px] text-center px-2 py-0.5 text-xs font-bold bg-[var(--px-surface-warm)] border-2 border-[var(--px-border)] rounded-[3px] px-font-display">
          {current}
        </span>
      )}
    </div>
  );
};
