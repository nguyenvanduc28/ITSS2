import React, { useState } from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography, IconButton, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Iconify from '../../../components/iconify';


const chatItems = [
  {
    id: 1,
    question: 'How can I reset my password?',
    answer: 'To reset your password, go to the "Forgot Password" page and follow the instructions.',
  },
  {
    id: 2,
    question: 'How to update the status of tasks?',
    answer: 'Go to the Task section then select the task that needs to be updated and update it',
  },
  // Add more chat items here
];

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

const ChatFAQ = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
        <Iconify icon="flat-color-icons:faq" sx={{ fontSize: '30px' }}/>
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
            Chat FAQs
          </Typography>

          <StyledList>
            {chatItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ChatIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.question}
                  secondary={item.answer}
                />
              </ListItem>
            ))}
          </StyledList>
        </Box>
      </Popover>
    </Box>
  );
};

export default ChatFAQ;
