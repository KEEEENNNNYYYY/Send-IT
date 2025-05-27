import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './logic/login';
import Dashboard from "./view/dashboard/dashboard.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
