import { ADDUSER_SUCCESS, ADDUSER_FAIL, UPDATEUSER_SUCCESS, UPDATEUSER_FAIL, DELETEUSER_SUCCESS, DELETEUSER_FAIL, GETALLEUSER_SUCCESS, GETALLEUSER_FAIL, GETAEUSER_SUCCESS, GETAEUSER_FAIL, GETALLRESOURCE_SUCCESS, GETALLRESOURCE_FAIL, GETARESOURCE_SUCCESS, GETARESOURCE_FAIL } from "./types";
import UserService from "../services/user.service";

export const addUser = (name, job) => (dispatch) => {
  return UserService.addUser(name, job).then(
    (response) => {
     
      dispatch({
        type: ADDUSER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.success,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString();
      dispatch({
        type: _FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updateUser = (name, job) => (dispatch) => {
  return UserService.updateUser(name, job).then(
    (data) => {
      dispatch({
        type: UPDATEUSER_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: UPDATEUSER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updateUser = (name, job) => (dispatch) => {
  return UserService.updateUser(name, job).then(
    (data) => {
      dispatch({
        type: UPDATEUSER_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: UPDATEUSER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

