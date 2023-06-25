import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import HouseIcon from '@mui/icons-material/House';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { filter } from '../../redux/filters/filterSlice';
import { selectContacts } from 'redux/contacts/selectors';
import { Search, SearchIconWrapper, StyledInputBase } from './AppBar.styled';
import { logOut } from 'redux/auth/operations';
import { selectIsLoggedIn, selectUserName } from 'redux/auth/selectors';

export const MyAppBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector(selectContacts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const [value, setValue] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleInputChange = ({ target }) => {
    setValue(target.value);
    dispatch(filter(target.value.toLowerCase().trim()));
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}
        >
          Profile
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            dispatch(logOut());
            handleMenuClose();
          }}
        >
          Log out
        </MenuItem>
      )}

      {!isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/login');
            handleMenuClose();
          }}
        >
          Log In
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/register');
            handleMenuClose();
          }}
        >
          Sign Up
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate('/');
          handleMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show home page" color="inherit">
          <HouseIcon color="primary" />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/сontacts');
            handleMenuClose();
          }}
        >
          <IconButton size="large" aria-label="show contacts" color="inherit">
            <Badge badgeContent={contacts.length} color="error" showZero>
              <LocalPhoneIcon color="primary" />
            </Badge>
          </IconButton>
          <p>Contacts</p>
        </MenuItem>
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle color="primary" />
        </IconButton>
        <p>User Menu</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
            onClick={() => navigate('/')}
          >
            SMARTPHONEBOOK
          </Typography>

          {isLoggedIn && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={value}
                onChange={handleInputChange}
                placeholder="Find contact..."
                inputProps={{ 'aria-label': 'search' }}
                aria-describedby="find a contact by name"
              />
            </Search>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}
          >
            {isLoggedIn && (
              <>
                <Typography variant="body1" noWrap component="div">
                  Welcome, {userName}!
                </Typography>
                <IconButton
                  size="large"
                  aria-label="show contacts"
                  color="inherit"
                >
                  <Badge badgeContent={contacts.length} color="error" showZero>
                    <CallIcon />
                  </Badge>
                </IconButton>
              </>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
