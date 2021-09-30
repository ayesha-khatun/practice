import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { MdComputer } from "react-icons/md";
const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand">
      <Link to={"/dashboard"} className="navbar-brand">
        <MdComputer className="mr-2" />Rise Up Labs
      </Link>
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={"/userList"} className="dropdown-item text-danger">
                View User
              </Link>
              <Link to={"/delayResponse"} className="dropdown-item text-danger">
                Delay Response User
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Resource
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={"/resourceList"} className="dropdown-item text-danger">
                View Resource
              </Link>
            </div>

          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Acount
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to={"/login"} className="dropdown-item text-danger"  onClick={logOut}>
            Logout
            </Link>
             
            </div>
          </li>
        </div>

      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;