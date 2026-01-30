import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';

export default function NavBar()
{
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    }
return (
    <Box sx={{ flexGrow: 1}}>
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
                    <MenuItem>Create Workout</MenuItem>
                    <MenuItem>View Past Workouts</MenuItem>
                </Menu>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    Simply Lifts
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
);
}
