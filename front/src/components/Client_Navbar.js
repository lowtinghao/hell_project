// Navbar for client

import Dell_logo from "../assets/dell_logo.svg";
import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import 'typeface-roboto';

const pages = ["Workshop Request Form", "View Workshops"];
const settings = ["Account", "Logout"];

function ClientNavbar({value, handleChange}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Menu Icon for small screens */}
                    <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            <MenuItem onClick={() => { handleCloseNavMenu(); handleChange(null, 0); }}>
                                <Typography textAlign="center">Workshop Request Form</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); handleChange(null, 1); }}>
                                <Typography textAlign="center">View Workshops</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Logo and title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="Dell Technologies Logo"
                            sx={{
                                borderRadius: 0,
                                ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
                                    borderRadius: 0,
                                }, display: { xs: 'none', md: 'flex' }, mr: 1
                            }}
                        >
                            <img
                                src={Dell_logo}
                                alt="Dell Technologies Logo"
                                height="33"
                            ></img>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: { xs: 'center', md: 'left' },
                                fontFamily: "Roboto",
                                fontWeight: 300,
                                fontSize: "1.4rem",
                                color: '#0672cb',
                                textDecoration: "none",
                            }}
                        >
                            Workshop Resource Portal
                        </Typography>
                    </Box>

                    {/* Tabs for larger screens */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Workshop Request Form" />
                            <Tab label="View Workshops" />
                        </Tabs>
                    </Box>

                    {/* Avatar */}
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 'auto' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export { ClientNavbar };