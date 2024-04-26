import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import Upload from './modules/upload/Upload';
import ViewQuestion from './modules/ViewQuestion/ViewQuestion';
import Home from './modules/Home/Home';
import ViewScore from './modules/ViewScore/ViewScore';

function App() {
  const router = createBrowserRouter([
    {
      path: '/hi',
      element: <>hi</>
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/upload',
          element: <Upload/>
        },
        {
          path: '/view-score',
          element: <ViewScore/>
        },
        {
          path: '/home',
          element: <Home/>
        },
        {
          path: '/view-question',
          element: <ViewQuestion/>
        },
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
