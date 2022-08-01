import { useEffect, useState, useCallback } from 'react';
//import { FaMinus, FaPlus } from 'react-icons/fa';
//import { useDispatch } from 'react-redux';
import axios from "axios";
import {Navbar} from '../../../../components/navbar';
import { Box,TextField,MenuItem,Button } from '@mui/material';
import { useParams } from "react-router-dom";
import {
  Link,
  useNavigate
} from 'react-router-dom';
//import { Redirect } from "react-router";
import {
  Container,
  CancelButton,
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
  SummaryItemText
} from './styles';
//import Modal from '../../../../components/Modal';
//import { Alert } from 'antd';
import { getAuthToken } from "../../../../utils/localstorage";
const currencies = [
    {
        value: 'Processing',
        label: 'Processing',
    },
    {
        value: 'Complete',
        label: 'Complete',
    }
];
const OrderManageOrderId = () => {
  const localToken = getAuthToken();
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  function changeData(e){
      setData({...data,[e.target.name]:e.target.value});
    }
  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      if (localToken){
        const response = await axios.get(`http://localhost:3332/api/v1/manage/getOrderById/${orderId}` , {
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
    // async function fetchData(){
    //   if (localToken){
    //     const response = await axios.get(`http://localhost:3332/api/v1/manage/getOrderById/${orderId}` , {
    //       headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': `Bearer ${localToken}` 
    //       }
    //     });
    //     setData(response.data);
    //   }
    // }
    
    fetchData()
    }, [fetchData]) 

    const submit = async () =>{
        try {
            const response = await axios.put("http://127.0.0.1:3332/api/v1/manage/updateOrder", {data} , {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localToken}` 
            }
          });
            if (response.status === 200) {
                alert("Update Successful")
            }
        } catch(error) {
            alert("Please Check your value")
        }
    }
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
                  <ProductPrice>${(p.detail.price * p.qty).toFixed(2)} </ProductPrice>
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
            <SummaryItem type="total">
                <SummaryItemText>Address:</SummaryItemText>
                <SummaryItemText>{data.address}</SummaryItemText>
            </SummaryItem>
            <SummaryItem type="total">
                <SummaryItemText>PaymentId:</SummaryItemText>
                <SummaryItemText>{data.paymentId}</SummaryItemText>
            </SummaryItem>
            <SummaryItem type="total">
            {
                data.status === "Pending Payment" ? (
                        <SummaryItemText>{data.status}</SummaryItemText>
                ) : (
                        <TextField
                            fullWidth id="status"
                            name="status"
                            select
                            label="Select"
                            value={data.status}
                            onChange={changeData}
                            variant="standard"
                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )
        
            }
            

            </SummaryItem>
            <Box justifyContent="flex-end" padding="10px 20px">
            <Button onClick={()=>submit()} variant="contained">UPDATE</Button> <span>  </span>
            <CancelButton onClick={()=>navigate('/manage/order')} variant="contained">BACK</CancelButton>
            </Box>
        </Summary>
        </Bottom>
        </Content>
        
       
      </>
      )}
      
      
    </Container>
    </>
      
  );
};

export default OrderManageOrderId;
