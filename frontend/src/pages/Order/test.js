// import { useEffect, useState } from 'react';
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   Elements,
//   useElements,
//   useStripe
// } from "@stripe/react-stripe-js";
// import "./style.css";
// import { FaMinus, FaPlus } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from "axios";
// import {Navbar} from '../../components/navbar';
// import StripeContainer from '../../components/StripeContainer';
// import { useParams } from "react-router-dom";
// import { orderCart } from "../../actions/actions";
// import StripeCheckout from 'react-stripe-checkout';
// import { userRequest } from '../../requestMethods';
// import {
//   BrowserRouter,
//   Navigate,
//   Routes,
//   Route,
//   useLocation,
//   Link,
//   useNavigate
// } from 'react-router-dom';
// import { Redirect } from "react-router";
// import {
//   Container,
//   Wrapper,
//   Title,
//   EmptyCart,
//   Subtitle,
//   TopButton,
//   Top,
//   Bottom,
//   Info,
//   Product,
//   Image,
//   ProductDetail,
//   Details,
//   ProductName,
//   ProductColor,
//   ProductSize,
//   PriceDetail,
//   ProductAmount,
//   ProductAmountContainer,
//   ProductPrice,
//   Summary,
//   SummaryItem,
//   SummaryTitle,
//   SummaryItemPrice,
//   SummaryItemText,
//   Button,
//   ButtonClear
// } from './OrderId/styles';
// import Modal from '../../components/Modal';
// import { Alert } from 'antd';
// import { getAuthToken } from "../../utils/localstorage";
// const localToken = getAuthToken();
// const KEY = process.env.REACT_APP_LOCAL_STRIPE;
// const OrderId = () => {
//   const { orderId } = useParams();
//   const [stripeToken, setStripeToken] = useState(null);
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const onToken = (token) => {
//     setStripeToken(token);
//   };
//   useEffect(() => {
//     async function fetchData(){
//       if (localToken){
//         const response = await axios.get(`http://localhost:3332/api/v1/order/getOrderId/${orderId}` , {
//           headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${localToken}` 
//           }
//         });
//         setData(response.data);
//       }
//     }
//     fetchData()
//     }, []) 

//     const order = () => {

//     }
//   return (
    
//     <Container>
//       <Navbar />
//       {data !== null && (
//         <>
//         <Bottom>
//           <Info>
//           {data.items.map((p, index) => (
//             <Product key={p._id}>
//               <Link to={'/product/' + p._id}>
//                 <Image src={p.detail.image} />
//               </Link>
//               <ProductDetail>
//                 <Details>
//                   <ProductName>
//                     <Link to={'/product/' + p._id}>{p.detail.name}</Link>
//                   </ProductName>
//                 </Details>
//                 <PriceDetail>
//                   <ProductAmountContainer>
//                     <ProductAmount>{p.qty}</ProductAmount>
//                   </ProductAmountContainer>
//                   <ProductPrice>{(p.detail.price * p.qty).toFixed(2)} €</ProductPrice>
//                 </PriceDetail>
//               </ProductDetail>
//             </Product>
//           ))}
//         </Info>
//         <Summary>
//           <SummaryTitle>ORDER SUMMARY</SummaryTitle>
//           <SummaryItem type="total">
//             <SummaryItemText>Total</SummaryItemText>
//             <SummaryItemPrice> $ {data.total.toFixed(2)}</SummaryItemPrice>
//           </SummaryItem>
//             {data.status=="Pending Payment" ? (<StripeContainer total={data.total.toFixed(2)}/>):<div>{data.status}</div>}
          
//         </Summary>
//         </Bottom>
       
//       </>
//       )}
      
      
//     </Container>
//   );
// };

// export default OrderId;
