import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader, IconButton } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import moment from 'moment';
import Chip from '@mui/material/Chip';


const colors = {
  HIGH: '#FF7979',
  MEDIUM: '#FF7979',
};

const TaskItem = ({ data, show }) => {
  return (
    <Card style={{marginBottom:'10px', height: 200 }} onClick={show} className=" my-[20px] mx-[20px]" sx={{ width: 300 }}>
      <CardActionArea style={{ height: 200 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='flex justify-between'>
            <div>{data.title?.substring(0, 20)}...</div>
            {/* <div className={`text-[20px] w-[80px] bg-[#2065D1] text-[white] h-[30px] text-center leading-[30px] rounded-[15px]`}>
              {data.workspace}
            </div> */}
            <div style={{
              alignContent: 'center',
              fontSize: '14px',
              fontWeight: 200
            }}>
              <IconButton
                sx={{ width: 13, height: 13, marginRight: '4px', padding: 0, border: 0, borderRadius: '50%', backgroundColor: `${data.color}` }}
              />
              <span>{}</span>
              {/* {option.label} */}
            </div>
          </Typography>

          <Typography className="flex justify-between items-center" variant="body2" color="text.secondary">
            <div className="flex items-center leading-[30px] text-[#FF7979]">
              <p className="m-[0px] leading-[30px]">start: {moment(data.start).format('hh:mm DD-MM-YYYY')}</p>
              <p className="m-[0px] leading-[30px]">deadline: {moment(data.end).format('hh:mm DD-MM-YYYY')}</p>
            </div>
          </Typography>
          <Typography className="flex justify-between items-center" variant="body2" color="text.secondary">
            <div className="flex items-center leading-[30px] text-[#FF7979]">
              <p className="m-[0px] leading-[30px]">
                <Chip
                variant='outlined'
                label={data.status}
                // variant=""
                />
                {data.status == "Completed"?` at ${moment(data.completeDate).format('hh:mm DD-MM-YYYY')}`:''}</p>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TaskItem;
