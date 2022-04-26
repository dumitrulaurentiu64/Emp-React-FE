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

function App(props) {

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
            console.log('WHAT THE HELL ' + getRole() + ' ' + isLoggedIn);
            console.log('below is the content');
            console.log(content);
            console.log(isLoggedIn + ' user hahahahahhaha');
            console.log(props.user);
            if(content.title !== 'Unauthorized')
            {
              props.user.Id = content.Id;
              props.user.User_Role = content.User_Role;
              props.user.Email = content.Email;
              props.user.Name = content.Name;
              setLoggingState(true);
              
            }
            console.log(props.user);
            console.log(props.user.User_Role + ' <- this is the user role');
            console.log(isLoggedIn + ' user hahahahahhaha');
            console.log(props.user.User_Role === 'admin'); 
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

    <Navigation isLoggedIn={isLoggedIn} setLoggingState={setLoggingState} user={props.user}/>
    <Routes>
      { isLoggedIn && getRole() === 'admin' && <Route path='/' element={<Home/>} /> }
      { isLoggedIn && getRole() === 'admin' && <Route path='/department' element={<Department/>}/> }
      { isLoggedIn && getRole() === 'admin' && <Route path='/employee' element={<Employee/>}/> }
      { isLoggedIn && getRole() !== 'visitor' && <Route path='/flyer' element={<Flyer/>}/> }
      { isLoggedIn && getRole() !== 'visitor' && <Route path='/profile' element={<Profile user={props.user}/>}/> }
      { !isLoggedIn && <Route path='/login' element={<Login user={props.user} isLoggedIn={isLoggedIn} setLoggingState={setLoggingState}/>} /> }
      <Route path='/register' element={<Register/>} /> 
    </Routes>
    </BrowserRouter>
  );


  function getRole()
  {
    return props.user.User_Role;
  }
}

export default App;
