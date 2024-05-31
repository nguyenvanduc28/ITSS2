import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


export default function CustomizedSnackbars({ text, namebutton, content, click, error }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const setClick = () => {
        if (error === true) {
            click();
            handleClick();
        } else {
            click();
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '10%' }}>
            <Button variant="outlined" onClick={setClick}>
                {namebutton}
            </Button>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={text} sx={{ width: '100%' }}>
                    {content}
                </Alert>
            </Snackbar>
        </Stack>
    );
}