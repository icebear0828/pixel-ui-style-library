import React from 'react';
import * as ButtonStories from './Button.stories';
import ButtonRaw from './Button.stories.tsx?raw';
import * as TitleStories from './Title.stories';
import TitleRaw from './Title.stories.tsx?raw';
import * as InputStories from './Input.stories';
import InputRaw from './Input.stories.tsx?raw';
import * as SelectStories from './Select.stories';
import SelectRaw from './Select.stories.tsx?raw';
import * as SwitchStories from './Switch.stories';
import SwitchRaw from './Switch.stories.tsx?raw';
import * as CheckboxStories from './Checkbox.stories';
import CheckboxRaw from './Checkbox.stories.tsx?raw';
import * as SliderStories from './Slider.stories';
import SliderRaw from './Slider.stories.tsx?raw';
import * as RateStories from './Rate.stories';
import RateRaw from './Rate.stories.tsx?raw';
import * as CardStories from './Card.stories';
import CardRaw from './Card.stories.tsx?raw';
import * as TagStories from './Tag.stories';
import TagRaw from './Tag.stories.tsx?raw';
import * as AvatarStories from './Avatar.stories';
import AvatarRaw from './Avatar.stories.tsx?raw';
import * as TabsStories from './Tabs.stories';
import TabsRaw from './Tabs.stories.tsx?raw';
import * as TableStories from './Table.stories';
import TableRaw from './Table.stories.tsx?raw';
import * as ProgressStories from './Progress.stories';
import ProgressRaw from './Progress.stories.tsx?raw';
import * as ModalStories from './Modal.stories';
import ModalRaw from './Modal.stories.tsx?raw';
import * as IconStories from './Icon.stories';
import IconRaw from './Icon.stories.tsx?raw';
import * as DecorationStories from './Decoration.stories';
import DecorationRaw from './Decoration.stories.tsx?raw';

export interface ParsedArgType {
  name: string;
  controlType: 'select' | 'inline-radio' | 'boolean' | 'text' | 'range' | 'number' | 'color';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface ParsedStoryItem {
  id: string;
  exportName: string;
  name: string;
  args: Record<string, unknown>;
  render: (args: Record<string, unknown>) => React.ReactNode;
}

export interface ParsedStoryGroup {
  groupId: string;
  category: string;
  componentName: string;
  componentId: string;
  description: string;
  fileName: string;
  rawCode: string;
  defaultArgs: Record<string, unknown>;
  argTypes: ParsedArgType[];
  stories: ParsedStoryItem[];
  Component?: React.ComponentType<Record<string, unknown>>;
}

interface RawCsfModule {
  default: {
    title: string;
    component?: React.ComponentType<Record<string, unknown>>;
    args?: Record<string, unknown>;
    argTypes?: Record<string, Record<string, unknown>>;
    parameters?: {
      componentId?: string;
      docs?: { description?: { component?: string } };
    };
  };
  [exportName: string]: unknown;
}

const RAW_ENTRIES: Array<{ mod: unknown; raw: string; fileName: string }> = [
  { mod: ButtonStories, raw: ButtonRaw, fileName: 'src/stories/Button.stories.tsx' },
  { mod: TitleStories, raw: TitleRaw, fileName: 'src/stories/Title.stories.tsx' },
  { mod: InputStories, raw: InputRaw, fileName: 'src/stories/Input.stories.tsx' },
  { mod: SelectStories, raw: SelectRaw, fileName: 'src/stories/Select.stories.tsx' },
  { mod: SwitchStories, raw: SwitchRaw, fileName: 'src/stories/Switch.stories.tsx' },
  { mod: CheckboxStories, raw: CheckboxRaw, fileName: 'src/stories/Checkbox.stories.tsx' },
  { mod: SliderStories, raw: SliderRaw, fileName: 'src/stories/Slider.stories.tsx' },
  { mod: RateStories, raw: RateRaw, fileName: 'src/stories/Rate.stories.tsx' },
  { mod: CardStories, raw: CardRaw, fileName: 'src/stories/Card.stories.tsx' },
  { mod: TagStories, raw: TagRaw, fileName: 'src/stories/Tag.stories.tsx' },
  { mod: AvatarStories, raw: AvatarRaw, fileName: 'src/stories/Avatar.stories.tsx' },
  { mod: TabsStories, raw: TabsRaw, fileName: 'src/stories/Tabs.stories.tsx' },
  { mod: TableStories, raw: TableRaw, fileName: 'src/stories/Table.stories.tsx' },
  { mod: ProgressStories, raw: ProgressRaw, fileName: 'src/stories/Progress.stories.tsx' },
  { mod: ModalStories, raw: ModalRaw, fileName: 'src/stories/Modal.stories.tsx' },
  { mod: IconStories, raw: IconRaw, fileName: 'src/stories/Icon.stories.tsx' },
  { mod: DecorationStories, raw: DecorationRaw, fileName: 'src/stories/Decoration.stories.tsx' },
];

export const STORYBOOK_GROUPS: ParsedStoryGroup[] = RAW_ENTRIES.map(({ mod, raw, fileName }) => {
  const csf = mod as RawCsfModule;
  const meta = csf.default;
  const [category, componentName] = meta.title.includes('/')
    ? meta.title.split('/')
    : ['Components', meta.title];

  const groupId = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const defaultArgs = { ...(meta.args ?? {}) };
  const rawArgTypes = meta.argTypes ?? {};

  const argTypes: ParsedArgType[] = Object.entries(rawArgTypes).map(([propName, def]) => {
    const ctrl = def.control;
    let controlType: ParsedArgType['controlType'] = 'text';
    let min: number | undefined;
    let max: number | undefined;
    let step: number | undefined;

    if (typeof ctrl === 'string') {
      controlType = ctrl as ParsedArgType['controlType'];
    } else if (ctrl && typeof ctrl === 'object') {
      const obj = ctrl as { type?: string; min?: number; max?: number; step?: number };
      controlType = (obj.type as ParsedArgType['controlType']) || 'range';
      min = obj.min;
      max = obj.max;
      step = obj.step;
    }

    return {
      name: propName,
      controlType,
      options: Array.isArray(def.options) ? (def.options as string[]) : undefined,
      min,
      max,
      step,
      description: typeof def.description === 'string' ? def.description : undefined,
    };
  });

  const Comp = meta.component;

  const stories: ParsedStoryItem[] = Object.entries(csf)
    .filter(([key]) => key !== 'default' && key !== '__esModule')
    .map(([exportName, storyVal]) => {
      const sObj = (storyVal ?? {}) as {
        name?: string;
        args?: Record<string, unknown>;
        render?: (args: Record<string, unknown>) => React.ReactNode;
      };
      const mergedArgs = { ...defaultArgs, ...(sObj.args ?? {}) };
      const storyId = `${groupId}--${exportName.toLowerCase()}`;

      return {
        id: storyId,
        exportName,
        name: sObj.name || exportName,
        args: mergedArgs,
        render: (liveArgs: Record<string, unknown>) => {
          if (sObj.render) return sObj.render(liveArgs);
          if (Comp) return React.createElement(Comp, liveArgs);
          return null;
        },
      };
    });

  return {
    groupId,
    category,
    componentName,
    componentId: meta.parameters?.componentId ?? componentName.toLowerCase(),
    description: meta.parameters?.docs?.description?.component ?? '',
    fileName,
    rawCode: raw,
    defaultArgs,
    argTypes,
    stories,
    Component: Comp,
  };
});

export const findStoryGroupByComponentId = (componentId: string): ParsedStoryGroup | undefined =>
  STORYBOOK_GROUPS.find((g) => g.componentId === componentId) ?? STORYBOOK_GROUPS[0];
