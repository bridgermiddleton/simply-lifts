import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function NavBar()
{
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useAuth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = async (event) => {
        event.preventDefault();
        try
        {
          await logout();
        }
        catch (error)
        {
          console.error('Error logging out')
        }
    
    
      }

return (
    <Box sx={{ display: 'flex', flexGrow: 1}}>
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{mr: 2}}
                onClick={handleMenu}>
                <MenuIcon />
                </IconButton>
                <Menu id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                    <MenuItem><Link to='/create'>Create Workout</Link></MenuItem>
                    <MenuItem><Link to='/past-workouts'>View Past Workouts</Link></MenuItem>
                </Menu>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    <Link style={{color: 'white'}} to='/home'>Simply Lifts</Link>
                </Typography>
                <Button onClick={handleLogout} color='inherit'>Logout</Button>
            </Toolbar>
        </AppBar>
    </Box>
);
}
