import { sample } from 'lodash';

// ----------------------------------------------------------------------
const currentDate = new Date();

function randomTimeRange() {
    // Lấy ngày hiện tại
  
    let randomDayOfWeek = Math.floor(Math.random() * 30 - 14) ;

    while(randomDayOfWeek === 0){
      randomDayOfWeek = Math.floor(Math.random() * 30 - 14) ;
    }
  
    const startDay = currentDate.getDate() + randomDayOfWeek;
    const endDay = startDay;
  
    // Lấy thời gian bắt đầu trong ngày
    const startHour = Math.floor(Math.random() * 24); // Giờ bắt đầu (0-23)
    const startMinute = Math.floor(Math.random() * 60); // Phút bắt đầu (0-59)
    const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), startDay, startHour, startMinute);
  
    // Lấy thời gian kết thúc trong ngày
    const endHour = startHour + Math.floor(Math.random() * (24 - startHour)); // Giờ kết thúc lớn hơn hoặc bằng giờ bắt đầu
    const endMinute = Math.floor(Math.random() * 60); // Phút kết thúc (0-59)
    const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), endDay, endHour, endMinute);
  
    return {
      start: startTime,
      end: endTime
    };
  }

const EVENT_NAME = [
    'Làm việc văn phòng',
    'Chăm sóc gia đình',
    'Đi mua sắm',
    'Thể dục',
    'Học tập',
    'Dọn dẹp nhà cửa',
    'Nấu ăn',
    'Đọc sách',
    'Xem phim',
    'Gặp bạn bè',
    'Chơi game',
    'Đá bóng',
    'Code'
];
// const EVENT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------
const COLOR_OPTIONS = [
  {
    label: 'Việc nhà',
    color: '#00AB55'
  }, 
  {
    label: 'Nghỉ ngơi',
    color:  '#FF4842'
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
    color:  '#FFC107'
  },
  {
    label: 'Học tập',
    color:  '#04297A'
  },
  {
    label: 'Thể thao',
    color:  '#7A0C2E'
  }
];

const monthEvents = [...Array(30)].map((_, index) => ({
    id: index,
    title: sample(EVENT_NAME),
    color: sample(COLOR_OPTIONS).color,
    allDay: sample(true, false),
    repeat: sample(['none', 'Every day', 'Every week', 'Every month']),
    alert: sample(['none', 'Every day', 'Every week', 'Every month']),
    description: "",
    ... randomTimeRange()
}));


const todayEvent = [{
  id: 30,
  title: 'Thể dục',
  color: '#54D62C',
  allDay: sample(true, false),
  repeat: sample(['none', 'Every day', 'Every week', 'Every month']),
  alert: sample(['none', 'Every day', 'Every week', 'Every month']),
  description: "",
  start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 7,0),
  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 7,30),
},
{
  id: 31,
  title: 'Ăn sáng',
  color: '#54D62C',
  allDay: sample(true, false),
  repeat: sample(['none', 'Every day', 'Every week', 'Every month']),
  alert: sample(['none', 'Every day', 'Every week', 'Every month']),
  description: "",
  start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8,0),
  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8,30),
},
{
  id: 32,
  title: 'Code',
  color: '#FFC107',
  allDay: sample(true, false),
  repeat: sample(['none', 'Every day', 'Every week', 'Every month']),
  alert: sample(['none', 'Every day', 'Every week', 'Every month']),
  description: "",
  start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9,0),
  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11,30),
},
{
  id: 33,
  title: 'Nghỉ trưa',
  color: '#FF4842',
  allDay: sample(true, false),
  repeat: sample(['none', 'Every day', 'Every week', 'Every month']),
  alert: sample(['none', 'Every day', 'Every week', 'Every month']),
  description: "",
  start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12,0),
  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13,0),
},
{
  id: 34,
  title: 'Đá bóng',
  color: '#1890FF',
  allDay: sample(true, false),
  repeat: sample(['none', 'Every day', 'Every week', 'Every month']),
  alert: sample(['none', 'Every day', 'Every week', 'Every month']),
  description: "",
  start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17,0),
  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18,30),
},

]

const events = [...monthEvents, ...todayEvent];

export default events;

