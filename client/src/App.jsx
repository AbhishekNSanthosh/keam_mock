import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import Login from './Modules/Auth/Login/Login';
import Home from './Modules/Home/Home';
import Exam from './Modules/Exam/Exam';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          path: '/dashboard/home',
          element: <Home />
        },
        {
          path: '/dashboard/exam',
          element: <Exam />
        },
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
