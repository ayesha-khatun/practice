import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const DelayResponse = () => {
  const [users, setUsers] = useState([]);
  const [time, setTime] = useState(2);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);  
    }
  }, [currentUser]);
  const loadUsers = async () => {
    const res = await axios.get(`https://reqres.in/api/users?delay=${time}`);
    setUsers(res.data.data);
  };
  useEffect(() => {
    loadUsers();
  }, [time]);
  useEffect(() => { }, [time]);

  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
    <div className="">
      <div className="col-md-12">
        <div className="container">
          <h3 className="p-3 text-center">Display All User in Delay response</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Picture</th>
               
              </tr>
            </thead>
            <tbody>
              {users && users.map((user, index) =>
                <tr key={index} >
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.avatar}</td>
                  
                
                </tr>

              )}
            </tbody>
          </table>
        </div>

      
      </div>
    </div>
  ));
};

export default DelayResponse;


