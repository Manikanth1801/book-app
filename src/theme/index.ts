import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for text and icons
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD600', // Yellow for highlights/buttons
      light: '#FFF9C4',
      dark: '#FFC400',
      contrastText: '#000000',
    },
    error: {
      main: '#FF5252', // Red accent for price/highlights
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#000',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#000',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#000',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#000',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#000',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#000',
    },
    button: {
      fontWeight: 700,
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0, // No rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 700,
          backgroundColor: '#FFD600',
          color: '#000',
          boxShadow: 'none',
          paddingLeft: 32,
          paddingRight: 32,
          '&:hover': {
            backgroundColor: '#FFC400',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          },
        },
        outlined: {
          borderColor: '#FFD600',
          color: '#000',
          borderRadius: 0,
          '&:hover': {
            backgroundColor: '#FFF9C4',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          backgroundColor: '#FFF',
          transition: 'box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '20px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF',
          color: '#000',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          paddingLeft: 32,
          paddingRight: 32,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#FFF',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;