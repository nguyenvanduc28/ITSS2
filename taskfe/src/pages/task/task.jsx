import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box, Paper, Grid, Tabs, Tab, Typography, Container, Badge, DialogTitle } from '@mui/material'
import data from './data';
import TaskItem from './TaskItem';
import TaskDetail from './TaskDetail';
import style from "../../assets/css/task.module.css";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page"
import Filter from "../../components/Filter";
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
// import {projectDetail} from "../../_mock/project_data"

import { getListEvents } from '../../services/events/getListEvent';
import { ToastContainer, toast } from 'react-toastify';
import { updateEvent } from '../../services/events/createEvent';

import { Button } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
import { DialogAnimate } from '../../components/animate';
import { CalendarForm } from '../../sections/@dashboard/calendar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography className='flex flex-wrap'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const map = {
  "Submitted": 10,
  "Completed": 20,
  "In Progress": 30,
  "New Task": 40,
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Task = () => {
  const [completedTask, setCompletedTask] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [inProcessTask, setInProcessTask] = useState([]);
  const [submitedTask, setSubmitedTask] = useState([]);
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(null);


  const [age1, setAge1] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const startDate = moment().startOf('years').startOf('days').valueOf();
    const endDate = moment().endOf('months').valueOf();
    fetchData(startDate, endDate);
  }, []);
  const fetchData = async (startDate, endDate) => {
    const data = {
      startDate: startDate,
      endDate: endDate
    }
    try {
      const res = await getListEvents(data, token);
      console.log(res);
      if (res.responseCode == 200) {
        // setEvent(res.data);
        console.log(res.data.filter((item) => item.status === 'Completed'));
        setCompletedTask(res.data.filter((item) => item.status === 'Completed'));
        setNewTask(res.data.filter((item) => item.status === 'New Task'));
        setInProcessTask(res.data.filter((item) => item.status === 'In Progress'));
        setSubmitedTask(res.data.filter((item) => item.status === 'Submitted'));
      } else {
        toast.error(res.response.data.message)
      }
    } catch (error) { }
  };

  const handleChange1 = (event) => {
    if (event.target.value == 20) {
      item.status = "Completed"
      item.completeDate = moment().valueOf()
    } else {
      item.completeDate = 0;
    }
    if (event.target.value == 10) item.status = "Submitted"
    if (event.target.value == 30) item.status = "In Progress"
    if (event.target.value == 40) item.status = "New Task"
    updateEvent(item, token)
      .then((res) => {
        if (res.responseCode === 200) {
          toast.success("Success");
          const startDate = moment().startOf('years').startOf('days').valueOf();
          const endDate = moment().endOf('months').valueOf();
          fetchData(startDate, endDate);
        }
        else toast.error("Error");
      })
    setAge1(event.target.value);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };


  const handleOpen = (item) => {
    // console.log(item)
    console.log(map[item.status]);
    setAge1(map[item.status]);
    setOpen(true);
    setItem(item);
  }
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [openNewEvent, setOPenNewEvent] = useState(false);
  const handleCloseModal = (messageToast, eventNew) => {
    if (messageToast != null) {
      toast.success(messageToast);
      const startDate = moment().startOf('years').startOf('days').valueOf();
      const endDate = moment().endOf('months').valueOf();
      fetchData(startDate, endDate);
    }
    setOPenNewEvent(false);
  };
  return (
    <Page title="Task">
      <Container >
        <HeaderBreadcrumbs
          heading="Task"
          links={[{ name: 'Dashboard', href: '' }, { name: 'Task' }]}
          action={

            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={() => setOPenNewEvent(true)}
            >
              New Task
            </Button>
          }
        />
        <Grid container spacing={2}>
          <Grid style={{ paddingTop: "0px" }} item xs={12}>

            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="New Task" {...a11yProps(0)} />
              <Tab label="In progress" {...a11yProps(1)} />
              <Tab label="Submited" {...a11yProps(2)} />
              <Tab label="Completed" {...a11yProps(3)} />
            </Tabs>
            <TabPanel className={`flex w-[100%]`} value={value} index={0}>
              {newTask.map((item, index) => (
                <TaskItem show={() => { handleOpen(item) }} data={item} key={index} />
              ))}
            </TabPanel>
            <TabPanel value={value} index={1} className="">
              {inProcessTask.map((item, index) => (
                <TaskItem show={() => { handleOpen(item) }} data={item} key={index} />
              ))}
            </TabPanel>
            <TabPanel className="" value={value} index={2}>
              {submitedTask.map((item, index) => (
                <TaskItem show={() => { handleOpen(item) }} data={item} key={index} />
              ))}
            </TabPanel>
            <TabPanel className="" value={value} index={3}>
              {completedTask.map((item, index) => (
                <TaskItem show={() => { handleOpen(item) }} data={item} key={index} />
              ))}
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            <TaskDetail data={item} age1={age1} handleClose={handleClose} handleOpen={handleOpen} open={open} setAge1={setAge1} open1={open1} setOpen1={setOpen1} handleChange1={handleChange1} handleClose1={handleClose1} handleOpen1={handleOpen1} />
          </Grid>
        </Grid>

      </Container>
      <DialogAnimate open={openNewEvent} onClose={() => handleCloseModal()} >
        <DialogTitle variant='h3' sx={{ fontStyle: 'normal', color: '#48409E', }}>
          New Task
        </DialogTitle>
        <CalendarForm handleCloseModal={handleCloseModal} />
        {/* <DialogActions sx={{ margin: '24px'}} >
            <Button variant="outlined" color="error" autoFocus onClick={handleCloseModal}>Cancel</Button>
            <Button variant="outlined" onClick={()=>console.log(selectedEvent)}>Save change</Button>
          </DialogActions> */}
      </DialogAnimate>
      <ToastContainer />
    </Page>
  );
};

export default Task;