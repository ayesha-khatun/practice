import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import UserDataService from "../../services/UserService";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios from "axios";
const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [page, setPage] = useState(2);
  const { user: currentUserr } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUserr) {
      console.log(currentUserr);  
    }
  }, [currentUserr]);
  const loadUsers = async () => {
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    setUsers(res.data.data);
  };
  useEffect(() => {
    loadUsers();
  }, [page]);
  useEffect(() => { }, [page]);


  const deleteUser = () => {
  
    UserDataService.remove(currentUser.id)
      .then(response => {
        toastr.options = {
          positionClass : 'toast-top-right',
          hideDuration: 500,
          timeOut: 500
        }
        toastr.clear()
        setTimeout(() => toastr.success(`User Deleted`), 500)
        props.history.push("/dashboard");
       
      })
      .catch(e => {
        console.log(e);
      });
    
  };

  return (   (currentUser === null ?
    <Redirect to="/login" /> :
    <div className="">
     
      <div className="col-md-12">
        <div className="container">
          <h3 className="p-3 text-center">Display All User</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Picture</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user, index) =>
                <tr key={index} >
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.avatar}</td>
                  <td>  <button><Link
                    to={"/addUser"}
                    className="btn btn-sm btn-success">
                    Add
                  </Link></button>
                  </td>
                  <td>  <button><Link
                    to={"/user/" + user.id}
                    className="btn btn-sm btn-warning">
                    Edit
                  </Link></button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={deleteUser}>
                      Delete
                    </button>
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        </div>
       
        <Pagination
          count={2}
          color="secondary"
          defaultPage="page"
          variant="outlined"
          onChange={(event, value) => setPage(value)}
        />
      </div>
    </div>
  ));
};

export default UserList;


