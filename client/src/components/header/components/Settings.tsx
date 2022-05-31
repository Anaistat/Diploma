import React, {FC, useState} from 'react';
import "./settings.scss"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import TranslateIcon from '@mui/icons-material/Translate';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import MaterialUISwitch from "./MaterialUISwitch";
import {Typography, useTheme} from "@mui/material";

interface SettingsProps{
    userPhoto?: string,
    userName?: string,
    role?: string
}

const Settings:FC<SettingsProps> = ({userPhoto, userName, role}) => {

    const toggleTheme = () =>{
        localStorage.theme = localStorage.theme === 'light'?'dark':'light'
        setMode(localStorage.theme)
    }
    const dispatch = useDispatch()
    localStorage.language = useSelector<any>(state => state.language.language)
    const switchDayMode:any = useSelector<any>(state=>state.dayMode.toggleColorMode)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [mode, setMode] = useState<string>(localStorage.theme || 'light')

    const expandList = () => {
        setIsOpen(!isOpen);
    };

    const [selectedIndex, setSelectedIndex] = useState<number>(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };



    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box >
                <Tooltip title="Settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <SettingsIcon style={{color: '#ffffff'}} fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}

                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    userName?
                        <div>
                            <Link to="/profile" className="link">
                                <MenuItem>
                                    <Avatar src={userPhoto}/> <Typography>{userName}</Typography>
                                </MenuItem>
                            </Link>
                            {
                                role === 'Admin'?
                                    <Link to="/admin" className="link">
                                        <MenuItem>
                                            <Avatar/> <Typography>{role}</Typography>
                                        </MenuItem>
                                    </Link>
                                    :<span/>
                            }
                        </div>
                        :
                        <span/>
                }
                <Divider />
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >

                    <ListItemButton onClick={expandList}>
                        <ListItemIcon style={ {minWidth: "44px"} }>
                            <TranslateIcon style={ {minWidth: "34px"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Language" />
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}

                                selected={selectedIndex === 1}
                                onClick={(event) => {
                                    handleListItemClick(event, 1)
                                    dispatch({type: "EN_LANGUAGE"})
                                }}
                            >
                                <ListItemIcon>
                                    <span style={ {color: '#000', fontSize: "24px"} }>🇺🇸</span>
                                </ListItemIcon>
                                <ListItemText primary="English" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                selected={selectedIndex === 2}
                                color="secondary"
                                onClick={(event) => {
                                    handleListItemClick(event, 2)
                                    dispatch({type: "RU_LANGUAGE"})
                                }}
                            >
                                <ListItemIcon>
                                    <span style={ {color: '#000', fontSize: "24px"} }>🇷🇺</span>
                                </ListItemIcon>
                                <ListItemText primary="Russian" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <MenuItem>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }}/>}
                        label="Theme"
                        onChange={()=>switchDayMode.toggleColorMode()}
                        checked={localStorage.theme === 'dark'}
                    />
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default Settings;