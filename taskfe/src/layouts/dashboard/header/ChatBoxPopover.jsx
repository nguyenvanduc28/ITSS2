import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Rating, Typography, IconButton, Popover, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Iconify from '../../../components/iconify';
import { getListEventNoti } from '../../../services/events/getListEvent';
import moment from 'moment';

const ChatFAQ = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [eventList, setEventList] = useState(() => {
    const savedEvents = localStorage.getItem('eventList');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('eventList');
    savedEvents ? JSON.parse(savedEvents) : localStorage.setItem('eventList', '[]');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDataNoti();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleReadEvent = (eventT) => {
    let eventTmp = eventList.map((event) => {
      if (event.id === eventT.id) {
        return {
          ...event,
          isReaded: true
        };
      } else {
        return event;
      }
    });

    setEventList(eventTmp);
    localStorage.setItem('eventList', JSON.stringify(eventTmp));
  };

  const fetchDataNoti = async () => {
    try {
      const res = await getListEventNoti();
      if (res.responseCode === 200) {
        if (res.data.length > 0) {
          let eventsNoti = res.data.map((event) => {
            return {
              ...event,
              isReaded: false
            };
          });

          const eventListTmp = [
            ...eventsNoti, ...eventList
          ]

          setEventList(eventListTmp);
          localStorage.setItem('eventList', JSON.stringify(eventListTmp));
        }
      }
    } catch (error) { }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'chat-faq-popover' : undefined;

  return (
    <Box>
      <IconButton onClick={handleClick}>
        {/* {open ? <ExpandLessIcon sx={{ fontSize: '30px' }} /> : <ExpandMoreIcon sx={{ fontSize: '30px' }} />} */}
        {eventList.some((item) => item.isReaded == false) ?
          <Iconify icon="octicon:bell-fill-16" sx={{ fontSize: '30px' }} />
          :
          <Iconify icon="octicon:bell-16" sx={{ fontSize: '30px' }} />
        }
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Notification
          </Typography>

          <List sx={{ width: '600px', bgcolor: 'background.paper', paddingLeft: '20px' }}>
            {eventList.map((value) => (
              <ListItem key={value} onClick={() => handleReadEvent(value)} sx={{ background: value.isReaded ? 'white' : '#f5f3f3', borderBottom: '1px solid white', paddingLeft: '10px', paddingRight: '10px' }} disableGutters secondaryAction={
                <Rating
                  disabled
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
        </Box>
      </Popover>
    </Box>
  );
};

export default ChatFAQ;
