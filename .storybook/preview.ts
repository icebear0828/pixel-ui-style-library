import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'Island Parchment',
      values: [
        { name: 'Island Parchment', value: '#f8f6eb' },
        { name: 'Meadow Green', value: '#7dc395' },
        { name: 'Night Sky', value: '#181825' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
