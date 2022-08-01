import { useState, useEffect,useCallback } from "react";
import {Box, Button, Tabs, Tab} from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import {Navbar} from '../../../components/navbar';
import { StyledEngineProvider } from '@mui/material/styles';
import { getAuthToken } from "../../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { Link as LK } from 'react-router-dom';
import {Content} from './styles';
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
    {field: '_id', headerName: '_id', hide:true },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        editable: false,
    },
    {
        field: 'orderId',
        headerName: 'orderId',
        flex:1,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'status',
        flex: 1,
        editable: false,
    },
    {
        field: 'paymentId',
        headerName: 'paymentId',
        flex: 1,
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
            <LK to={`${cellValues.row.orderId}`}><Button
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
  const localToken = getAuthToken();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('two');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const fetchData = useCallback(() => {
      const fetchingData = async () => {
        if (localToken){
          const response = await axios.get(`http://localhost:3332/api/v1/manage/getAllOrder` , {
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
        //     const response = await axios.get(`http://localhost:3332/api/v1/manage/getAllOrder` , {
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
              <Box sx={{ width: '100%', border:1, borderColor:"grey.500"}}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab onClick={()=>{navigate('/manage/catalog')}} value="one" label="CataLog" />
                <Tab value="two" label="Order" />
              </Tabs>
              </Box>
              <Box sx={{ width: '100%' }}>
              <DataGrid
                  getRowId={(row) => row._id}
                  autoHeight 
                  components={{ Toolbar: GridToolbar }}
                  rows={data}
                  columns={columns}
                  pageSize={15}
                  rowsPerPageOptions={[15]}
                  disableSelectionOnClick
                  
              />
              </Box>
          </StyledEngineProvider>
        </Content>

    </>
  );
}