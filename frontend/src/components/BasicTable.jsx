import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Pagination from '@mui/material/Pagination';
import { Typography, Button } from '@mui/material';

import AddEmployeeDialog from './AddEmployeeDialog';
import EditEmployeeDialog from './EditEmployeeDialog';
import DeleteEmployeeDialog from './DeleteEmployeeDialog';

import { useFetchEmployees } from '../hooks/useFetchEmployees';
import { useSearch } from '../hooks/useSearch';


export default function BasicTable({ search }) {

  const { searchRes, isLoadingSearch } = useSearch(search);
  const { employees, isLoading } = useFetchEmployees();
  const [selectedEmployee, setSelectedEmployee] = React.useState({});

  const [openAddEmployee, setOpenAddEmployee] = React.useState(false);
  const [openEditEmployee, setOpenEditEmployee] = React.useState(false);
  const [openDeleteEmployee, setOpenDeleteEmployee] = React.useState(false);
  
  const [sucessEditSnackbar, setSucessEditSnackbar] = React.useState(false);
  const [successCreateSnackbar, setSuccessCreateSnackbar] = React.useState(false);
  const [successDeleteSnackbar, setSuccessDeleteSnackbar] = React.useState(false);

  const [page, setPage] = React.useState(1);


  const handleClickOpenAdd = () => {
    setOpenAddEmployee(true);
  };

  const handleCloseAdd = () => {
    setOpenAddEmployee(false);
  };

  const handleClickOpenEdit = (selectedEmployeeData) => {
    selectedEmployeeData.phoneNumber2 = selectedEmployeeData.phoneNumber2 || '';
    setSelectedEmployee(selectedEmployeeData);
    setOpenEditEmployee(true);
  };

  const handleCloseEdit = () => {
    setOpenEditEmployee(false);
  };

  const handleClickOpenDelete = (selectedEmployeeData) => {
    setSelectedEmployee(selectedEmployeeData);
    setOpenDeleteEmployee(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteEmployee(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };  


  if (isLoading) {
    return <Typography>Cargando...</Typography>;  
  }

  return (
    <Box sx={{ margin: '2em', marginTop: '3em' }}>


      <Snackbar
        open={sucessEditSnackbar}
        autoHideDuration={6000}
        onClose={() => setSucessEditSnackbar(false)}
      >
        <Alert onClose={() => setSucessEditSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Empleado editado con éxito.
        </Alert>
      </Snackbar>

      <Snackbar
        open={successCreateSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessCreateSnackbar(false)}
      >
        <Alert onClose={() => setSuccessCreateSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Empleado creado con éxito.
        </Alert>
      </Snackbar>

      <Snackbar
        open={successDeleteSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessDeleteSnackbar(false)}
      >
        <Alert onClose={() => setSuccessDeleteSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Información eliminada con éxito.
        </Alert>
      </Snackbar>


      <AddEmployeeDialog 
        open={openAddEmployee} 
        handleClose={handleCloseAdd} 
        setSuccessCreateSnackbar={setSuccessCreateSnackbar} 
      />
      
      <EditEmployeeDialog 
        open={openEditEmployee} 
        handleClose={handleCloseEdit} 
        employeeData={selectedEmployee} 
        setSucessEditSnackbar={setSucessEditSnackbar}
        />

      <DeleteEmployeeDialog 
        employeeData={selectedEmployee}
        open={openDeleteEmployee}
        onClose={handleCloseDelete}
        setSuccessDeleteSnackbar={setSuccessDeleteSnackbar}
      />

  
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1em'}}>
        <Button 
          variant="outlined"
          onClick={handleClickOpenAdd}>
          Agregar empleado
        </Button>
      </Box>

      { search ? 
        <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Código </TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Apellido</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Puesto</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="right">Teléfono Secundario</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchRes && searchRes.slice((page - 1) * 5, page * 5).map((employee) => (
                <TableRow
                  key={employee.employeeCode}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{employee.employeeCode}</TableCell>
                  <TableCell align="right">{employee.name}</TableCell>
                  <TableCell align="right">{employee.lastName}</TableCell>
                  <TableCell align="right">{employee.location}</TableCell>
                  <TableCell align="right">{employee.position}</TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.phoneNumber}</TableCell>
                  <TableCell align="right">{employee.phoneNumber2}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="text"
                      onClick={() => handleClickOpenEdit(employee)}
                      >                    
                      <EditIcon />
                    </Button>
                  </TableCell>
                  
                  <TableCell align="right">
                    <Button 
                      variant="text"
                      onClick={() => handleClickOpenDelete(employee)}
                      >
                      <DeleteIcon /> 
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Pagination 
          count={Math.ceil(searchRes.length / 5)} 
          page={page} 
          onChange={handleChangePage}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }} 
          />
      </Box>
      : 
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Código </TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Apellido</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Puesto</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="right">Teléfono Secundario</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees && employees.slice((page - 1) * 5, page * 5).map((employee) => (
                <TableRow
                  key={employee.employeeCode}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{employee.employeeCode}</TableCell>
                  <TableCell align="right">{employee.name}</TableCell>
                  <TableCell align="right">{employee.lastName}</TableCell>
                  <TableCell align="right">{employee.location}</TableCell>
                  <TableCell align="right">{employee.position}</TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.phoneNumber}</TableCell>
                  <TableCell align="right">{employee.phoneNumber2}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="text"
                      onClick={() => handleClickOpenEdit(employee)}
                      >                    
                      <EditIcon />
                    </Button>
                  </TableCell>
                  
                  <TableCell align="right">
                    <Button 
                      variant="text"
                      onClick={() => handleClickOpenDelete(employee)}
                      >
                      <DeleteIcon /> 
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Pagination 
          count={Math.ceil(employees.length / 5)} 
          page={page} 
          onChange={handleChangePage}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }} 
          />
      </Box>
      }

    </Box>
  );
}
