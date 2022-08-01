import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import DialogContentText from '@mui/material/DialogContentText';
import AddToCartButton from '../../components/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { FaCartPlus } from 'react-icons/fa';
import { getAuthToken } from "../../utils/localstorage";
import { addToCart } from "../../actions/actions";
import image from "./test.png";
import { Box, Paper, TextField,MenuItem, RadioGroup, FormControlLabel, Radio, Stack } from '@mui/material';
import {
    Container,
    ProductName,
    Content,
    Left,
    Right
  } from './styles2';
const Button2 =  styled(AddToCartButton)({
    width:175
  });
  const Title =  styled(DialogContentText)({
    color:"black",
    fontSize:25,
    fontWeight: 'bold'
    
  });
  const OutStockButton =  styled(AddToCartButton)({
    width:175,
    backgroundColor:"#ccc",  
    cursor: "context-menu",
    '&:hover': {
      backgroundColor: '#ccc',
    },
  });
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose,x,y, ...other } = props;

  return (
    <>
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
    </DialogTitle>
    {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'fixed',
            left: props.x-30,
            top: props.y-10,
            zIndex: 9999,
            color: "red",
            display:"block",
            //color:(theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DialogDetail(prop) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const localToken = getAuthToken();
    const myRef = React.useRef();
    const myRef2 = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [x, setX] = React.useState();

    // Y
    const [y, setY] = React.useState();
    const getPosition = () => {
        if (open){
          const myRef2x = myRef2.current.offsetWidth;
          const myRefx = myRef.current.offsetWidth;
          setX(((myRef2x-myRefx)/2)+myRefx);
      
          const myRef2y = myRef2.current.offsetHeight;
          const myRefy = myRef.current.offsetHeight;
          setY(((myRef2y-myRefy)/2));
        } 
        
      };
      React.useEffect(() => {
        getPosition();
      }, []);
    
      // Re-calculate X and Y of the red box when the window is resized by the user
      React.useEffect(() => {
        window.addEventListener("resize", getPosition);
      }, []);
    const [state, setstate] = React.useState("");
    const [file, setFile] = React.useState();
    var loadFile = async (event) => {
        if (event.target.files) {
            event.preventDefault();
            setstate(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        }
    };
  
    const fullWidth=false;
  const handleClickOpen = async() => {
    await setOpen(true);
    const myRef2x = myRef2.current.offsetWidth;
    const myRefx = myRef.current.offsetWidth;
    setX(((myRef2x-myRefx)/2)+myRefx);

    const myRef2y = myRef2.current.offsetHeight;
    const myRefy = myRef.current.offsetHeight;
    setY(((myRef2y-myRefy)/2));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addToCartRequest=(prod)=>{
    if (!localToken){
      navigate("/login")
    } else {
      dispatch(addToCart(prod));
    }
    
  }

  return (
    <div>
      <ProductName onClick={handleClickOpen} className="product-name">{prop.data.name}</ProductName>
      <BootstrapDialog
        ref={myRef2} 
        fullWidth={fullWidth}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        
        <DialogContent ref={myRef}  dividers>
        <Container>
            <Content>
                
                <Left>
                    <Box
                        width="250px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <Paper style={{ width: "250px" }}>
                        <Box
                            width="250px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="file"
                            onChange={loadFile}
                            style={{ display: "none" }}
                            />
                            <Typography variant="caption">  </Typography>
                            { state ? (
                                <img
                                    src={state}
                                    id="output"
                                    width="200"
                                    alt="test"
                                />):(
                                <img
                                    src={prop.data.image!=="http://127.0.0.1:3332/images/undefined" ? prop.data.image : image}
                                    id="output"
                                    width="200"
                                    alt="test"
                                />
                                )
                            }
                            
                        </Box>
                                                <Box
                            width="250px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <label htmlFor="file" style={{ cursor: "pointer" }}>
                          
                            </label>
                        </Box>
                        </Paper>
      
                    </Box>
                    
                </Left>
                
                
                <Right>
                <Title>{prop.data.name}</Title><br/>
                <DialogContentText>Description:</DialogContentText>
                <DialogContentText>{prop.data.desc}</DialogContentText>
                
                <br/>
                    <Box justifyContent="flex-end" padding="0px 0px">
                        
                        
                        
                       
                        <Stack spacing={1} direction="row">
                            
                        {prop.data.stock===0 ? (
                          <OutStockButton style={{color: "red"}}
                            text="Out of Stock"
                          />
                        ):(
                            <Button2 onClick={() => addToCartRequest(prop.data)}
                              text="Add to cart"
                              icon={FaCartPlus}
                            />
                        )}
                        
                        </Stack>
                        
    
    
                        
                    </Box>
                
                
                </Right>
                
            </Content>
            
        </Container>
        </DialogContent>
        <BootstrapDialogTitle x={x} y={y} id="customized-dialog-title" onClose={handleClose}>
        
        </BootstrapDialogTitle>
        
      </BootstrapDialog>
    </div>
  );
}
export default DialogDetail