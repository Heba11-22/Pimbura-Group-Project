import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileDropDown';
import SearchForm from './SearchForm';
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navlist">
        <div className="navbar-left">
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Overshare
            </NavLink>
          </li>
        </div>
        <div className="navbar-center">
          <SearchForm />
        </div>
        <div className="navbar-right">
          <li>
            <NavLink to="/" exact={true} activeClassName="active" className="upload-nav2">
              <i className="home icon right-list"/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" exact={true}>
              <i className="compass outline icon right-list"/>
            </NavLink>
            <NavLink to="/upload" exact={true} activeClassName="active" className="upload-nav">
              <i className="upload icon right-list"/>
            </NavLink>
             {/* If we have chat we will put the icon: */}
            {/* <NavLink to="/" exact={true} activeClassName="active">
              <i className="comment alternate outline icon right-list"/>
            </NavLink> */}
          </li>
          <li className="right-list">
            <ProfileButton/>
          </li>
          {/* <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li> */}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
