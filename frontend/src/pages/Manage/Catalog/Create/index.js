import { useState } from "react";
import {Navbar} from '../../../../components/navbar';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import image from "../test.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
    Container,
    Content,
    Left,
    Right,
    CancelButton
  } from './styles';
import { getAuthToken } from "../../../../utils/localstorage";
export default function CatalogManageCreate() {
    const localToken = getAuthToken();
    const navigate = useNavigate();
    const [state, setstate] = useState("");
    const [file, setFile] = useState();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [filename, setFilename] = useState("");


    
    var loadFile = async (event) => {
        if (event.target.files) {
            event.preventDefault();
            setstate(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        }
    };

    const submit = async () =>{
        if (file !== null && name !== "" && desc !== "" && price !== 0 && qty !== null ) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("price", price);
            formData.append("qty", qty);
            try {
                const response = await axios({
                method: "post",
                url: "http://127.0.0.1:3332/api/v1/manage/createCatalog",
                data: formData,
                headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${localToken}`  },
                });
                if (response.status === 200) {
                    setFilename(response.data.image);
                    setFile(null);
                    alert("Create Successful")
                    navigate('/manage/catalog/'+response.data.id)
                }
            } catch(error) {
                alert("Please Check your value")
            }
        } else {
            alert("Please fill in all value")
        }
        
    }
  return (
      <>
       <Navbar/>
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
                                    src={filename ? `http://127.0.0.1:3332/images/`+filename : image}
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
                            <PhotoCamera />
                            </label>
                        </Box>
                        </Paper>
                    </Box>
                    
                </Left>
                
                
                <Right>
                    <Box justifyContent="flex-end" padding="10px 20px">
                        <TextField 
                            id="standard-basic" 
                            label="Name" 
                            variant="standard" 
                            name="Name"
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                            placeholder="Name"
                        />
                         <TextField 
                            fullWidth id="standard-basic" 
                            label="Description" 
                            variant="standard" 
                            name="Desc"
                            multiline
                            onChange={(e) => setDesc(e.target.value)} 
                            value={desc}
                            placeholder="Description"
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Price" 
                            variant="standard" 
                            name="Price"
                            onChange={(e) => setPrice(e.target.value)} 
                            value={price !== 0 ? price: ""}
                            placeholder="Price"
                        />
                        <br />
                        <TextField 
                                id="standard-basic" 
                                label="QTY" 
                                variant="standard" 
                                name="QTY"
                                onChange={(e) => setQty(e.target.value)} 
                                value={qty !==0 ? qty : ""}
                                placeholder="QTY"
                            />
                        
                        <br />
                        <br />
                        <Button onClick={()=>submit()} variant="contained">CREATE</Button><span>  </span>
                        <CancelButton onClick={()=>navigate('/manage/catalog')} variant="contained">CANCEL</CancelButton>
                    </Box>
                
                
                </Right>
                
            </Content>
            
        </Container>
      </>
  );
}