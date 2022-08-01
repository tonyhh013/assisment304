import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clearCartOrder} from "../../../actions/actions";
import axios from "axios";
import {Navbar} from '../../../components/navbar';
import StripeContainer from '../../../components/StripeContainer';
import { useParams } from "react-router-dom";
import {
  Link,
} from 'react-router-dom';
import {
  Container,
  Content,
  Bottom,
  Info,
  Product,
  Image,
  ProductDetail,
  Details,
  ProductName,
  PriceDetail,
  ProductAmount,
  ProductAmountContainer,
  ProductPrice,
  Summary,
  SummaryItem,
  SummaryTitle,
  SummaryItemPrice,
  SummaryItemText,
} from './styles';
import { getAuthToken } from "../../../utils/localstorage";
const OrderId = () => {
  const localToken = getAuthToken();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  //const navigate = useNavigate();
  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      if (localToken){
        const response = await axios.get(`http://localhost:3332/api/v1/order/getOrderId/${orderId}` , {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localToken}` 
          }
        });
        setData(response.data);
      }
    };
    fetchingData();
  }, [localToken,orderId]);
  useEffect(() => {
    dispatch(clearCartOrder());
    fetchData()
    }, [fetchData]) 
  return (
    <>
    <Navbar />
    <Container>
      {data !== null && (
        <>
        <Content>
        <Bottom>
          <Info>
          {data.items.map((p, index) => (
            <Product key={p._id}>
              <Link to={'/product/' + p._id}>
                <Image src={p.detail.image} />
              </Link>
              <ProductDetail>
                <Details>
                  <ProductName>
                    {p.detail.name}
                  </ProductName>
                </Details>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>{p.qty}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>${(p.detail.price * p.qty).toFixed(2)}</ProductPrice>
                </PriceDetail>
              </ProductDetail>
            </Product>
          ))}
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice> $ {data.total.toFixed(2)}</SummaryItemPrice>
          </SummaryItem>
            {data.status==="Pending Payment" ? (<StripeContainer total={data.total.toFixed(2)}/>):<div>{data.status}</div>}
          
        </Summary>
        </Bottom>
        </Content>
        
       
      </>
      )}
      
      
    </Container>
    </>
    
  );
};

export default OrderId;
