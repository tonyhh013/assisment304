import React from 'react'
//import Navbar from '../../components/Nav';
import {Navbar} from '../../components/navbar';
import Products from './Products';
import Catalog from './Catalog';
import "./Home.css";
import { getAuthToken } from "../../utils/localstorage";
function Home() {
  const localToken = getAuthToken();
  var json = {
    result: localToken
};

  return (
    <>
      <Navbar />
      <Catalog />
    
    </>
    
  )
}

export default Home