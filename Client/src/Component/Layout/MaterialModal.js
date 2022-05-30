import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function MaterialModal(props) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (props.message)
            handleOpen()
    }, [props]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Message
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {props.message}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
