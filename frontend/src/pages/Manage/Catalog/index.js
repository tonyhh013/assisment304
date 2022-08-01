import { useState, useEffect, useCallback } from "react";
import {Box, Button, Tabs, Tab} from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import {Navbar} from '../../../components/navbar';
import { StyledEngineProvider } from '@mui/material/styles';
import { getAuthToken } from "../../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { Link as LK } from 'react-router-dom';
import {
  Content
} from './styles';
// const data = [];

// for (let i = 0; i < 1000000; i++) {
//   data.push({
//     id: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
const columns = [
    {field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false,
    },
    {
        field: 'desc',
        headerName: 'Description',
        flex:1,
        editable: false,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
        editable: false,
    },
    {
        field: 'stock',
        headerName: 'Quantity',
        width: 150,
        editable: false,
    },
    {
    field: "Action",
    filter: false,
    sort:false,
    renderCell: (cellValues) => {
        return (
        // <Button
        //     variant="contained"
        //     color="primary"
        //     onClick={(event) => {
        //         handleClick(event, cellValues);
        //       }}
        // >
        //     View
        // </Button>
            <LK to={`${cellValues.row.id}`}><Button
                variant="contained"
                color="primary"
            >
                View
            </Button></LK>
        );
    }
    },
  ];

export default function CatalogManage() {
    const navigate = useNavigate();
    const localToken = getAuthToken();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const fetchData = useCallback(() => {
      const fetchingData = async () => {
        if (localToken){
          const response = await axios.get(`http://localhost:3332/api/v1/manage/getAllCatalog` , {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localToken}` 
            }
          });
          setData(response.data)
        }
      };
      fetchingData();
    }, [localToken]);
    useEffect(() => {
        // async function fetchData(){
        //   if (localToken){
        //     const response = await axios.get(`http://localhost:3332/api/v1/manage/getAllCatalog` , {
        //       headers: {
        //         "Content-Type": "application/json",
        //         'Authorization': `Bearer ${localToken}` 
        //       }
        //     });
        //     setData(response.data)
        //   }
        // }
        fetchData()
    }, [fetchData]) 
  return (
    <>
        <Navbar />
        <Content>
          <StyledEngineProvider injectFirst>
              <Box sx={{ border:1, borderColor:"grey.500"}}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="one" label="CataLog" />
                <Tab onClick={()=>{navigate('/manage/order')}} value="two" label="Order" />
              </Tabs>
              </Box>
              <Box sx={{ width: '100%' }}>
              <DataGrid
                  autoHeight 
                  components={{ Toolbar: GridToolbar }}
                  rows={data}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  
              />
              <Button onClick={()=>{navigate('/manage/catalog/create')}} variant="contained">Create</Button>
              </Box>
          </StyledEngineProvider>
        </Content>

    </>
  );
}