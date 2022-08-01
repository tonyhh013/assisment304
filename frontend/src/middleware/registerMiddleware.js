import axios from "axios";

const registerUserApi = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

const registerMiddleware = async data => {
  const { email, password } = data.user;
  const response = await registerUserApi.post(
    "http://localhost:3332/api/v1/users/createUser",
    { email, password }
  );
  return response;
};

export default registerMiddleware;

