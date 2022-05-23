import './App.css';
import {Department} from './Components/Department';
import React, { useEffect, useState } from "react";
import {Employee} from './Components/Employee';
import Home from './Components/Config';
import {Login} from './Components/Login';
import Navigation from './Components/Navigation';
import {Profile} from './Components/Profile';
import Flyer from './Components/Flyer';
import Footer from './Components/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const VISITOR = 'visitor';
const ADMIN = 'admin';

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
            if(content.title !== 'Unauthorized')
            {
              props.user.Id = content.Id;
              props.user.User_Role = content.User_Role;
              props.user.Email = content.Email;
              props.user.Name = content.Firstname;
              setLoggingState(true);
            }
          }
    )();
  });

  return (
    <div>
      <BrowserRouter>
        <div className="container" id="AppTitle">
        <h3 className ="m-3 d-flex justify-content-center">
          Salary Application
        </h3>
      </div>

      <Navigation isLoggedIn={isLoggedIn} setLoggingState={setLoggingState} user={props.user}/>
      <Routes>
        { !isLoggedIn && <Route path='/' element={<Login 
          user={props.user} isLoggedIn={isLoggedIn} setLoggingState={setLoggingState} />} /> }
        { isLoggedIn && getRole() !== VISITOR && <Route path='/department' element={<Department user={props.user}/>}/> }
        { isLoggedIn && getRole() !== VISITOR && <Route path='/employee' element={<Employee user={props.user}/>}/> }
        { isLoggedIn && getRole() !== VISITOR && <Route path='/flyer' element={<Flyer user={props.user}/>}/> }
        { isLoggedIn && getRole() !== VISITOR && <Route path='/profile' element={<Profile user={props.user}/>}/> }
        { isLoggedIn && getRole() === ADMIN && <Route path='/config' element={<Home/>} /> }
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );

  function getRole()
  {
    return props.user.User_Role;
  }
}
export default App;
