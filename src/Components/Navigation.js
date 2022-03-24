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
    }

    let menu;

    if (props.isLoggedIn)
    {
        menu = (
            <NavLink to='/Login' onClick={logout} className="nav-link" >Logout

            </NavLink>
        );
    }  else {
        menu = (
            <NavLink to="/Login" className="nav-link" >Login
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
                                </NavLink>

                                {menu}

                                <NavLink to="/Register" className="nav-link" >Register
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