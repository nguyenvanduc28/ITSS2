import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContext, useMemo, useState } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import { AuthContext } from '../context/AuthContext';
// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ThemeProvider({ children }) {
  useEffect(() => {
    if (localStorage.getItem('theme')) {
      console.log("useEfeect", localStorage.getItem('theme'));
      setMode(localStorage.getItem('theme'))
    } else {
      localStorage.setItem('theme', 'light');
      setMode('light')
    }
  }, [])
  const [mode2, setMode] = useState(localStorage.getItem('theme'));
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {

        if (localStorage.getItem('theme') === 'light') {
          setMode('dark');
          localStorage.setItem('theme', 'dark')
          console.log("toggle",localStorage.getItem('theme'));
        }
        else {
          localStorage.setItem('theme', 'light')
          setMode('light');
          console.log("toggle",localStorage.getItem('theme'));

        }

      },
    }),

    [],
  );
  const themeOptions = useMemo(
    () => ({
      palette: {
        mode: mode2 !== '' ? mode2 : 'light',
      },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [mode2]
  );


  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>

        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MUIThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
}
