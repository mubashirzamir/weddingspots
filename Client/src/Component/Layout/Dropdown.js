import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";



export default function BasicMenu() {
    const { authState } = useContext(AuthContext)

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
                        <Link className="text-decoration-none" aria-current="page" to="/managervenuelist">
                            Manage Venues
                        </Link>
                    </MenuItem>
                )}

                {authState.type > 2 && (
                    <MenuItem onClick={handleClose}>
                        <Link className='text-decoration-none' to="/adminvenuelist">
                            Manage Venues
                        </Link>
                    </MenuItem>
                )}

                {authState.type > 2 && (
                    <MenuItem onClick={handleClose}>
                        <Link className="text-decoration-none" aria-current="page" to="/adminuserlist">
                            Manage Users
                        </Link>
                    </MenuItem>
                )}

                {authState.type === 3 && (
                    <MenuItem onClick={handleClose}>
                        <Link className='text-decoration-none' to="/AdminBookings">
                            Manage Bookings
                        </Link>
                    </MenuItem>
                )}

                {authState.type === 2 && (
                    <MenuItem onClick={handleClose}>
                        <Link className='text-decoration-none' to="/ManagerBookings">
                            Manage Bookings
                        </Link>
                    </MenuItem>
                )}

                {authState.type >= 1 && (
                    <MenuItem onClick={handleClose}>
                        <Link className='text-decoration-none' to="/UserBookings">
                            Manage Personal Bookings
                        </Link>
                    </MenuItem>
                )}



            </Menu>
        </div >
    );
}
