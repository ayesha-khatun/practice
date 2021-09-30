import React, { useState, useEffect } from "react";
import ResourceDataService from "../../services/ResourceService";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const Resource = props => {
  const initialResourceState = {
    id: null,
    name: "",
    year: "",
    color: "",
    pantone_value: ""

  };
  const [currentResource, setCurrentResource] = useState(initialResourceState);
  const [message, setMessage] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);  
    }
  }, [currentUser]);
  const getResource = id => {
    ResourceDataService.get(id)
      .then(response => {
        setCurrentResource(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getResource(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentResource({ ...currentResource, [name]: value });
  };
  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
    <div>
      {currentResource ? (
        <div className="edit-form">
          <h4>SingleResource</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                name="name"
                value={currentResource.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={currentResource.year}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={currentResource.color}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pantone_value">Pantone Value</label>
              <input
                type="text"
                className="form-control"
                id="pantone_value"
                name="pantone_value"
                value={currentResource.pantone_value}
                onChange={handleInputChange}
              />
            </div>
            <span><Link to="/resourceList">Back</Link></span>
          </form>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Resource Not Found</p>
        </div>
      )}
    </div>
  ));
};

export default Resource;
