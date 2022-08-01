import axios from "axios";

const loginUserApi = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

export const loginMiddleware = async data => {
  const { username, password } = data.user;
  const response = await loginUserApi.post("http://localhost:3332/api/v1/users/login", {
    username,
    password
  });
  return response;
};
export const loginGoogleMiddleware = async data => {
  const {mail } = data;
  const response = await loginUserApi.post("http://localhost:3332/api/v1/users/loginGoogle", {
    mail,
  });
  return response;
};
