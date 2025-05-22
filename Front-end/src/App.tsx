import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './logic/login'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
