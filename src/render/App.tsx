import './App.css'
import { } from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom"
import RootPage from './pages/RootPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import Statusbar from './components/Statusbar';

function App() {
  const router = createHashRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "list",
          element: <ListPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="w-[100vw] h-[100vh] font-tenada">
        <Statusbar />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App
