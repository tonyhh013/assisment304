import { useState, useEffect,useCallback } from "react";
import {Navbar} from '../../../../components/navbar';
import { Box, Paper, Typography, TextField,MenuItem, Button, RadioGroup, FormControlLabel, Radio, Stack } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import image from "../test.png";
import axios from 'axios';
import DeleteButton from './DeleteButton';
import { useParams, useNavigate } from "react-router-dom";
import {
    Inline,
    Container,
    Content,
    Left,
    Right,
    CancelButton
  } from './styles';
import { getAuthToken } from "../../../../utils/localstorage";

export default function CatalogManageId() {
    const localToken = getAuthToken();
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setstate] = useState("");
    const [file, setFile] = useState();
    const [change, setChange] = useState('Add');
    const [catalogId, setCatalogId] = useState(0);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [filename, setFilename] = useState("");
    const [stock, setStock] = useState(0);

    const [data,setData]=useState({Id:'1',Name:'test',Location:'USD',Salary:''});  
    function changeData(e){
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleChange = (event) => {
        setChange(event.target.value);
      };
    var loadFile = async (event) => {
        if (event.target.files) {
            event.preventDefault();
            setstate(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        }
    };
    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            if (localToken){
                const response = await axios.get(`http://localhost:3332/api/v1/manage/getCatalogById/${id}` , {
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localToken}` 
                  }
                });
                setCatalogId(response.data.id)
                setName(response.data.name);
                setDesc(response.data.desc);
                setPrice(response.data.price);
                setStock(response.data.stock);
                setFilename(response.data.image);
            }
        };
        fetchingData();
      }, [localToken,id]);

    useEffect(() => {
        // async function fetchData(){
        //   if (localToken){
        //     const response = await axios.get(`http://localhost:3332/api/v1/manage/getCatalogById/${id}` , {
        //       headers: {
        //         "Content-Type": "application/json",
        //         'Authorization': `Bearer ${localToken}` 
        //       }
        //     });
        //     setCatalogId(response.data.id)
        //     setName(response.data.name);
        //     setDesc(response.data.desc);
        //     setPrice(response.data.price);
        //     setStock(response.data.stock);
        //     setFilename(response.data.image);
        //   }
        // }
        fetchData()
    }, [fetchData]) 

    const submit = async () =>{
        const formData = new FormData();
        formData.append("image", file);
        formData.append("id", catalogId);
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("price", price);
        formData.append("change", change);
        formData.append("qty", qty);
        formData.append("orgfile", filename);
        try {
            const response = await axios({
              method: "put",
              url: "http://127.0.0.1:3332/api/v1/manage/updateCatalog",
              data: formData,
              headers: { "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${localToken}`  },
            });
            if (response.status === 200) {
                setStock(response.data.stock);
                setFilename(response.data.image);
                setFile(null);
                alert("Update Successful")
            }
        } catch(error) {
            alert("Please Check your value")
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
                            <Typography variant="caption"></Typography>
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
                        Stock: {stock}
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
                            value={price}
                            placeholder="Price"
                        />
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            defaultValue="top"
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Remove"
                                control={<Radio />}
                                label="Remove Off Shelves"
                            />
                            <FormControlLabel
                                checked={change === 'Add'}
                                value="Add"
                                control={<Radio />}
                                label="Add"
                            />
                            {change === "Add" && <TextField 
                                id="standard-basic" 
                                label="Add QTY" 
                                variant="standard" 
                                name="Add QTY"
                                onChange={(e) => setQty(e.target.value)} 
                                value={qty}
                                placeholder="Add QTY"
                            />}
                        </RadioGroup>
                        
                        <br />
                        <br />
                        <Stack spacing={1} direction="row">
                        <Button onClick={()=>submit()} variant="contained">UPDATE</Button>
                        <DeleteButton id={id}/>
                        <CancelButton onClick={()=>navigate('/manage/catalog')} variant="contained">CANCEL</CancelButton>
                        </Stack>
                        
    
    
                        
                    </Box>
                
                
                </Right>
                
            </Content>
            
        </Container>
      </>
  );
}