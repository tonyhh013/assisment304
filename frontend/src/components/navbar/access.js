import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { mq } from '../../responsive';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken, removeAuthToken } from "../../utils/localstorage";
import { Link as LK } from 'react-router-dom';
import { loginSetDefault,paymentClear,deleteAllCartRequestSuccess } from "../../actions/actions";
const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #6adf76;
  background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid #00c9ff;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;
const Count = styled.div`
  background: #319795;
  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  position: absolute;
  top: -0px;
  right: -8px;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.animated {
    animation: add 1s 1;
  }
  @keyframes add {
    50% {
      transform: scale(1.5);
    }
  }
`;
const MenuItem = styled(Link)`
  font-size: 22px;
  cursor: pointer;
  left:-22px;
  top:12px;
  position: relative;
  transition: color 0.2s;
  &:hover {
    color: #666;
  }
  ${mq({ fontSize: '22px', marginLeft: '16px' }, 600)}
`;


export function Access(props) {
  //onst notInitialRender = useRef(false);
  const countEl = useRef(null);
  const localToken = getAuthToken();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const cart = useSelector((state) => state.cartReducer);
  const onLogOut = () => {
    removeAuthToken();
    dispatch(loginSetDefault());
    dispatch(paymentClear());
    dispatch(deleteAllCartRequestSuccess());
    navigate('/');
    //document.location = "/";
  };


  return (
    <AccessibilityContainer>
      {!localToken && (
        <>
          <LK to="/register"><RegisterButton>Register</RegisterButton></LK>
          <LK to="/login"><LoginButton>Lonin</LoginButton></LK>
        </>
      )}
      {localToken && (
        <>
        <MenuItem to="/cart"><FaShoppingCart style={{ verticalAlign: 'middle' }} />
            {cart.products.items[0].items.length > 0 && <Count ref={countEl}>{cart.products.items[0].items.length}</Count>}
          </MenuItem>
        <LoginButton><LK to="/order">Order</LK></LoginButton>
        <LoginButton onClick={onLogOut}>Logout</LoginButton>
        </>
      )}

    </AccessibilityContainer>
  );
}
