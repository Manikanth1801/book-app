import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, ShoppingCart, Person, Logout } from '@mui/icons-material';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/auth');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Books', path: '/books' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
      {isAuthenticated ? (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/cart"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={`Cart (${items.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/track-order"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Track Order" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/account"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="My Account" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/auth"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Subhman.Store
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  {item.label}
                </Button>
              ))}
              {isAuthenticated ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/track-order"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    Track Order
                  </Button>
                  <IconButton
                    component={RouterLink}
                    to="/cart"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    <Badge badgeContent={items.length} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Person />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                  >
                    <MenuItem component={RouterLink} to="/account">
                      My Account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/track-order"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    Track Order
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/auth"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    Login
                  </Button>
                  <IconButton
                    component={RouterLink}
                    to="/cart"
                    color="inherit"
                  >
                    <Badge badgeContent={items.length} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header; 