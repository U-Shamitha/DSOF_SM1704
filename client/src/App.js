import React from 'react';
import {BrowserRouter  as Router} from 'react-router-dom'; 

import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';

function App() {
  return (
    <div className="App">
      {/* now "Link" can be accessed from anywhere */}
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
  
    </div>
  );
}

export default App;
