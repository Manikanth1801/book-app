import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
} from '@mui/material';
import { Menu as MenuIcon, ShoppingCart } from '@mui/icons-material';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
              <ListItemText primary="Cart" />
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
                >
                  {item.label}
                </Button>
              ))}
              {isAuthenticated ? (
                <>
                  <IconButton
                    component={RouterLink}
                    to="/cart"
                    color="inherit"
                  >
                    <Badge badgeContent={items.length} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <Button
                    component={RouterLink}
                    to="/track-order"
                    color="inherit"
                  >
                    Track Order
                  </Button>
                </>
              ) : (
                <Button
                  component={RouterLink}
                  to="/auth"
                  color="inherit"
                >
                  Login
                </Button>
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