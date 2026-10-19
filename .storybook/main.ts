import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (viteConfig) => {
    const filterPlugins = (plugins: unknown[]): unknown[] =>
      plugins
        .map((plugin) => {
          if (Array.isArray(plugin)) return filterPlugins(plugin);
          if (
            plugin &&
            typeof plugin === 'object' &&
            'name' in plugin &&
            String((plugin as { name?: string }).name).includes('singlefile')
          ) {
            return null;
          }
          return plugin;
        })
        .filter(Boolean);

    viteConfig.plugins = filterPlugins(viteConfig.plugins ?? []) as typeof viteConfig.plugins;
    return viteConfig;
  },
};

export default config;
