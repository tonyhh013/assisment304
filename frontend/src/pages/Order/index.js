import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Navbar} from '../../components/navbar';
import { getAuthToken } from "../../utils/localstorage";
import { Link } from 'react-router-dom';
import {
  Container,
} from './styles';
import Button from '@mui/material/Button';
import axios from 'axios';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const columns = [
  { id: 'OrderID', label: 'orderID', minWidth: 150 },
  { id: 'Date', label: 'Date', minWidth: 120 },
  { id: 'Total', label: 'Total', minWidth: 100 },
  { id: 'Action', label: 'Action', minWidth: 100 },

];


export default function Order() {
  const localToken = getAuthToken();
  //const [localToken, setlocalToken] = React.useState('');
  //setlocalToken(getAuthToken());
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);

  const fetchData = React.useCallback(() => {
    const fetchingData = async() =>{
      if (localToken){
        const response = await axios.get(`http://localhost:3332/api/v1/order/getOrder` , {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localToken}` 
          }
        });
        setData(response.data)
      }
    }
    fetchingData();
  },[localToken])
  
  React.useEffect(() => {
      fetchData()
  }, [fetchData]) 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <Navbar/>
    <Container>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell component="th" scope="row">
                        {row.orderId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.createTime.substring(0,10)} {row.createTime.substring(11,19)} 
                    </TableCell>
                    <TableCell component="th" scope="row">
                        ${row.total}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    <Button component={Link} to={`/order/${row.orderId}`} variant="contained" color="primary">
                        View
                    </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Container>
    </>
    
  );
}
