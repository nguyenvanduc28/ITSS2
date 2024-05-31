import PropTypes from 'prop-types';

import { useState } from 'react';
// @mui
// import { alpha } from '@mui/material/styles';
import { Stack, MenuItem,  Button, Popover, IconButton } from '@mui/material';
import Iconify from './iconify/Iconify';
// mocks_

// ----------------------------------------------------------------------

Filter.propTypes = {
    data: PropTypes.array,
    onClickColor: PropTypes.func,
  };

// ----------------------------------------------------------------------

export default function Filter({data = [], onClickColor}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
        <Button
            variant="outlined"
            startIcon={<Iconify icon={'solar:filter-linear'} width={20} height={20}  />}
            onClick={handleOpen}
            sx={{
              width: '120px'
            }}
        >
            Filter
        </Button>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx = {{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          width: 250,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        

        <Stack sx={{ p: 1 }}>
          {data.map((option) => (
            <MenuItem key={option.color} value={option.color} onClick={()=>{onClickColor(option.color)}}>
               <IconButton
                  sx={{ width: 20, height: 20, marginRight: '4px' , padding: 0, border: 0 , borderRadius: '50%' , background: option.color}}
                   />
                {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
