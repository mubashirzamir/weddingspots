import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from "../../Helpers/AuthContext";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { fontFamily } from '@mui/system';



export default function BasicMenu() {
    const { authState, setAuthState } = useContext(AuthContext)

    console.log(authState.type)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                style={{ marginTop: '2px', fontSize: '15px', fontFamily: 'Arial', fontWeight: 'bold', textTransform: 'none', color: '#0d6efd' }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Manage
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {authState.type === 2 && (
                    <MenuItem onClick={handleClose}>
                        <Link className="text-decoration-none" aria-current="page" exact to="/managervenuelist">
                            Manage Venues
                        </Link>
                    </MenuItem>
                )}

                {authState.type > 2 && (
                    <MenuItem onClick={handleClose}>

                        <Link className='text-decoration-none' exact to="/adminvenuelist">
                            Manage Venues
                        </Link>
                    </MenuItem>
                )}

                {authState.type > 2 && (
                    <MenuItem onClick={handleClose}>
                        <Link className="text-decoration-none" aria-current="page" exact to="/adminuserlist">
                            Manage Users
                        </Link>
                    </MenuItem>
                )}



            </Menu>
        </div >
    );
}
