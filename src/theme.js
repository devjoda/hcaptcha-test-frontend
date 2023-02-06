import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    body: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    heading: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    mono: 'monospace',
  },
});

export { theme };
