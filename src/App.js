import './App.css';
import {Department} from './Components/Department';
import React, { useEffect, useState } from "react";
import {Employee} from './Components/Employee';
import {Home} from './Components/Home';
import {Login} from './Components/Login';
import {Register} from './Components/Register';
import Navigation from './Components/Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  const [isLoggedIn, changeLoggingState] = useState(false);
  const setLoggingState = (logState) => changeLoggingState(logState);

  useEffect(() => {
    (
        async () => {
            const response = await fetch(process.env.REACT_APP_API+'auth/user',{
              method:'GET',
              headers:{'Content-Type':'application/json'},
              credentials: 'include'
              });

            const content = await response.json();

            console.log(content);
            console.log(isLoggedIn + ' user hahahahahhaha');
            if(content.title !== 'Unauthorized')
            {
              setLoggingState(true) ;
            }
            console.log(isLoggedIn + ' user hahahahahhaha');
        }
    )();
  });

  return (
    <BrowserRouter>
      <div className="container">
      <h3 className ="m-3 d-flex justify-content-center">
        Employee App
      </h3>
    </div>

    <Navigation isLoggedIn={isLoggedIn} setLoggingState={setLoggingState} />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/department' element={<Department/>}/>
      <Route path='/employee' element={<Employee/>}/>
      <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setLoggingState={setLoggingState}/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
