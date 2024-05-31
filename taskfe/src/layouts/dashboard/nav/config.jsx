// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'schedule',
    path: '/schedule',
    icon: icon('ic_schedule'),
  },
  {
    title: 'task',
    path: '/task',
    icon: icon('ic_task'),
  },
  {
    title: 'setting',
    path: '/setting',
    icon: icon('ic_dashboard'),
  },
];

export default navConfig;
