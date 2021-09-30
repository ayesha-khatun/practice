import React, { useState, useEffect } from "react";
import ResourceDataService from "../../services/ResourceService";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [currentResource, setCurrentResource] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);  
    }
  }, [currentUser]);
  useEffect(() => {
    retrieveResources();
  }, []);
  const retrieveResources = () => {
    ResourceDataService.getAll()
      .then(response => {
        setResources(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
      <div className="list row">
      <div className="container">
        <h3 className="p-3 text-center">Display All User</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {resources && resources.map((resource, index) =>
              <tr key={index} >
                <td>{resource.id}</td>
                <td>{resource.name} </td>
                <td>
                  <button><Link
                    to={"/resource/" + resource.id}
                    className="btn btn-sm btn-warning">
                    Details
                  </Link></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ));
};

export default ResourceList;
