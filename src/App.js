import './App.css';
import {Department} from './Components/Department';
import React, { useEffect, useState } from "react";
import {Employee} from './Components/Employee';
import {Home} from './Components/Home';
import {Login} from './Components/Login';
import {Register} from './Components/Register';
import Navigation from './Components/Navigation';
import {Profile} from './Components/Profile';
import Flyer from './Components/Flyer';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  const [isLoggedIn, changeLoggingState] = useState(false);
  const [role, setRole] = useState('visitor');
  const [code, setCode] = useState(0);
  const [email, setEmail] = useState('default@email.com');
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
            console.log('below is the content');
            console.log(content);
            console.log(isLoggedIn + ' user hahahahahhaha');
            if(content.title !== 'Unauthorized')
            {
              setRole(content.User_Role);
              setCode(content.Id);
              setEmail(content.Email);
              setLoggingState(true);
            }
            console.log(role + ' <- this is the user role');
            console.log(isLoggedIn + ' user hahahahahhaha');
            console.log(!(role === 'visitor'));
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

    <Navigation isLoggedIn={isLoggedIn} setLoggingState={setLoggingState} role={role} setRole={setRole}/>
    <Routes>
      { isLoggedIn && role === 'admin' && <Route path='/' element={<Home/>} /> }
      { isLoggedIn && role === 'admin' && <Route path='/department' element={<Department/>}/> }
      { isLoggedIn && role === 'admin' && <Route path='/employee' element={<Employee/>}/> }
      { isLoggedIn && role !== 'visitor' && <Route path='/flyer' element={<Flyer/>}/> }
      { isLoggedIn && role !== 'visitor' && <Route path='/profile' element={<Profile code={code} email={email}/>}/> }
      { !isLoggedIn && <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setLoggingState={setLoggingState}/>} /> }
      <Route path='/register' element={<Register/>} /> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
