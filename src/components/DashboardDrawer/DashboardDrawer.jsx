import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import StoreIcon from '@mui/icons-material/Store'
import CategoryIcon from '@mui/icons-material/Category'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { LoadingButton } from '@mui/lab'
import { useToken } from '../../global/hooks'
import { logoutUser } from '../../store/reducers/AuthReducer'
import ApiService from '../../Services/ApiService'
import ConfirmationDialog from '../ConfirmationDialog'
import useMediaQuery from '@mui/material/useMediaQuery'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function DashboardDrawer({ children }) {
  const theme = useTheme()
  const matches = useMediaQuery('(min-width:700px)')
  const menuFixed = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = useState(matches)
  const [confirmDialog, setConfirmDialog] = useState(null)
  const [fullScreen, setFullScreen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { Token } = useToken()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const loginPageHandler = () => {
    navigate('/admin/dashboard/login')
  }

  const logoutHandler = () => {
    setConfirmDialog({
      title: 'Log Out',
      body: 'Are you sure want to logout?',
      onConfirm: () => {
        dispatch(logoutUser())
        localStorage.removeItem('AUTH_TOKEN')
        ApiService.setAuthHeader(null)
        navigate('/admin/dashboard/login')
      },
    })
  }

  const openFullscreen = () => {
    setFullScreen(true)
    document.documentElement.requestFullscreen()
  }

  const exitFullScreen = () => {
    setFullScreen(false)
    document.exitFullscreen()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: '#808C96', boxShadow: 'none' }}
      >
        <Toolbar
          style={{ marginLeft: !menuFixed ? '5px' : '' }}
          sx={{ psoition: 'relative' }}
        >
          {open ? (
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                position: 'absolute',
                left: 0,
                borderRadius: '0px',
                backgroundColor: 'white',
                '&:hover': { backgroundColor: 'white' },
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
              }}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon sx={{ color: '#808C96' }} />
              ) : (
                <ChevronLeftIcon sx={{ color: '#808C96' }} />
              )}
            </IconButton>
          ) : (
            ''
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
              },
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon
              sx={{
                color: '#808C96',
                '&:hover': {
                  color: '#808C96',
                },
              }}
            />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              right: 10,
              width: '150px',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '90%',
                height: '70%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '40%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={fullScreen ? exitFullScreen : openFullscreen}
              >
                {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </Box>
              <LoadingButton
                variant="contained"
                className="btn-next"
                onClick={Token ? logoutHandler : loginPageHandler}
                // loading={isLoading}
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  width: 'fit-content',
                  height: '80%',
                  display: 'flex',
                  borderRadius: '4px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#808C96',
                  cursor: 'pointer',
                  padding: '10px',
                  '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                  },
                }}
              >
                {Token ? 'Logout' : 'Login'}
              </LoadingButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgroundColor: '#808C96' }}
      >
        <DrawerHeader
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={require('../../assets/logo.png')}
            alt=""
            style={{
              width: '70%',
              height: '70%',
              margin: '14px 10px 10px 10px',
            }}
          />
        </DrawerHeader>
        <Box
          sx={{
            backgroundColor: '#808C96',
            height: '100%',
            color: 'white',
            fontSize: '12px',
          }}
        >
          <List>
            <ListItem
              disablePadding
              sx={{ display: 'block', paddingTop: '10px' }}
            >
              {/* <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/admin/dashboard')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HomeIcon sx={{ color: 'white' }} />
                </ListItemIcon>

                <ListItemText
                  primary={'Dashboard'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton> */}

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/admin/dashboard')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PersonIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText
                  primary={'User Data'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/admin/dashboard/shop')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <StoreIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText
                  primary={'Shop Data'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/admin/dashboard/membership')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BeenhereIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText
                  primary={'Membership'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/admin/dashboard/category')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText
                  primary={'Category'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/admin/dashboard/holiday')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HolidayVillageIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText
                  primary={'Holiday'}
                  sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => navigate('/admin/dashboard/holiday')}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <Outlet /> */}
        {children}
      </Box>
      {confirmDialog && (
        <ConfirmationDialog
          open={confirmDialog}
          handleClose={() => setConfirmDialog(null)}
          {...confirmDialog}
        />
      )}
    </Box>
  )
}
