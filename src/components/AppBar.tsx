import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const cart = useSelector((state: any) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  // Build menu items for nav bar
  type MenuItem = { text: string; path: string; action?: () => void; icon?: React.ReactNode };
  const baseMenuItems: MenuItem[] = [
    { text: 'Home', path: '/' },
    { text: 'Books', path: '/books' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];
  const userMenuItems: MenuItem[] = [
    { text: 'Track Order', path: '/track-order' },
    { text: 'My Account', path: '/account' },
    { text: 'Cart', path: '/cart', icon: <Badge badgeContent={cart.length || 0} color="secondary"><ShoppingCartIcon /></Badge> },
    { text: 'Logout', path: '', action: handleLogout },
  ];
  const menuItems: MenuItem[] = user && user.role === 'user'
    ? [...baseMenuItems, ...userMenuItems]
    : baseMenuItems;

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} component={RouterLink} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      {user && user.role === 'user' ? (
        <List>
          <ListItemButton component={RouterLink} to="/account">
            <ListItemText primary="My Account" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/track-order">
            <ListItemText primary="Track Order" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/cart">
            <ListItemText primary={`Cart (${cart.length || 0})`} />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      ) : (
        <List>
          <ListItemButton component={RouterLink} to="/login">
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/register">
            <ListItemText primary="Register" />
          </ListItemButton>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <MuiAppBar position="sticky" color="default" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              Bookstore
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
            <IconButton color="inherit" size="large">
              <SearchIcon />
            </IconButton>
            {/* Main nav yellow buttons including user actions and cart */}
            <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
              {menuItems.map((item) =>
                item.action ? (
                  <Button
                    key={item.text}
                    onClick={item.action}
                    variant="contained"
                    color="secondary"
                    sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    variant="contained"
                    color="secondary"
                    sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                )
              )}
            </Box>
            {!user && (
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="primary"
                startIcon={<PersonIcon />}
                sx={{ ml: 1 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AppBar; 