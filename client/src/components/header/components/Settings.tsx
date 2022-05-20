import React, {FC, useState} from 'react';
import "./settings.scss"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {GearFill} from "react-bootstrap-icons";
import {styled} from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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

interface SettingsProps{
    userPhoto?: string,
    userName?: string,
    role?: string
}

const Settings:FC<SettingsProps> = ({userPhoto, userName, role}) => {

    const dispatch = useDispatch()
    localStorage.language = useSelector<any>(state => state.language.language)

    const [isOpen, setIsOpen] = useState<boolean>(false);

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



    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    borderRadius: '50%',
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#7659ae',
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#7659ae',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#F7B801',
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#F7B801',
            borderRadius: 20 / 2,
        },
    }));



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
                        <GearFill color="#ffffff" size={32}/>
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
                            <MenuItem>
                                <Link to="/profile" className="link">
                                    <Avatar src={userPhoto}/> {userName}
                                </Link>
                            </MenuItem>
                            {
                                role === 'Admin'?
                                    <MenuItem>
                                        <Link to="/admin" className="link">
                                            <Avatar /> {role}
                                        </Link>
                                    </MenuItem>
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
                        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                        label="Theme"
                    />
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default Settings;