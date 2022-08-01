import React, { useState } from "react";
import styled from "styled-components";
import { Link as LK } from 'react-router-dom';
import Mobilenavmenu from "./mobilenavmenu";
const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

export function MobileNav(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <Mobilenavmenu/>
      {/* <Menu isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <LK to="/">Home</LK>
          </LinkItem>
          <LinkItem>
          <LK to="/Map">Map</LK>
          </LinkItem>
          <LinkItem>
          <LK to="/manage">Manage</LK>
          </LinkItem>
          <Marginer />
          <Access />
        </LinksWrapper>
      )} */}
    </NavLinksContainer>
  );
}
