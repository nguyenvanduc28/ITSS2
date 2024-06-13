import * as React from 'react';
import PropTypes from 'prop-types';
import { Box,  Typography, Container, DialogTitle, TextField, Dialog, DialogContent, DialogActions } from '@mui/material'
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page"
import { useState, useEffect } from 'react';
import { Empty } from 'antd'
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { updateEvent } from '../../services/events/createEvent';

import { Button } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
import TodoItem from '../../components/TodoItem';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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

const Task = () => {
  const [openNewEvent, setOPenNewEvent] = useState(false);
  const handleCloseModal = () => {
    // if (messageToast != null) {
    //   toast.success(messageToast);
    //   const startDate = moment().startOf('years').startOf('days').valueOf();
    //   const endDate = moment().endOf('months').valueOf();
    //   fetchData(startDate, endDate);
    // }
    setOPenNewEvent(false);
    setTodoTitle('')
  };

  const [listTask, setListTask] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('listTask'));
    if(localStorage.getItem('listTask')) {
      setListTask(storedTasks);
      setIsEmpty(storedTasks.length === 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listTask', JSON.stringify(listTask));
    setIsEmpty(listTask.length === 0);
  }, [listTask])
  const [todoTitle, setTodoTitle] = useState([''])

  const handleTaskCompleted = (index) => {
    const updatedList = listTask.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setListTask((updatedList));
  };

  // const sortTasks = (tasks) => {
  //   return tasks.sort((a, b) => a.completed - b.completed);
  // };

  const handleAddNewTodo  = () => {
    const dateTime = moment(valueDate.$d.valueOf()).format('YYYY-MM-DD HH:mm:ss');
    if (todoTitle.trim() !== '') {
      setListTask([...listTask, { title: todoTitle, completed: false, date: dateTime }]);
      toast.success("Create todo successfully");
    }
    handleCloseModal();
  }

  const handleDeleteTask = (index) => {
    const updatedList = listTask.filter((task, i) => i !== index)
    setListTask(updatedList);
  }

  const groupTasksByDate = (tasks) => {
    return tasks.reduce((groups, task) => {
      const date = moment(task.date).format('YYYY-MM-DD');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(task);

      // Sắp xếp task trong mỗi ngày
      Object.keys(groups).forEach(date => {
        groups[date].sort((a, b) => a.completed - b.completed);
      });
      return groups;
    }, {});
  };

  
  
  const [valueDate, setValueData] = useState(dayjs(moment().valueOf()));
  const groupedTasks = groupTasksByDate(listTask);
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => moment(b).diff(moment(a))); // sắp xếp theo ngày giảm dần
  const totalCompletedTasks = listTask.filter(task => task.completed).length;
  return (
    <Page title="Task">
      <Container >
        <HeaderBreadcrumbs
          heading="My Todo List"
          links={[{ name: 'Dashboard', href: '' }, { name: 'Task' }]}
          action={

            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={() => setOPenNewEvent(true)}
            >
              New Todo
            </Button>
          }
        />
          {
            isEmpty ? 
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> : 
              sortedDates.map((date, index) => (
                <div key={index}>
                  <h4 style={{ margin: 0 }}>{moment(date).format('dddd, D MMM YYYY')}</h4>
                  {groupedTasks[date].map((task, i) => (
                    <TodoItem
                      key={i}
                      task={task}
                      index={listTask.indexOf(task)}
                      handleTaskCompleted={handleTaskCompleted}
                      handleDeleteTask = {handleDeleteTask}
                    />
                  ))}
                </div>
              ))
          }
          {
            !isEmpty && (
              <div  style={{position: 'absolute', bottom: '10px', fontWeight: '600'}}>
                <span style={{marginRight: '4px'}}>Total completed task:</span>
                {totalCompletedTasks}
              </div>
            )
          }
        
      </Container>

      <Dialog
        open={openNewEvent}
        onClose={() => handleCloseModal()}
      >
        <DialogTitle >New Todo</DialogTitle>
        <DialogContent sx={{width: '600px', overflowY: 'unset'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Choose day" 
              sx={{width: '100%', mb: 4}} 
              value={valueDate} 
              views={['year', 'month', 'day']}
              onChange={(newValue) => setValueData(newValue)}/>
        </LocalizationProvider>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTodoTitle(e.target.value)
            }}
            value={todoTitle}
            onKeyUp={(e) => {
              if(e.keyCode === 13) {
                handleAddNewTodo()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal()}>Cancel</Button>
          <Button type="submit" onClick={() => handleAddNewTodo()}>Add</Button>
        </DialogActions>
      </Dialog>
      
      <ToastContainer />
    </Page>
  );
};

export default Task;