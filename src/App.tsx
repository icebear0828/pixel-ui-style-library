import { useEffect, useState } from 'react';
import {
  PixelBackTop,
  PixelIcon,
  PixelNotificationHost,
} from './pixel-ui';
import {
  CATEGORY_LABELS,
  COMPONENT_CATALOG,
  ComponentCategoryKey,
} from './showcase/catalog';
import { ComponentDocPage } from './showcase/ComponentDocPage';
import { HomePage, THEME_PRESETS, ThemeKey } from './showcase/HomePage';
import { StorybookWorkbench } from './showcase/StorybookWorkbench';

type AppRoute =
  | { view: 'home' }
  | { view: 'component'; id: string }
  | { view: 'storybook'; storyComponentId: string };

const parseHashRoute = (): AppRoute => {
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  if (!raw) return { view: 'home' };
  if (raw.startsWith('storybook')) {
    const seg = raw.split('/')[1] || 'button';
    return { view: 'storybook', storyComponentId: seg };
  }
  const found = COMPONENT_CATALOG.find((c) => c.id === raw);
  if (found) return { view: 'component', id: found.id };
  return { view: 'home' };
};

export function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseHashRoute());
  const [theme, setTheme] = useState<ThemeKey>('mint');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-px-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onHash = () => setRoute(parseHashRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigateHome = () => {
    window.location.hash = '/';
    setRoute({ view: 'home' });
    setDrawerOpen(false);
    document.getElementById('px-main-scroll')?.scrollTo({ top: 0 });
  };

  const navigateComponent = (id: string) => {
    window.location.hash = `/${id}`;
    setRoute({ view: 'component', id });
    setDrawerOpen(false);
    document.getElementById('px-main-scroll')?.scrollTo({ top: 0 });
  };

  const navigateStorybook = (storyComponentId = 'button') => {
    window.location.hash = `/storybook/${storyComponentId}`;
    setRoute({ view: 'storybook', storyComponentId });
    setDrawerOpen(false);
  };

  /* Fullscreen Interactive Storybook 10 Workbench View */
  if (route.view === 'storybook') {
    return (
      <>
        <PixelNotificationHost />
        <StorybookWorkbench
          initialComponentId={route.storyComponentId}
          onBackToSite={navigateHome}
          onJumpComponentDoc={(id) => navigateComponent(id)}
        />
      </>
    );
  }

  /* Sidebar Menu Content (Modeled directly after animal-island-ui's 220px cozy sidebar) */
  const renderSidebarMenu = () => {
    const q = sidebarFilter.trim().toLowerCase();

    return (
      <div className="h-full flex flex-col px-sidebar-wallpaper select-none">
        {/* Top Brand Header */}
        <div
          onClick={navigateHome}
          className="px-4 pt-5 pb-3.5 border-b-2 border-[#e6decb] flex items-center justify-between cursor-pointer hover:bg-[#f5eed9]/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 flex items-center justify-center bg-[#e4faf7] border-2 border-[var(--px-border)] rounded-[5px] shadow-[0_2px_0_0_var(--px-shadow-card)]">
              <PixelIcon name="island" size={20} />
            </span>
            <div>
              <div className="text-sm font-black px-font-display text-[var(--px-ink)] leading-none">
                Pixel Island
              </div>
              <div className="text-[10px] font-bold text-[var(--px-ink-muted)] mt-1">
                UI Library v1.0.0
              </div>
            </div>
          </div>
        </div>

        {/* Mode Switcher: Overview Home + Interactive Storybook */}
        <div className="p-2.5 border-b border-[#ebe3d0] space-y-1.5">
          <button
            type="button"
            onClick={navigateHome}
            style={
              route.view === 'home'
                ? {
                    background: 'var(--px-sidebar-active)',
                    color: '#ffffff',
                    boxShadow: '0 2px 0 0 var(--px-sidebar-active-shadow)',
                  }
                : undefined
            }
            className={`w-full h-9 px-3 flex items-center gap-2.5 text-xs font-extrabold rounded-[6px] cursor-pointer transition-all ${
              route.view === 'home'
                ? 'border-2 border-[var(--px-ink-strong)]'
                : 'text-[#7c6b53] hover:bg-[var(--px-sidebar-hover)]'
            }`}
          >
            <PixelIcon name="home" size={16} />
            <span>总览首页 Overview</span>
          </button>

          <button
            type="button"
            onClick={() => navigateStorybook('button')}
            className="w-full h-9 px-3 flex items-center justify-between text-xs font-extrabold rounded-[6px] bg-[#fff0f6] hover:bg-[#ffe0ec] text-[#9d174d] border-2 border-[#be185d] shadow-[0_2px_0_0_#f472b6] cursor-pointer transition-transform active:translate-y-0.5"
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 inline-flex items-center justify-center bg-[#ff4785] text-white text-[10px] font-black rounded-[2px]">
                S
              </span>
              <span>Storybook 预览</span>
            </span>
            <span className="text-[10px]">↗</span>
          </button>

          {/* Quick Sidebar Filter */}
          <div className="pt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border-2 border-[#d8ceb8] rounded-[5px]">
              <PixelIcon name="search" size={12} />
              <input
                value={sidebarFilter}
                onChange={(e) => setSidebarFilter(e.target.value)}
                placeholder="快速检索组件..."
                className="w-full text-xs font-semibold bg-transparent outline-none placeholder:text-[#b5a78e]"
              />
            </div>
          </div>
        </div>

        {/* Categorized Component Navigation List */}
        <nav className="flex-1 overflow-y-auto py-2 px-1.5">
          {(Object.keys(CATEGORY_LABELS) as ComponentCategoryKey[]).map((catKey) => {
            const list = COMPONENT_CATALOG.filter(
              (c) =>
                c.category === catKey &&
                (!q ||
                  c.name.toLowerCase().includes(q) ||
                  c.cnName.includes(q))
            );
            if (list.length === 0) return null;

            return (
              <div key={catKey} className="mb-2">
                <div className="px-3 pt-2.5 pb-1 text-[11px] font-extrabold tracking-wider uppercase text-[#a09072] flex items-center justify-between">
                  <span>{CATEGORY_LABELS[catKey].label}</span>
                  <span className="text-[10px] opacity-70">{CATEGORY_LABELS[catKey].en}</span>
                </div>

                <div className="space-y-0.5">
                  {list.map((comp) => {
                    const active = route.view === 'component' && route.id === comp.id;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => navigateComponent(comp.id)}
                        style={
                          active
                            ? {
                                background: 'var(--px-sidebar-active)',
                                color: '#ffffff',
                                boxShadow: '0 2px 0 0 var(--px-sidebar-active-shadow)',
                              }
                            : undefined
                        }
                        className={`w-full h-10 px-3 flex items-center gap-2.5 text-left text-[13px] font-bold rounded-[8px] cursor-pointer transition-all ${
                          active
                            ? 'border-2 border-[var(--px-ink-strong)]'
                            : 'text-[#7c6b53] hover:bg-[var(--px-sidebar-hover)]'
                        }`}
                      >
                        <PixelIcon name={comp.icon} size={15} />
                        <span className="truncate">
                          {comp.name}{' '}
                          <span className={active ? 'text-white/90' : 'text-[#9d8d74] font-semibold'}>
                            {comp.cnName}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Compact Theme Dots */}
        <div className="p-3 border-t-2 border-[#e6decb] flex items-center justify-between text-[11px] font-bold text-[#8a7b66]">
          <span>主题色板</span>
          <div className="flex items-center gap-1.5">
            {THEME_PRESETS.map((t) => (
              <button
                key={t.key}
                type="button"
                title={t.name}
                onClick={() => setTheme(t.key)}
                style={{ background: t.swatch }}
                className={`w-4 h-4 rounded-[3px] border cursor-pointer transition-transform ${
                  theme === t.key ? 'border-[#3a2614] scale-125 ring-2 ring-[#ffcc00]' : 'border-[#7c6b53]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const currentDocTitle =
    route.view === 'component'
      ? COMPONENT_CATALOG.find((c) => c.id === route.id)?.name ?? '组件文档'
      : 'Pixel Island UI';

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <PixelNotificationHost />

      {/* Desktop Fixed 236px Cozy Island Sidebar */}
      <aside className="hidden md:block w-[236px] min-w-[236px] h-full border-r-2 border-[#dfcfb2] z-20">
        {renderSidebarMenu()}
      </aside>

      {/* Mobile Top Bar (Matches animal-island-ui mobile adaptation spec) */}
      <div className="md:hidden fixed top-0 inset-x-0 h-[52px] px-3 bg-[#fffcf4]/95 backdrop-blur-md border-b-2 border-[#e8e2d6] z-40 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="px-2.5 py-1 text-sm font-extrabold text-[#725d42] border-2 border-[#c8baa0] rounded-[5px] bg-white cursor-pointer"
        >
          ☰ 目录
        </button>
        <span className="font-extrabold text-sm text-[var(--px-ink)] truncate">
          {currentDocTitle}
        </span>
        <button
          type="button"
          onClick={() => navigateStorybook('button')}
          className="px-2 py-1 text-xs font-extrabold bg-[#ff4785] text-white border border-[#591029] rounded-[4px] cursor-pointer"
        >
          Storybook
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-black/40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[248px] h-full shadow-2xl"
          >
            {renderSidebarMenu()}
          </div>
        </div>
      )}

      {/* Main Scrollable Viewport */}
      <main
        id="px-main-scroll"
        className="flex-1 h-full overflow-y-auto pt-[52px] md:pt-0 px-content-wallpaper relative"
      >
        {route.view === 'home' ? (
          <HomePage
            theme={theme}
            onChangeTheme={setTheme}
            onSelectComponent={navigateComponent}
            onOpenStorybook={navigateStorybook}
          />
        ) : (
          <ComponentDocPage
            componentId={route.id}
            onSelectComponent={navigateComponent}
            onOpenStorybook={navigateStorybook}
            onBackOverview={navigateHome}
          />
        )}

        <PixelBackTop targetSelector="#px-main-scroll" />
      </main>
    </div>
  );
}

export default App;
