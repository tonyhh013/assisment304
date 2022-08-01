import React, { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import  DialogDetail from './DialogDetail';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import image from "./test.png";
import Product from './Product'
import AddToCartButton from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,getCart, paymentClear } from "../../actions/actions";
import { getAuthToken } from "../../utils/localstorage";
//import styled from 'styled-components';
import {
  Container,
  ProductCard,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductPrice,
} from './styles';
import { useNavigate } from "react-router-dom"
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';


const OutStockButton =  styled(AddToCartButton)({
  backgroundColor:"#ccc",  
  cursor: "context-menu",
  '&:hover': {
    backgroundColor: '#ccc',
  },
});
function Catalog() {
  const navigate = useNavigate();
  const localToken = getAuthToken();
  const GlobalUser = useSelector((state) => state);
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // useEffect(() => {
  //     setLoading(true)
  //     axios({
  //         method: 'GET',
  //         baseURL: 'https://api.escuelajs.co',
  //         url: '/api/v1/products?offset=0&limit=10',
  //         })
  //         .then(({ data }) => {
  //             setProducts(data)
  //         })
  //         .catch(err => console.dir(err))
  //         .finally(() => setLoading(false))
  // }, []) 

  useEffect(() => {
    dispatch(paymentClear());
    if (cart.firstload===false){
      dispatch(getCart(localToken));
    }
    setLoading(true)
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:3332',
      url: '/api/v1/catalog/getall',
      })
      .then(({ data }) => {
          setProducts(data)
      })
      .catch(err => console.dir(err))
      .finally(() => setLoading(false))
      if (localToken){
        //dispatch(getCart(localToken));
      }
    
  }, []) 

  const addToCartRequest=(prod)=>{
    if (!localToken){
      navigate("/login")
    } else {
      dispatch(addToCart(prod));

    }
    
  }
  return (
    <Container>
      {products.map(product => (
        <ProductCard key={product.id}>
          
          <ProductImage src={product.image!="http://127.0.0.1:3332/images/undefined" ? product.image : image} alt={product.name} />
          <ProductDetails>
            <DialogDetail data={product}/>
            <ProductPrice className="product-price">
              $ {product.price}
            </ProductPrice>
          </ProductDetails>
          {product.stock===0 ? (
            <OutStockButton style={{color: "red"}}
              text="Out of Stock"
            />
          ):(
              <AddToCartButton onClick={() => addToCartRequest(product)}
                text="Add to cart"
                icon={FaCartPlus}
              />
          )}
          
        </ProductCard>
      ))}
    </Container>
  );
}


export default Catalog;

