import React, { useState, useEffect } from "react";
import UserDataService from "../../services/UserService";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const User = props => {
  const initialUserState = {
    id: null,
    name: "",
    job: "",

  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const { user: currentUserr } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUserr) {
      console.log(currentUserr);  
    }
  }, [currentUser]);
  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };


  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        setMessage("User updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        props.history.push("/dashboard");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">avatar</label>
              <input
                type="text"
                className="form-control"
                id="avatar"
                name="avatar"
                value={currentUser.avatar}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={currentUser.first_name}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success mr-2"
            onClick={updateUser}
          >
            Update
          </button><span><Link to="/userList">Back</Link></span>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User</p>
        </div>
      )}
    </div>
  ));
};

export default User;
