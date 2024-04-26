import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import Login from './Modules/Auth/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: '/upload',
        //   element: <Upload/>
        // },
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
