import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    version: {
      name: 'Version',
      description: 'Select component version',
      defaultValue: 'v1',
      toolbar: {
        icon: 'layers',
        items: [
          { value: 'v1', title: 'Version 1' },
          { value: 'v2', title: 'Version 2' },
          { value: 'v3', title: 'Version 3' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { Light: '', Dark: 'dark' },
      defaultTheme: 'Light',
    }),
  ],
};

export default preview;
