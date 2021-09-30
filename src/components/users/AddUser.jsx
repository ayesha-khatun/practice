import React, { useState ,useEffect} from "react";
import UserDataService from "../../services/UserService";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const AddUser = () => {
  const initialUserState = {
    id: null,
    name: "",
    job: "",

  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);  
    }
  }, [currentUser]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      name: user.name,
      job: user.job
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          job: response.data.job,

        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>User Added successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="job">Job</label>
            <input
              type="text"
              className="form-control"
              id="job"
              required
              value={user.job}
              onChange={handleInputChange}
              name="job"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success mr-2">
            Submit
          </button><span><Link to="/userList">Back</Link></span>
        </div>
      )}
    </div>
  ));
};

export default AddUser;