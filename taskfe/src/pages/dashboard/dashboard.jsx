import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CommentIcon from '@mui/icons-material/Comment';
import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
import { IconButton, List, ListItemText, ListItem, Grid, Container, Typography, Card } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import account from '../../_mock/account';
// sections
import {
  // AppTasks,
  // AppOrderTimeline,
  // AppCurrentVisits,
  CustomizedTimeline,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../../sections/@dashboard/app';

import { fDate } from '../../utils/formatTime';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { countEventsToday, getEventsToday } from '../../services/events/getEventToday';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Timeline } from '@mui/lab';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const [totalEvent, setTotalEvent] = useState(0);
  const [eventsToday, setEventsToday] = useState([]);
  // const [dataCurrent, setDataCurrent] = useState([]);
  // const [dataLastWeek, setDataLastWeek] = useState([]);
  const { token, user } = useContext(AuthContext);
  console.log(token);
  const fetchData = async () => {
    try {
      const res = await getEventsToday(token);
      if (res.responseCode === 200) {
        setEventsToday(res.data);
      } else {
        toast.error(res.response.data.message)
      }
    } catch (error) { }
  };

  const fetchCount = async () => {
    try {
      const res = await countEventsToday(token);
      if (res.responseCode === 200) {
        setTotalEvent(res.data);
      } else {
        toast.error(res.response.data.message)
      }
    } catch (error) { }
  };
  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard | TimeMentor+ </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {fDate(new Date())}, Hi Welcome
        </Typography>


        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Số task hôm nay:
            </Typography>
            <AppWidgetSummary title="Schedule" total={totalEvent} icon={'bi:calendar-week'} />
          </Grid>

          <Grid item xs={12} md={6} lg={6} >
            <Typography variant="h6" sx={{ mb: 4 }}>
              Danh sách task hôm nay:
            </Typography>
            <Card sx={{ height: '100%', paddingTop: '46px' }}>
              {/* <CustomizedTimeline /> */}
              <Timeline position="alternate">

                {eventsToday.length == 0 ?
                  <span>
                    No events to day...
                  </span>
                  :
                  eventsToday.map((event, index) => (
                    <CustomizedTimeline
                      index={index}
                      time={moment(event.start).format("hh:mm") + " - " + moment(event.endd).format("hh:mm")}
                      icon={<FastfoodIcon />}
                      title={event.title}
                      content={event.descripton} />
                  ))}
              </Timeline>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
