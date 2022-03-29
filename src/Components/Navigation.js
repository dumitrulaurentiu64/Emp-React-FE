import React from 'react';
import {NavLink} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Navigation = (props) => {


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
        props.setRole('visitor');
    }

    let menu;

    if (props.isLoggedIn)
    {
        menu = (
            <NavLink to='/Login' onClick={logout} className="nav-link" >
                <Dropdown.Item href="/Login">Logout</Dropdown.Item>
            </NavLink>
        );
    }  else {
        menu = (
            <NavLink to="/Login" className="nav-link" >
                <Dropdown.Item href="/Login">Login</Dropdown.Item>
            </NavLink>
        );
    }
          
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <div>
                        { props.isLoggedIn && props.role === 'admin' && <NavLink to="/" className="navbar-brand">Configuration</NavLink> }
                        { props.isLoggedIn && props.role === 'admin' && <NavLink to="/Department" className="navbar-brand">Departments</NavLink> }
                        { props.isLoggedIn && props.role === 'admin' && <NavLink to="/Employee" className="navbar-brand">Employees</NavLink> }
                        { props.isLoggedIn && props.role !== 'visitor' && <NavLink to="/Profile" className="navbar-brand">Profile</NavLink> }
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                Settings
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                {props.isLoggedIn && props.role !== 'visitor' &&  
                                <NavLink to="/Profile" className="nav-link" >
                                <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
                                </NavLink>
                                }
                                {menu}
                                {props.role === 'visitor' && 
                                <NavLink to="/Register" className="nav-link" >
                                <Dropdown.Item href="/Register">Register</Dropdown.Item>
                                </NavLink>
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;