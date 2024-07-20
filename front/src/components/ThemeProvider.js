// ThemeProvider.js
import * as React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: '#ffffff',
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#0D2155', // main background dell dark blue midnight
        paper: '#0D2155', // component secondary colour dell dark blue midnight
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800], //outline colours
          }
        : {
            primary: '#fff',
            secondary: '#fff',
          }),
    },
    custom: {
      accept: mode === 'dark' ? '#4CAF50' : '#388E3C', 
      reject: mode === 'dark' ? '#FF4C4C' : '#D32F2F',
    },
  },
});

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ThemeProvider, ColorModeContext };
