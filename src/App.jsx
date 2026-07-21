import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Resultado from './components/Resultado';
import { ThemeProvider } from './ThemeContext';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resultado" element={<Resultado />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
