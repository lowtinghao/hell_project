import Dell_logo from "../assets/dell_logo.svg";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import 'typeface-roboto';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { dark } from "@mui/material/styles/createPalette";

const pages = ["Home", "Trainers", "Form"];
const settings = ["Account", "Logout"];


function AdminNavbar(props) {

    const [notifications, setNotifications] = useState([]);
    const [notifDisplay, setNotifDisplay] = useState([]); 
    //console.log("Admin Nav reloading");
    //console.log(props.socket);
    useEffect(() => {
        props.socket?.on("alertingAdmin", data => {
            setNotifications((prev) => [...prev, data]);
            setNotifDisplay((prev) => [...prev, data.companyName + " submitted a new request"]);
        })
        
    }, [props.socket]);
    console.log(notifications);
    console.log(notifDisplay);
    let notifCount = notifDisplay.length;

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotif, setAnchorElNotif] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenNotifPanel = (event) => {
        setAnchorElNotif(event.currentTarget);
    };

    const handleCloseNotifPanel = () => {
        setAnchorElNotif(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickSetting = (setting) => {
        if (setting === "Logout") {
            navigate("/");
        } else {
            handleCloseUserMenu();
        }

    };

    const handleClick = (e) => {
        handleCloseNavMenu();
        handleCloseNotifPanel();
        props.setPage(e.target.getAttribute("data-testid"));
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
                            }, display: { xs: "none", md: "flex" }, mr: 1
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
                        <Button onClick={handleClick} data-testid={'home-button'}>
                            Workshop Resource Portal
                        </Button>
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
                                <MenuItem key={page} onClick={handleClick}>
                                    <Typography textAlign="center">
                                        <Button data-testid={`${page.toLowerCase()}-button`} sx={{ color: "#636363" }}>
                                            {page}
                                        </Button>
                                        {/* <Link
                                            to={page === "Home" ? "/admin" : `/${page.toLowerCase()}`}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {page}
                                        </Link> */}
                                    </Typography>
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
                            }, display: { xs: "flex", md: "none" }, mr: 1
                        }}
                    >
                        <img
                            onClick={handleClick}
                            data-testid={'home-button'}
                            src={Dell_logo}
                            alt="Dell Technologies Logo"
                            height="33"
                        ></img>
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
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
                        <Button onClick={handleClick} data-testid={'home-button'}>
                            Workshop Resource Portal
                        </Button>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                data-testid={`${page.toLowerCase()}-button`}
                                onClick={handleClick}
                                sx={{ my: 2, color: "#636363", display: "block" }}>
                                {page}
                                {/* <Link
                                    to={page === "Home" ? "/admin" : `/${page.toLowerCase()}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {page}
                                </Link> */}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="View Notifications">
                            <IconButton onClick = {handleOpenNotifPanel}
                                size="large"
                                aria-label="show new notifications"
                                sx={{ p: 1, mr: 4 }}
                            >
                                <Badge badgeContent={notifCount} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: "45px", }}
                            id="menu-notifs"
                            anchorEl={anchorElNotif}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElNotif)}
                            onClose={handleCloseNotifPanel}
                        >
                            {notifDisplay.map((notification) => (
                                <MenuItem onClick={() => handleClickSetting(notification)}>
                                    <Typography textAlign="center">{notification}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>



                        <Tooltip title="Open settings">

                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>

                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px", }}
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
                                <MenuItem key={setting} onClick={() => handleClickSetting(setting)}>
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
