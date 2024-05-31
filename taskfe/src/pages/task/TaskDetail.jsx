import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import { Close } from '@mui/icons-material';
import { Grid, IconButton, TextField, ToggleButton, Tooltip } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttachmentIcon from '@mui/icons-material/Attachment';
import dayjs from 'dayjs';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import css from '../../assets/css/task.module.css';
import Comment from './Comment';
import { updateEvent } from '../../services/events/createEvent';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 350,
  bgcolor: 'background.paper',
  p: 24,
  padding: '20px'
};

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const names = ['Submited', 'Completed', 'In progress', 'New task'];



export default function TaskDetail({ handleClose, handleOpen, open, data, age1, setAge1, open1, setOpen1, handleChange1, handleClose1, handleOpen1 }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="flex justify-between" style={{
            display:'flex',
            justifyContent:'space-between'
          }} id="modal-modal-title" variant="h6" component="h2">
            <div>
              <FormControl sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open1}
                  onClose={handleClose1}
                  onOpen={handleOpen1}
                  value={age1}
                  label="Status"
                  onChange={(event)=>{
                    handleChange1(event);
                  }}
                  style={{height: 40}}
                >
                  <MenuItem value={10}>Submited</MenuItem>
                  <MenuItem value={20}>Completed</MenuItem>
                  <MenuItem value={30}>In progress</MenuItem>
                  <MenuItem value={40}>New task</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Close className="cursor-pointer hover:bg-[#EDEFF1] mt-[4px]" onClick={handleClose} />
          </Typography>
          <Typography className={`h-[560px] overflow-y-scroll overflow-y-hidden ${css.nonescroll}`}>
            <Typography
              className="px-[16px] flex items-center justify-between"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <div className="text-[28px] text-[#48409E]">{data?.title}</div>
              <div>
              <IconButton
                sx={{ width: 13, height: 13, marginRight: '4px', padding: 0, border: 0, borderRadius: '50%', backgroundColor: `${data?.color}` }}
              />
              <span style={{fontWeight:200, fontSize:'14px'}}>{}</span>
              </div>
              
            </Typography>

            <Typography className="px-[16px]" id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid className="" container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Starting date"
                      disabled={true}
                      defaultValue={moment(data?.start)}
                      sx={{
                        width: '100%',
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      disabled={true}
                      label="Ending date"
                      defaultValue={moment(data?.end)}
                      sx={{
                        width: '100%',
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    fullWidth
                    value={data?.description}
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
