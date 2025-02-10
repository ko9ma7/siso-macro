import { HashRouter, Route, Routes } from "react-router-dom"
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootPage />} >
          <Route element={<HomePage />} path="/home" />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
