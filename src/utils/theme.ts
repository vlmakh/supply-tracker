import type { Theme } from '@emotion/react';

export const theme: Theme = {
  colors: {
    main: '#212121', // dark
    second: '#004200',
    accent: '#009846', // polysteel
    text: '#212121',
  },
  space: [0, 2, 4, 8, 16, 32, 64, 128, 256],
  fontSizes: {
    xs: '16px',
    s: '20px',
    m: '24px',
    l: '32px',
    xl: '64px',
  },
  borders: {
    none: 'none',
    normal: '1px solid',
  },
  radii: {
    none: '0',
    normal: '4px',
    round: '50%',
  },
  shadows: {
    link: '0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff',
    box: '0 0px 8px rgba(0, 0, 0, 0.6)',
    inner: 'inset 0 0 8px rgba(255, 255, 255, 0.6)',
  },
};
