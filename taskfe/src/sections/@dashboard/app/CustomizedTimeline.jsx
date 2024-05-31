import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Typography from '@mui/material/Typography';

export default function CustomizedTimeline({ index, time, title }) {
  return (
    <>
      {index % 2 === 0 ?
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            {time}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <SportsGymnasticsIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ alignSelf: 'center' }}>
            <Typography variant="h6" component="span">
              {title}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        :
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {time}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <FastfoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ alignSelf: 'center' }}>
            <Typography variant="h6" component="span">
              {title}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      }
    </>
  );
}

