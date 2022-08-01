import styled from 'styled-components';
//import { Link } from 'react-router-dom';
//import { mq } from '../../../responsive';
import { styled as muiStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
export const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
`;
export const Content = styled.div`
  width: 100%;
  max-width: 1136px;
  margin: 0 auto;
`;
export const Left = styled.div`
    text-align: center;
    border: 1px solid #e2e8f0;
    padding: 20px;
    flex: 1;
    display: flex;
    justify-content: center; 
    align-items: center; 
`;
export const Center = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
`;
export const Right = styled.div`
    flex: 2;
    border: 1px solid #e2e8f0;
    padding: 20px;
`;
export const CancelButton = muiStyled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'red',
    borderColor: '#cc0000',
    '&:hover': {
      backgroundColor: '#cc0000',
      borderColor: '#cc0000',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#cc0000',
      borderColor: '#cc0000',
    }
  });