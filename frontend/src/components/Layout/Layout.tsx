import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Divider,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  FolderSpecial,
  Assignment,
  BugReport,
  Analytics,
  Logout,
  AccountCircle,
  NotificationsNone,
  Search,
  Settings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWebSocket } from '../../contexts/WebSocketContext';

const drawerWidth = 280;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isConnected } = useWebSocket();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', color: '#0A21C0' },
    { text: 'Projects', icon: <FolderSpecial />, path: '/projects', color: '#059669' },
    { text: 'Tasks', icon: <Assignment />, path: '/tasks', color: '#8B5CF6' },
    { text: 'Bugs', icon: <BugReport />, path: '/bugs', color: '#DC2626' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics', color: '#F59E0B' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 900,
            color: '#FFFFFF', // White text for dark sidebar
            letterSpacing: '-0.02em'
          }}
        >
          DevTrack
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#D1D5DB', // Light grey for subtitle in dark sidebar
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          Development Platform
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List sx={{ '& .MuiListItemButton-root': { borderRadius: 2, mb: 1 } }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(10, 33, 192, 0.12)',
                    borderLeft: `3px solid ${item.color}`,
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 600,
                      color: '#FFFFFF',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    justifyContent: 'center',
                    color: location.pathname === item.path ? item.color : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    color: '#FFFFFF', // White text in sidebar
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(10, 33, 192, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(10, 33, 192, 0.2)'
          }}
        >
          <Typography variant="caption" sx={{ color: '#D1D5DB', fontWeight: 600 }}>
            System Status
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Box 
              sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%',
                bgcolor: isConnected ? '#10B981' : '#EF4444',
                mr: 1
              }} 
            />
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#FFFFFF' }}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#1F2937', // Dark text for white background
              }}
            >
              {menuItems.find(item => item.path === location.pathname)?.text || 'DevTrack'}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 500, color: '#6B7280' }}>
              Welcome back, {user?.username}
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit">
              <Search />
            </IconButton>
            
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsNone />
              </Badge>
            </IconButton>
            
            <IconButton color="inherit">
              <Settings />
            </IconButton>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            
            <Button
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  mr: 1,
                  background: 'linear-gradient(45deg, #0A21C0, #4F63FF)',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ textAlign: 'left', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                  {user?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                  {user?.role}
                </Typography>
              </Box>
            </Button>
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                borderRadius: 2,
                mt: 1,
                minWidth: 200,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
              <Avatar sx={{ mr: 2, width: 32, height: 32 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <Logout sx={{ mr: 2 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          background: '#FEFEFE', // Rich light white background
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
