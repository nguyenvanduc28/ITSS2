import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
//
import { useState, useRef, useEffect, useContext } from 'react';
// @mui
import { Button, Container, DialogTitle, DialogActions, Stack, Rating, IconButton, List, ListItemText, ListItem, Grid, Typography, Card, ListItemIcon } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import useResponsive from '../../hooks/useResponsive';

// components
import Page from '../../components/Page';
import Filter from '../../components/Filter';
import Iconify from '../../components/iconify';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// // sections
import { CalendarForm, CalendarStyle, CalendarToolbar } from '../../sections/@dashboard/calendar';
import events from '../../_mock/events';
import { getListEventPriority, getListEvents } from '../../services/events/getListEvent';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

// console.log(events)

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
const COLOR_OPTIONS = [
  {
    label: 'Tất cả',
    color: '#fff'
  },
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
    color: '#7A0C2E'
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
    label: 'Thể thao',
    color: '#1890FF'
  }
];


export default function Calendar() {

  const [event, setEvent] = useState();
  const [eventDefault, setEventDefault] = useState();
  const [eventPriority, setEventPriority] = useState([]);

  const [open, setOpen] = useState(false);

  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');

  const [selectedEvent, setSelectedEvent] = useState({});
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }

    const startDate = moment().startOf('months').startOf('weeks').valueOf();
    const endDate = moment().startOf('months').startOf('weeks').add('weeks', 6).valueOf();
    fetchData(startDate, endDate);
  }, [isDesktop]);

  const fetchData = async (startDate, endDate) => {
    const data = {
      startDate: startDate,
      endDate: endDate
    }
    try {
      const res = await getListEvents(data);
      if (res.responseCode === 200) {
        setEvent(res.data);
        setEventDefault(res.data);
      } else {
        toast.error(res.response.data.message)
      }
    } catch (error) { }
  };

  const fetchDataPriority = async () => {

    try {
      const res = await getListEventPriority();
      if (res.responseCode === 200) {
        console.log('schedue', res.data);
        setEventPriority(res.data);
      } else {
        toast.error(res.response.data.message)
      }
    } catch (error) { }
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
      const startDate = moment(calendarApi.getDate()).startOf('months').startOf('weeks').valueOf();
      const endDate = moment(calendarApi.getDate()).startOf('months').startOf('weeks').add('weeks', 6).valueOf();
      fetchData(startDate, endDate);
    }
  };

  const handleChangeView = (newView) => {

    const calendarEl = calendarRef.current;
    console.log('calendarRef', calendarRef);
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
      if (newView == 'listWeek') {
        fetchDataPriority();
      }
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
      const startDate = moment(calendarApi.getDate()).startOf('months').startOf('weeks').valueOf();
      const endDate = moment(calendarApi.getDate()).startOf('months').startOf('weeks').add('weeks', 6).valueOf();
      fetchData(startDate, endDate);
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
      const startDate = moment(calendarApi.getDate()).startOf('months').startOf('weeks').valueOf();
      const endDate = moment(calendarApi.getDate()).startOf('months').startOf('weeks').add('weeks', 6).valueOf();
      fetchData(startDate, endDate);
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setOpen(true);
  };

  const handleCloseModal = (messageToast, eventNew) => {
    if (messageToast != null) {
      toast.success(messageToast);
      const newListEvent = event.filter((item) => item.id != eventNew.id);
      setEvent([...newListEvent, eventNew]);
      setEventDefault([...newListEvent, eventNew]);

    }
    setOpen(false);
  };

  const handleDelete = (eventDelete) => {
    toast.success("Đã xóa event");
    const newListEvent = event.filter((item) => item.id != eventDelete.id);
    setEvent([...newListEvent]);
    setEventDefault([...newListEvent]);
    setOpen(false);
  }

  const handleSelectEvent = (info) => {
    console.log("event da chon", info);
    console.log("event", info);
    setSelectedEvent(event.find((item) => item.id == info.event.id));
    setOpen(true);
  };

  const filter = (color) => {

    setEvent(event.filter((event) => (event.color === color)));
    if (color === '#fff') setEvent(eventDefault);
  };

  return (
    <Page title="Calendar">
      <Container >
        <HeaderBreadcrumbs
          heading="Calendar"
          links={[{ name: 'Dashboard', href: '' }, { name: 'Calendar' }]}
          action={
            <Stack direction="row" spacing={2}>

              <Filter data={COLOR_OPTIONS} onClickColor={(event) => filter(event)} />

              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                onClick={handleAddEvent}
              >
                New Schedule
              </Button>
            </Stack>

          }
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            {view != 'listWeek' ?
              '' :

              <Container maxWidth="xl">
                <Grid container spacing={2}>

                  <Grid item xs={12} md={12} lg={12} >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Danh sách ưu tiên:
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', paddingLeft: '20px' }}>
                      {eventPriority.map((value) => (
                        <ListItem key={value} alignItems='start' disableGutters secondaryAction={
                          <Rating
                            name="simple-controlled"
                            value={value.rating}
                          />
                        }>
                          <ListItemIcon>
                            <IconButton
                              value={value.color}
                              sx={{ width: 10, height: 10, padding: 0, border: 0, borderRadius: '50%', background: value.color }}
                            >

                            </IconButton>
                          </ListItemIcon>
                          <ListItemIcon sx={{ minWidth: '160px' }}>

                            {moment(value.start).format("hh:mm - DD/MM/YYYY")}
                          </ListItemIcon>
                          <ListItemText>
                            {value.title}
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>

                  </Grid>
                </Grid>
              </Container>
            }

            <FullCalendar
              weekends
              editable
              droppable
              selectable
              events={event}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              eventClick={handleSelectEvent}
              height={view == 'listWeek' ? 0 : isDesktop ? 720 : 'auto'}
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            />
          </CalendarStyle>
        </Card>

        {/* Add event model */}
        <DialogAnimate open={open} onClose={() => handleCloseModal()} >
          <DialogTitle variant='h3' sx={{ fontStyle: 'normal', color: '#48409E', }}>
            {selectedEvent != null && 'Event detail' || 'New event'}
          </DialogTitle>
          <CalendarForm event={selectedEvent} handleCloseModal={handleCloseModal} handleDelete={handleDelete} />
        </DialogAnimate>

      </Container>
      <ToastContainer />
    </Page>
  );
}