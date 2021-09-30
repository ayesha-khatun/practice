import http from "../http-common";

const getAll = () => {
  return http.get("/unknown");
};

const get = id => {
  return http.get(`/unknown/${id}`);
};

export default {
  getAll,
  get
};