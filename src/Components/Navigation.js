import React from 'react';
import {NavLink} from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';

const Navigation = (props) => {

    const VISITOR = 'visitor';
    const ADMIN = 'admin';


    const logout = async () => {
        await fetch(process.env.REACT_APP_API+'auth/logout',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        });
        props.setLoggingState(false);
        props.user.UserRole = 'visitor';
    }

    let menu;
    if (props.isLoggedIn)
    {
        menu = (
            <NavLink to='/' onClick={logout} className="nav-link" >
                <Dropdown.Item href="/">Deconectare</Dropdown.Item>
            </NavLink>
        );
    }  else {
        menu = (
            <NavLink to="/" className="nav-link" >
                <Dropdown.Item href="/">Autentificare</Dropdown.Item>
            </NavLink>
        );
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <div>
                        { props.isLoggedIn && getRole() !== VISITOR && 
                            <NavLink id="exceptionlink" to="/Profile" className="navbar-brand">Bună {props.user.Name}!</NavLink> }
                        { props.isLoggedIn && getRole() === ADMIN && 
                            <NavLink  to="/config" className="navbar-brand">Configurație</NavLink> }
                        { props.isLoggedIn && getRole() !== VISITOR && <NavLink to="/Department" className="navbar-brand">Departamente</NavLink> }
                        { props.isLoggedIn && getRole() !== VISITOR && <NavLink to="/Employee" className="navbar-brand">Angajați</NavLink> }
                        { props.isLoggedIn && getRole() !== VISITOR && <NavLink to="/Flyer" className="navbar-brand">Stat de plată</NavLink> }
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                Setări
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                {props.isLoggedIn && getRole() !== 'visitor' &&  
                                <NavLink to="/Profile" className="nav-link" >
                                <Dropdown.Item href="/Profile">Profil</Dropdown.Item>
                                </NavLink>
                                }
                                {menu}

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </div>
    );

function getRole()
  {
    return props.user.UserRole;
  }
};

export default Navigation;