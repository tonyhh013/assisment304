import React, {useEffect} from 'react'
import {Navbar} from '../../../components/navbar';
import { useDispatch } from 'react-redux';
import Form from '../Form'
import "../Login.css";
import { setAuthToken } from "../../../utils/localstorage";
import { loginUserGoogle } from "../../../actions/actions";
function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3332/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setAuthToken(resObject.jwt);
          dispatch(loginUserGoogle(resObject.jwt));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <>
    <Navbar />
    <Form />
    </>
  )
}

export default Login