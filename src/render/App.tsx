import { useEffect, useRef } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom"
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';
import Spinner from './components/common/Spinner';
import useLoaderStore from './store/useLoaderStore';

function App() {
  const isLoad = useLoaderStore((state) => state.isLoad);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.electron.window.onGetSize(({ width, height }) => {
      if (appRef.current) {
        appRef.current.style.width = `${width}px`;
        appRef.current.style.height = `${height}px`;
      }
    });
  }, []);

  return (
  
    <div>
      {isLoad && <Spinner />}
      <div ref={appRef} className="app">
        <HashRouter>
          <Routes>
            <Route element={<RootPage />} >
              <Route element={<HomePage />} path="/home" />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App
