import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
/*
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';

import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
*/
import Page404 from './pages/Page404';

import Dashboard from './pages/dashboard/dashboard';
import Schedule from './pages/schedule/schedule';
import Task from './pages/task/task'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'task', element: <Task /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
