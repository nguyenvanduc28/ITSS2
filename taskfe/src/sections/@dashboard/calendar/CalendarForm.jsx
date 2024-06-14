import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Rating, Typography, TextField, Button, DialogContent, DialogActions, Grid, MenuItem, Stack, Tooltip, IconButton, FormControlLabel, Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import Iconify from '../../../components/iconify';
import moment from 'moment';
import { createEvent, updateEvent } from '../../../services/events/createEvent';
import { ToastContainer, toast } from 'react-toastify';
import { deleteEvent } from '../../../services/events/deleteEvent';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  {
    label: 'Việc nhà',
    color: '#00AB55'
  },
  {
    label: 'Nghỉ ngơi',
    color: '#FF4842'
  },
  {
    label: 'Cuộc gặp',
    color: '#1890FF'
  },
  {
    label: 'Ăn uống',
    color: '#54D62C'
  },
  {
    label: 'Công việc',
    color: '#FFC107'
  },
  {
    label: 'Học tập',
    color: '#04297A'
  },
  {
    label: 'Quan trọng',
    color: '#7A0C2E'
  }
];

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
};

export default function CalendarForm({ event, handleCloseModal, handleDelete }) {
  const [eventCur, setEventCur] = useState({
    id: event ? event.id : null,
    title: event ? event.title : '',
    description: event ? event.description : '',
    color: event ? event.color : '#00AB55',
    allDay: event ? event.allDay : false,
    start: event ? moment(event.start).valueOf() : moment().valueOf(),
    endd: event ? moment(event.endd).valueOf() : moment().add('hours', 1).valueOf(),
    repeatType: event ? event.repeatType : 'NONE',
    alertType: event ? event.alertType : 'NONE',
    status: event ? event.status : 'New Task',
    rating: event ? event.rating : 1,
    email: event ? event.email : '',
    noti: event ? event.noti : false,
    
  })
  const [noti, setNoti] = React.useState(false);

  const [allDay, setAllDay] = React.useState(false);

  const onClickAllDay = () => {
    const eventTmp = { ...eventCur, allDay: !allDay };
    setEventCur(eventTmp);
  }
  const onClickNoti = () => {
    const eventTmp = { ...eventCur, noti: !noti };
    setNoti(!noti);
    setEventCur(eventTmp);
  }

  const onClickColor = (value) => {
    const eventTmp = { ...eventCur, color: value };
    setEventCur(eventTmp);
  }
  const handleChangeValue = (key, value) => {
    const eventTmp = { ...eventCur, [key]: value };
    setEventCur(eventTmp);
    console.log(eventTmp);
  }

  const handleSaveEvent = () => {
    console.log(eventCur);
    try {
      if (eventCur.id !== null) {
        updateEvent(eventCur)
          .then((res) => {
            if (res.responseCode === 200) {
              handleCloseModal("Đã cập nhật event", res.data)
            }
            else toast.error("Lỗi tạo event");
          })
      } else {
        createEvent(eventCur)
          .then((res) => {
            if (res.responseCode === 200) {
              handleCloseModal("Đã tạo một event", res.data)
            }
            else toast.error("Lỗi tạo event");
          })
      }
    } catch (error) {
      toast.error("Lỗi tạo event");
    }
  }

  const handleDeleteEvent = () => {
    try {
      if (eventCur.id !== null) {
        deleteEvent(eventCur)
          .then((res) => {
            if (res.responseCode === 200) {
              handleDelete(eventCur);
            }
            else toast.error("Lỗi xóa event");
          })
      }
    } catch (error) {
      toast.error("Lỗi xóa event");
    }
  }
  return (
    <>

      <DialogContent sx={{ width: '600px', mt: '4px', }} >
        <Grid container spacing={3} >

          <Grid item xs={12} sm={6} md={12} mt={1}>
            <TextField
              required
              id="outlined-required"
              label="Title"
              defaultValue={eventCur.title}
              fullWidth
              onChange={(event) => handleChangeValue('title', event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={12} >
            <FormControlLabel control={<Switch />} label="All day" labelPlacement="start" onClick={onClickAllDay} />
          </Grid>
          <Grid item xs={12} sm={6} md={12} >
            <FormControlLabel checked={eventCur.noti} control={<Switch />} label="Nhận thông báo" labelPlacement="start" onClick={onClickNoti} />
            {
              eventCur.noti &&
              <>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue={eventCur.email}
                  fullWidth
                  onChange={(event) => handleChangeValue('email', event.target.value)}
                />
                Thông báo sẽ được gửi qua email trước 30 phút
              </>
            }
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Starting date"
                defaultValue={dayjs(eventCur.start)}
                sx={{ width: '100%' }}
                onChange={(value) => {
                  handleChangeValue('start', moment(value.$d).valueOf())
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DateTimePicker
                label="Ending date"
                defaultValue={dayjs(eventCur.endd)}
                sx={{ width: '100%' }}
                onChange={(value) => {
                  handleChangeValue('endd', moment(value.$d).valueOf())
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="outlined-select-currency"
              select
              value={eventCur.repeatType}
              label="Repeat"
              defaultValue={eventCur.repeatType}
              fullWidth
              onChange={(event) => handleChangeValue('repeatType', event.target.value)}
            >
              <MenuItem value={"NONE"}>NONE</MenuItem>
              <MenuItem value={"EVERY_DAY"} >EVERY_DAY</MenuItem>
              <MenuItem value={"EVERY_WEEK"} >EVERY_WEEK</MenuItem>
              <MenuItem value={"EVERY_MONTH"} >EVERY_MONTH</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="Alert"
              defaultValue={eventCur.alertType}
              fullWidth
              onChange={(event) => handleChangeValue('alertType', event.target.value)}
            >
              <MenuItem value={"NONE"}>NONE</MenuItem>
              <MenuItem value={"EVERY_DAY"}>EVERY_DAY</MenuItem>
              <MenuItem value={"EVERY_WEEK"} >EVERY_WEEK</MenuItem>
              <MenuItem value={"EVERY_MONTH"} >EVERY_MONTH</MenuItem>
            </TextField>
          </Grid> */}

          <Grid item xs={12} sm={6} md={12}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              defaultValue={eventCur.description}
              fullWidth
              onChange={(event) => handleChangeValue('description', event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <Typography component="legend">Danh mục</Typography>
            <Stack direction="row" spacing={0.5}>
              {COLOR_OPTIONS.map((option) => (
                <Tooltip key={option.label} title={option.label}>
                  <IconButton
                    value={option.label}
                    onClick={() => onClickColor(option.color)}
                    sx={{ width: 32, height: 32, padding: 0, border: 0, borderRadius: '50%', background: option.color }}
                  >
                    {option.color == eventCur.color && <Iconify sx={{ color: '#000' }} icon={'teenyicons:tick-small-outline'} />}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Typography component="legend">Độ ưu tiên</Typography>
            <Rating
              name="simple-controlled"
              value={eventCur.rating}
              onChange={(event, newValue) => {
                handleChangeValue('rating', newValue)
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ margin: '24px' }} >
        {eventCur.id !== null ? <Button variant="outlined" color="error" style={{ marginRight: 'auto' }} onClick={() => handleDeleteEvent()}>Delete</Button> : ''}
        <Button variant="outlined" color="error" onClick={() => handleCloseModal()}>Cancel</Button>
        <Button variant="outlined" onClick={() => {
          console.log(eventCur)
          handleSaveEvent();
        }}>Save change</Button>
      </DialogActions>
      <ToastContainer />
    </>
  );
}