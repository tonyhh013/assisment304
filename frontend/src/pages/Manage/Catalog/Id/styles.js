import styled from 'styled-components';
//import { Link } from 'react-router-dom';
import { mq } from '../../../../responsive';
import { styled as muiStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
export const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
`;
export const Content = styled.div`
  ${mq({ display: 'flex', justifyContent: 'space-between' }, 900)}
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
    backgroundColor: 'orange',
    borderColor: 'orange',
    '&:hover': {
      backgroundColor: 'orange',
      borderColor: 'orange',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'orange',
      borderColor: 'orange',
    }
  });