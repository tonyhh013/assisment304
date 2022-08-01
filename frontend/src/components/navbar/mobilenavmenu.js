import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Link as LK, useNavigate } from 'react-router-dom';
import { Menu as Mu } from "./menu";
import Badge from '@mui/material/Badge';
import { getAuthToken, removeAuthToken } from "../../utils/localstorage";
import { loginSetDefault,paymentClear,deleteAllCartRequestSuccess } from "../../actions/actions";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
const ManageLink = styled(LK)`
  text-decoration: none;
  color: red;
  font-size: inherit;
`;
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    height: '100%',
    maxWidth: 'unset',
    borderRadius: 6,
    marginLeft: theme.spacing(-1),
    marginTop: theme.spacing(5.7),
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Mobilenavmenu() {
  //const localToken = getAuthToken();
  const dispatch = useDispatch();
  const navigate=useNavigate();
    const [isOpen, setOpen] = useState(false);
    const cart = useSelector((state) => state.cartReducer);
    var isAdmin = ""
  const GlobalUser = useSelector((state) => state.loginReducer);
  if (GlobalUser.token){
    isAdmin=JSON.parse(atob(GlobalUser.token.split('.')[1])).role
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogOut = () => {
    setAnchorEl(null);
    removeAuthToken();
    dispatch(loginSetDefault());
    dispatch(paymentClear());
    dispatch(deleteAllCartRequestSuccess());
    navigate('/');
  };
  return (
    <div>
      {/* <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      /> */}
        <IconButton onClick={handleClick} ><Mu isOpen={open} toggle={() => setOpen(!isOpen)} /></IconButton>
      
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={LK} to="/" onClick={handleClose} disableRipple>
            Home
        </MenuItem>
        <MenuItem component={LK} to="/Map" onClick={handleClose} disableRipple>
            Map
        </MenuItem>
        <MenuItem component={LK} to="/Weather" onClick={handleClose} disableRipple>
        Weather
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem component={LK} to="/cart" disableRipple>
        {cart.products.items[0].items.length > 0 ? (
                <Badge badgeContent={cart.products.items[0].items.length} color="primary">
                    <ShoppingCartRoundedIcon color="secondary"/>
                </Badge>
            ) : (
                <ShoppingCartRoundedIcon color="secondary"/>
            )
        }
        </MenuItem>
        <MenuItem component={LK} to="/order" disableRipple>
            Order
        </MenuItem>
        {isAdmin==="admin" && (
          <div>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem component={LK} to="/manage/catalog" onClick={handleClose} disableRipple>
              <font color="red">Manage</font>
          </MenuItem>
          </div>
          
        )}
        <Divider sx={{ my: 0.5 }} />
        {GlobalUser.token ? (
          <MenuItem onClick={onLogOut} disableRipple>
          Logout
        </MenuItem>
        ) : (
          <MenuItem component={LK} to="/login" disableRipple>
          Login
        </MenuItem>
        )}
        
      </StyledMenu>
    </div>
  );
}