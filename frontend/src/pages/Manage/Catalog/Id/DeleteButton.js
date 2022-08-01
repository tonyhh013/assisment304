import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAuthToken } from "../../../../utils/localstorage";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function DeleteButton(prop) {
  const localToken = getAuthToken();
  const navigate =useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleYES = async() => {
    setOpen(false);
    try{
      const response = await axios.delete("http://localhost:3332/api/v1/manage/deleteCatalog", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localToken}` 
      },data:{id:prop.id}
      });
      if (response.status === 200) {
          alert("Update Successful");
          navigate(-1);
      }
    } catch(error) {
          alert("Please Check")
      }
  };

  return (
    <div>
      <Button sx={[{
      '&:hover': {
        color: 'white',
        backgroundColor: 'red',
      },
    },{backgroundColor:"red", color:"white"}]} variant="outlined" onClick={handleClickOpen}>
      DELETE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "#88ccff" }}
          id="alert-dialog-title"
        >
          {"Confirmation"}
        </DialogTitle>
        <DialogContent sx={{m:1,p:1}}>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete the item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleYES} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
