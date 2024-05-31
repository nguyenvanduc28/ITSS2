import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthContextProvider } from './context/AuthContext';
function App() {

  return (
    <AuthContextProvider>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </AuthContextProvider>
  )
}

export default App
