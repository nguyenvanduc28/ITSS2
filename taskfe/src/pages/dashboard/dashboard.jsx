import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container, Typography, Card } from '@mui/material';
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
          Hi, Welcome {user.fullName}!
        </Typography>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Today {fDate(new Date())} , you have
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={6}>
            <AppWidgetSummary title="Schedule" total={totalEvent} icon={'bi:calendar-week'} />
          </Grid>

          <Grid item xs={12} md={6} lg={5} >
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
                      time={moment(event.start).format("hh:mm") + " - " + moment(event.end).format("hh:mm")}
                      icon={<FastfoodIcon />}
                      title={event.title}
                      content={event.descripton} />
                  ))}
              </Timeline>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Schedule"
              subheader="(-30%) than last week"
              chartLabels={[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thusday',
                'Friday',
                'Saturday',
                'Sunday'
              ]}
              chartData={[
                {
                  name: 'Current week',
                  type: 'area',
                  fill: 'gradient',
                  data: [8, 8.5, 9, 8.25, 7.5],
                },
                {
                  name: 'Last week',
                  type: 'area',
                  fill: 'gradient',
                  data: [8.5, 9.5, 9.25, 9, 8.5, 8, 7],
                },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
