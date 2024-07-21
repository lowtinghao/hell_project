// Navbar for Admin Portal

import Dell_logo from "../assets/dell_logo.svg";

import * as React from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import 'typeface-roboto';

const pages = ["Home", "Form", "Trainers"];
const settings = ["Account", "Logout"];

function AdminNavbar() {
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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="Dell Technologies Logo"
                        sx={{
                            borderRadius: 0,
                            ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
                                borderRadius: 0,
                            },display: { xs: "none", md: "flex" }, mr: 1
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
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Roboto",
                            fontWeight: 300,
                            fontSize: "1.4rem",
                            color: '#0672cb',
                            textDecoration: "none",
                        }}
                    >
                        Workshop Resource Portal
                    </Typography>

                



                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#636363"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }, 
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="Dell Technologies Logo"
                        sx={{
                            borderRadius: 0,
                            ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
                                borderRadius: 0,
                                backgroundColor: "red",
                            },display: { xs: "flex", md: "none" }, mr: 1
                        }}
                    >
                        <img
                            src={Dell_logo}
                            alt="Dell Technologies Logo"
                            height="33"
                        ></img>
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "Roboto",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: '#0672cb',
                            textDecoration: "none",
                        }}
                    >
                        Workshop Resource Portal
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "#636363", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>






                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export { AdminNavbar };
