import { useState,useEffect } from 'react';
import { Link,Navigate } from "react-router-dom";
import styled from 'styled-components';
import { mq } from '../../responsive';
//import { setAuthToken } from "../../utils/localstorage";
import { useSelector, useDispatch } from 'react-redux';
import { registerUser,registerUserDefault } from "../../actions/actions";

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 40px 0;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  align-items: center;
  border-style: solid;
  padding: 16px;
  width: 80%;
  background: white;
  height:390px;
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
  width: 100%;
  border: none;
  padding: 12px 16px;
  background: #319795;
  color: #fff;
  cursor: pointer;
  margin: 16px auto;
  text-transform: uppercase;
  ${mq({ width: '40%' }, 600)}
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = {
    email,
    password
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerUserDefault());
}, [dispatch])
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };
  const GlobalUser = useSelector((state) => state.registerReducer);
  if (GlobalUser.token!==""){
    //setAuthToken(GlobalUser.token);
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Register</Title>
          {GlobalUser.isAuthenticated? (
            <>
            <h1>Create User Successful</h1>
            </>
          ):(
          <>
          <Form onSubmit={handleRegister}>
            <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button>Register</Button>
              {GlobalUser.showModal && <Error>{GlobalUser.error.message}</Error>}
              <Linkk to="/login">Login</Linkk>
          </Form>
          </>
          ) }
          
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
