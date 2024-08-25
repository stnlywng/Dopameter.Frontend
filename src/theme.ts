// src/theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Button: {
      baseStyle: {
        colorScheme: 'purple',
        backgroundColor: '#9D8DF1',
        _hover: {
          bg: '#9484E3',
        },
        variant: 'solid',
      },
    },
  },
});

export default theme;
