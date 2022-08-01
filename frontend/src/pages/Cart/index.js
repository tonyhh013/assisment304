import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import {Navbar} from '../../components/navbar';
import { getCart,orderCart,changeCartRequest,removeCartRequest,deleteAllCartRequest, deleteAllCartRequestSuccess } from "../../actions/actions";
import StripeCheckout from 'react-stripe-checkout';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate
} from 'react-router-dom';
import { Redirect } from "react-router";
import {
  Container,
  Wrapper,
  Title,
  EmptyCart,
  Subtitle,
  TopButton,
  Top,
  Bottom,
  Info,
  Product,
  Image,
  ProductDetail,
  Details,
  ProductName,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmount,
  ProductAmountContainer,
  ProductPrice,
  Summary,
  SummaryItem,
  SummaryTitle,
  SummaryItemPrice,
  SummaryItemText,
  Button,
  ButtonClear
} from './styles';
import Modal from '../../components/Modal';
import { Alert } from 'antd';
import { getAuthToken } from "../../utils/localstorage";
//const KEY = process.env.REACT_APP_LOCAL_STRIPE;
const KEY = process.env.REACT_APP_LOCAL_STRIPE;
const Cart = () => {
  const localToken = getAuthToken();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    dispatch(deleteAllCartRequestSuccess())
    if (localToken){

      dispatch(getCart(localToken));
    }
    
  }, []) 
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.user?.currentUser);



  const handleQuantity = (type, info) => {
    if (type === 'dec') {
      if (info.qty === 1) {
        dispatch(removeCartRequest(info.index, info.id,info.qty,info.price));
      } else {
        dispatch(
          changeCartRequest(type,info.id,info.qty-1,info.price)
        );
      }
    } else {
      dispatch(
        changeCartRequest(type,info.id,info.qty+1,info.price)
      );
    }
  };
  const order = async() =>{
    dispatch(deleteAllCartRequestSuccess());
    dispatch(orderCart(localToken));
    
  }

  const deleteAllCart = async() => {
  const response = await axios.delete("http://localhost:3332/api/v1/cart/deleteCart", {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localToken}` 
    }
  });
  }

  return (
    <>
    <Navbar />
    <Container>
      
      {cart.showModal && (
        <Alert
          message="Below items have been changed."
          description={
          <code>
            {cart.products.items[0].overitems.map((p, index) => (
              <span>{p.name}<br/></span>
            ))}
          </code>}
          type="warning"
          showIcon
          closable
        />
      )}
      
      <Title>Your cart ({cart.products.items[0].items.length})</Title>
      {cart.order && <Navigate to={`/order/${cart.orderDetail.orderId}`} />}
      {!cart.products.items[0].items.length > 0 ? (
          <EmptyCart>
            <Subtitle>Your cart is currently empty...</Subtitle>
            <TopButton to="/">Find great items for your cart</TopButton>
            {user && user.wishlist.length > 0 && (
              <TopButton to="/wishlist">
                Your Wishlist ({user.wishlist.length})
              </TopButton>
            )}
          </EmptyCart>
        ) : (
          <>
            {/* <Top>
              <TopButton to="/">Continue shopping</TopButton>
            </Top> */}

            <Bottom>
            <Info>
                {cart.products.items[0].items.map((p, index) => (
                  <Product key={p.id}>
                    <Link to={'/product/' + p._id}>
                      <Image src={p.detail.image} />
                    </Link>
                    <ProductDetail>
                      <Details>
                        <ProductName>
                          <Link to={'/product/' + p._id}>{p.detail.name}</Link>
                        </ProductName>
                      </Details>
                      <PriceDetail>
                        <ProductAmountContainer>
                          {p.qty === 1 ? (
                            <Modal
                              onClose={() =>
                                handleQuantity('dec', {
                                  index:index,
                                  id:p.id,
                                  price:p.detail.price,
                                  qty:p.qty
                                })
                              }
                              color="#e53e3e"
                              title="Are you sure to remove this item?"
                            >
                              <FaMinus style={{ color: '#e53e3e' }} />
                            </Modal>
                          ) : (
                            <FaMinus
                              onClick={() =>
                                handleQuantity('dec', {
                                  id:p.id,
                                  price:p.detail.price,
                                  qty: p.qty
                                })
                              }
                            />
                          )}

                          <ProductAmount>{p.qty}</ProductAmount>

                          <FaPlus
                            onClick={() =>
                              handleQuantity('inc', {
                                id:p.id,
                                price:p.detail.price,
                                qty: p.qty
                              })
                            }
                          />
                        </ProductAmountContainer>
                        <ProductPrice>${(p.detail.price * p.qty).toFixed(2)}</ProductPrice>
                      </PriceDetail>
                    </ProductDetail>
                  </Product>
                ))}
                <Modal
                  onClose={() =>  dispatch(deleteAllCartRequest(localToken))}
                  color="#e53e3e"
                  title="Are you sure to clear your cart?"
                >
                  <ButtonClear>Clear your cart</ButtonClear>
                </Modal>
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice> $ {cart.total.toFixed(2)}</SummaryItemPrice>
                </SummaryItem>
                <Button onClick={()=>order()}>CHECKOUT NOW</Button>
              </Summary>
            </Bottom>
            
            
          </>
        )}
    </Container>
    </>
    
  );
};

export default Cart;
