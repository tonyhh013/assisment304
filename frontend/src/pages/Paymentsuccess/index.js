//mport { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import {Navbar} from '../../components/navbar';
import { mq } from '../../responsive';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  ${mq({ padding: '160px 20px' }, 900)}
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 16px;
  text-align: center;
`;

const Subtitle = styled.p`
  margin-bottom: 16px;
  text-align: center;
`;


const Paymentsuccess = () => {
    const order = useSelector((state) => state.orderReducer);
  return (
      <>
      <Navbar />
      <Wrapper>
        <Title>
            Congratulations!
        </Title>
          <Subtitle>
              Payment Successful
          </Subtitle>
        </Wrapper>
        { !order.success && <Navigate to={`/`}/>}
      </>
  );
};

export default Paymentsuccess;

