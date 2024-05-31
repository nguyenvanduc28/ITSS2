import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar, Alert } from '@mui/material';

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default function AlertDialog({ title, ques, content, handleClose3 }) {
    const [open, setOpen] = React.useState(false);
    const [alter, setAlter] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = async () => {
        // setOpen(false);
        setAlter(true);
        await sleep(1000);
        handleClose3();
    }
    const handleClose2 = () => {
        setAlter(false);
        setOpen(false);

    }

    return (
        <div>
            <Button variant="contained" size="medium" onClick={handleClickOpen}>
                {title}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {ques}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div style={{
                        display: 'flex', justifyContent: 'flex-end', gap: '5px'
                    }}>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" size="medium" onClick={handleClose1}>
                            Save
                        </Button>
                        {
                            alter &&
                            < Snackbar open="true" autoHideDuration={1000} onClose={handleClose2}>
                                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                                    "Saved!"
                                </Alert>
                            </Snackbar>

                        }
                    </div>
                </DialogActions>
            </Dialog>
        </div >
    );
}