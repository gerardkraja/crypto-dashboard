//TODO: transform mui imports into named ones.
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, ToggleButton} from '@mui/material';
import {useEffect, useState, createContext} from 'react'
import { Outlet } from "react-router-dom";
import {useTheme} from "@mui/material/styles"
import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useNavigate, useLocation} from 'react-router-dom'

import {Footer} from './Footer.tsx'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  setMode: Function
  mode: string
}
//TODO: pass window to this component
const ColorModeContext = createContext({ toggleColorMode: () => {} });
const drawerWidth = 240;
const navItems = [{name: 'Home', link: '/home'},
{name: 'Cryptos', link: '/more/cryptos'},
{name: 'Exchanges', link: '/more/exchanges'},
{name: 'Contact', link: '/contact'}];

//TODO: Create placeholder views when data is loading (blank components)
export function Layout(props: Props) {
  const { window, mode, setMode } = props;
const navigate = useNavigate()
const location = useLocation()
useEffect(()=>{
if(location.pathname === '/'){
navigate('/home')
}
},[location])
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
<>   
 <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Crypto Dashboard
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={()=>{navigate(item.link)}} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
            <ToggleButton
value='darkMode'
selected={mode === 'dark'}
onChange={()=>setMode(mode === 'light' ? 'dark' : 'light')}
>
{mode === 'light' ? 
<DarkModeIcon/>
:
<LightModeIcon/>
}            
</ToggleButton>
</>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
<>   
 <Box sx={{ display: 'flex', flex: 1 }}>
      <CssBaseline />
      <AppBar position='sticky' component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Crypto Dashboard
          </Typography>
           <Box>
	  
	  </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.name} onClick={()=>{navigate(item.link)}} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            ))}
<ToggleButton
value='darkMode'
selected={mode === 'dark'}
onChange={()=>setMode(mode === 'light' ? 'dark' : 'light')}
>
{mode === 'light' ?
<DarkModeIcon/>
:
<LightModeIcon/>
}
</ToggleButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
<div style={{ flex: 1}}>
<Outlet/>
</div>
<Footer/>
</>
  );
}

