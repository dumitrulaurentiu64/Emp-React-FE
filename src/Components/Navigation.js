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
        console.log(props.isLoggedIn + 'BEFORE logout hahahahah');
        props.setLoggingState(false);
        console.log(props.isLoggedIn + 'AFTER logout hahahahah');
        window.location.pathname = ('/login');
    }

    let menu;

    if ( props.isLoggedIn === true )
    {
        menu = (
            <NavLink onClick={logout} to="/Login" className="nav-link" >Logout
                {/* <Dropdown.Item href="/Login">Logout</Dropdown.Item> */}
            </NavLink>
        );
    }  else {
        menu = (
            <NavLink to="/Login" className="nav-link" >Login
                {/* <Dropdown.Item href="/Login">Login</Dropdown.Item> */}
            </NavLink>
        );
    }
          
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <div>
                        <NavLink to="/" className="navbar-brand">Home</NavLink>
                        <NavLink to="/Department" className="navbar-brand">Department</NavLink>
                        <NavLink to="/Employee" className="navbar-brand">Employee</NavLink>
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                Settings
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">

                                <NavLink to="/Profile" className="nav-link" >Profile
                                    {/* <Dropdown.Item href="/Profile">Profile</Dropdown.Item> */}
                                </NavLink>

                                {menu}

                                <NavLink to="/Register" className="nav-link" >Register
                                    {/* <Dropdown.Item href="/Register">Register</Dropdown.Item> */}
                                </NavLink>

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;