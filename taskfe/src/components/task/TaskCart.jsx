import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Task = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

Task.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default Task;
