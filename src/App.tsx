import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BikeManagement } from './components/BikeManagement';
import { ThemeProvider } from './context/ThemeContext';
import { BikeProvider } from './context/BikeContext';

function App() {
  return (
    <ThemeProvider>
      <BikeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BikeManagement />} />
          </Routes>
        </Router>
      </BikeProvider>
    </ThemeProvider>
  );
}

export default App;