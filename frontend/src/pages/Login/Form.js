import { useState, useEffect, useCallback, useRef } from 'react';
import { Link,Navigate } from "react-router-dom";
import styled from 'styled-components';
import { mq } from '../../responsive';
import { setAuthToken } from "../../utils/localstorage";
import { useSelector, useDispatch } from 'react-redux';
import { loginSetDefault, loginUser, loginUserGoogle } from "../../actions/actions";
import { styled as muistyled } from '@mui/material/styles';
import Google from "./google.png";
import GoogleButton from 'react-google-button'

const GB =  muistyled(GoogleButton)({
  borderRadius:"50%"
});

const Container = styled.div`
  max-width: 600px;
  min-height: calc(100vh - 100px);
  padding: 40px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  align-items: center;
  border-style: solid;
  padding: 16px;
  width: 80%;
  background: white;
  height:415px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding: 8px 0;
`;

const Input = styled.input`
  flex: 1;
  margin-bottom: 8px;
  padding: 8px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 12px 16px;
  background: #319795;
  color: #fff;
  cursor: pointer;
  margin: 16px auto;
  text-transform: uppercase;
  justify-content: center;
  &:disabled {
    opacity: 0.6;
  }
`;
const Center = styled.div`
  width: 40%%;
  border: none;
  cursor: pointer;
  margin: 0px auto;
  text-transform: uppercase;
  &:disabled {
    opacity: 0.6;
  }
`;

const Error = styled.p`
  color: #e53e3e;
`;

const Linkk = styled(Link)`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;
const loadScript = (src) =>
new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve()
  const script = document.createElement('script')
  script.src = src
  script.onload = () => resolve()
  script.onerror = (err) => reject(err)
  document.body.appendChild(script)
})

const Login = () => {
  const google = () => {
    window.open("http://localhost:3332/auth/google", "_self");
  };
  const GlobalUser = useSelector((state) => state.loginReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = {
    username,
    password
  };
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loginSetDefault());
}, [dispatch])
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };



  function handleCredentialResponse(response) {
    const email=JSON.parse(atob(response.credential.split('.')[1])).email;
    dispatch(loginUserGoogle(email));
  }
  

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Sign in</Title>
          <Form onSubmit={handleLogin}>
            <Label htmlFor="username">Email</Label>
            <Input
              name="username"
              id="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Button disabled={isFetching}>Login</Button> */}
            <Button>Login</Button>
            <Center>
              
              <GB onClick={google}/>
            </Center>
            <Linkk to="/register">Create new account</Linkk>
            {GlobalUser.showModal && <Error>{GlobalUser.error.message}</Error>}
          </Form>
          {GlobalUser.token && <Navigate to="/" />}
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
