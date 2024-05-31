import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { Dialog, Box, Paper } from '@mui/material';
//
// import { varFade } from './variants';

// ----------------------------------------------------------------------

DialogAnimate.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  variants: PropTypes.object,
};

export default function DialogAnimate({ open = false, onClose, children, sx, ...other }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          // fullWidth
          // maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              sx={{
                width: '680px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box onClick={onClose} sx={{  position: 'fixed' }} />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
