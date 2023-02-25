import React from 'react';
import {BrowserRouter  as Router} from 'react-router-dom'; 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { setCurrentUser } from './actions/CurrentUser';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch = useDispatch()

  //whenever the application is live useEffect will run
  useEffect(() => {
    dispatch( fetchAllQuestions()) //gAQ 7
    dispatch(fetchAllUsers())
  }, [dispatch]); //whenever we are using 'dispatch' useEffect will run


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
