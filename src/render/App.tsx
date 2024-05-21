import './App.css'
import { } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom"
import RootPage from './pages/RootPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import Statusbar from './components/Statusbar';
import Spinner from './components/common/Spinner';
import useLoaderStore from './store/useLoaderStore';

function App() {
  const isLoad = useLoaderStore((state) => state.isLoad);

  return (
    <>
      <div className="w-[100vw] h-[100vh] font-tenada">
        {isLoad && <Spinner />} 
        <Statusbar />
        <HashRouter>
          <Routes>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RootPage />} >
              <Route element={<HomePage />} path="/home" />
              <Route element={<ListPage />} path="/list" />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App
