import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function QuesDialog({ open, handleClose, title, ques }) {
    // const [open, setOpen] = React.useState(true);

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    // const handleClose = () => {
    //     // open = !open;
    //     setOpen(false);
    // };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {ques}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
