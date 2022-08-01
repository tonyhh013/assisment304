import React from "react";
import { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Logo } from "../logo";
import { Access } from "./access";
import { Nav } from "./nav";
import { DeviceSize } from "../responsive";
import { MobileNav } from "./mobileNav";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from "../../utils/localstorage";
import { Link } from 'react-router-dom';
import { getCart, deleteAllCartRequestSuccess } from "../../actions/actions";
const NavbarContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  
`;
const NavbarContainerFix = styled.div`
  position:fixed;
  background-color: white;
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  
`;
const LeftSection = styled.div`
  display: flex;
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
`;

export function Navbar(props) {
  const localToken = getAuthToken();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const cart = useSelector((state) => state.cartReducer);
  const [fix, setFix] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 0 ? setFix(true) : setFix(false);
    }
  };
  // useEffect(() => {
  //   dispatch(deleteAllCartRequestSuccess())
  //   if (localToken){
  //     dispatch(getCart(localToken));
  //   }
    
  // }, []) 
  return (
    <>
    
      <NavbarContainer style={fix?{position:"fixed"}:{position:"relative"}}>
        <LeftSection>
          <Link to="/"><Logo /></Link>
        </LeftSection>
        <MiddleSection>{!isMobile && <Nav />}</MiddleSection>
        <RightSection>
          {!isMobile && <Access />}
          {isMobile && <MobileNav />}
        </RightSection>
      </NavbarContainer>
    

    </>
  )
}
