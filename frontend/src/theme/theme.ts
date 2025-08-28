import { createTheme } from '@mui/material/styles';

// GitHub-inspired theme with professional styling
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A21C0', // Bright blue accent
      light: '#4F63FF',
      dark: '#050A44',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6B7280', // Grey for secondary elements
      light: '#9CA3AF',
      dark: '#374151',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f6f8fa', // GitHub light background
      paper: '#ffffff', // Pure white for content cards
    },
    text: {
      primary: '#1F2937', // Dark text for readability
      secondary: '#6B7280', // Grey text for secondary content
    },
    divider: 'rgba(107, 114, 128, 0.12)',
  },
  typography: {
    fontFamily: '"SF Pro Display", "Segoe UI", "Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      fontFamily: '"SF Pro Display", "Segoe UI", sans-serif',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      fontFamily: '"SF Pro Display", "Segoe UI", sans-serif',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      fontFamily: '"SF Pro Display", "Segoe UI", sans-serif',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.25,
      letterSpacing: '-0.005em',
      fontFamily: '"SF Pro Display", "Segoe UI", sans-serif',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '0em',
      fontFamily: '"SF Pro Display", "Segoe UI", sans-serif',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '0.005em',
      fontFamily: '"SF Pro Display", "Segoe UI", sans-serif',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.015em',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.015em',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      textTransform: 'none',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
    caption: {
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.03em',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.15)',
    '0px 12px 24px rgba(0, 0, 0, 0.18)',
    '0px 16px 32px rgba(0, 0, 0, 0.2)',
    '0px 20px 40px rgba(0, 0, 0, 0.25)',
    '0px 24px 48px rgba(0, 0, 0, 0.3)',
    '0px 32px 64px rgba(0, 0, 0, 0.35)',
    '0px 40px 80px rgba(0, 0, 0, 0.4)',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.12)',
    '0px 10px 20px rgba(0, 0, 0, 0.15), 0px 3px 6px rgba(0, 0, 0, 0.10)',
    '0px 15px 25px rgba(0, 0, 0, 0.15), 0px 5px 10px rgba(0, 0, 0, 0.05)',
    '0px 20px 40px rgba(0, 0, 0, 0.2)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
    '0px 25px 50px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#ffffff',
          border: '1px solid rgba(107, 114, 128, 0.12)',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(10, 33, 192, 0.2)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f6f8fa 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#ffffff', // Pure white paper
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.875rem',
          letterSpacing: '0.02em',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #0A21C0 0%, #4F63FF 100%)',
          boxShadow: '0px 4px 16px rgba(10, 33, 192, 0.25)',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #050A44 0%, #0A21C0 100%)',
            boxShadow: '0px 8px 24px rgba(10, 33, 192, 0.4)',
            transform: 'translateY(-3px) scale(1.02)',
          },
          '&:active': {
            transform: 'translateY(-1px) scale(0.98)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#0A21C0',
          color: '#0A21C0',
          background: 'transparent',
          '&:hover': {
            borderColor: '#050A44',
            background: 'rgba(10, 33, 192, 0.05)',
            transform: 'translateY(-2px)',
            boxShadow: '0px 4px 16px rgba(10, 33, 192, 0.15)',
          },
        },
        text: {
          color: '#0A21C0',
          '&:hover': {
            background: 'rgba(10, 33, 192, 0.08)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#24292e', // GitHub dark color
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#FFFFFF',
          '& .MuiTypography-root': {
            color: '#FFFFFF !important',
          },
          '& .MuiListItemText-primary': {
            color: '#FFFFFF !important',
            fontWeight: 500,
          },
          '& .MuiListItemText-secondary': {
            color: 'rgba(255, 255, 255, 0.7) !important',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#24292e', // GitHub dark color
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#FFFFFF !important',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          '& .MuiTypography-root': {
            color: '#FFFFFF !important',
          },
          '& .MuiToolbar-root': {
            color: '#FFFFFF !important',
          },
          '& .MuiIconButton-root': {
            color: '#FFFFFF !important',
          },
          '& .MuiButton-root': {
            color: '#FFFFFF !important',
          },
          '& *': {
            color: '#FFFFFF !important',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF !important',
          borderRadius: '8px',
          margin: '4px 8px',
          padding: '12px 16px',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '& .MuiListItemText-primary': {
            color: '#FFFFFF !important',
            fontWeight: 500,
            fontSize: '0.95rem',
            letterSpacing: '0.01em',
          },
          '& .MuiListItemText-secondary': {
            color: 'rgba(255, 255, 255, 0.7) !important',
          },
          '& .MuiListItemIcon-root': {
            color: '#FFFFFF !important',
            opacity: 0.8,
            transition: 'all 0.3s ease',
          },
          '& .MuiTypography-root': {
            color: '#FFFFFF !important',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(88, 166, 255, 0.15)',
            border: '1px solid rgba(88, 166, 255, 0.3)',
            transform: 'translateX(4px)',
            '& .MuiListItemText-primary': {
              color: '#FFFFFF !important',
              fontWeight: 600,
            },
            '& .MuiListItemIcon-root': {
              color: '#58a6ff !important',
              opacity: 1,
              transform: 'scale(1.1)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateX(2px)',
            '& .MuiListItemIcon-root': {
              opacity: 1,
              transform: 'scale(1.05)',
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600,
              color: '#FFFFFF !important',
            },
          },
          '&:active': {
            transform: 'translateX(1px) scale(0.98)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
              boxShadow: '0px 6px 16px rgba(10, 33, 192, 0.15)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-1px) scale(1.05)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
            backgroundColor: 'rgba(10, 33, 192, 0.08)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(10, 33, 192, 0.03)',
            transform: 'scale(1.005)',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  },
});

// Light theme card gradients with subtle colors
export const cardGradients = {
  projects: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 50%, #F8F9FA 100%)',
  tasks: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #F8F9FA 100%)',
  bugs: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 50%, #F8F9FA 100%)',
  analytics: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 50%, #F8F9FA 100%)',
  completion: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #F8F9FA 100%)',
  users: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 50%, #F8F9FA 100%)',
  progress: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #F8F9FA 100%)',
  premium: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 25%, #F3E8FF 75%, #F8F9FA 100%)',
};

export default theme;
