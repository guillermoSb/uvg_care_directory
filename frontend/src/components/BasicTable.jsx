import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFetchEmployees } from '../hooks/useFetchEmployees';
import { Typography, Button } from '@mui/material';
import AddEmployeeDialog from './AddEmployeeDialog';
import EditEmployeeDialog from './EditEmployeeDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { deleteEmployee } from '../helpers/deleteEmployee';


export default function BasicTable({ search }) {

  const { employees, isLoading } = useFetchEmployees(search);
  const [selectedEmployee, setSelectedEmployee] = React.useState({});
  const [openAddEmployee, setOpenAddEmployee] = React.useState(false);

  const [openEditEmployee, setOpenEditEmployee] = React.useState(false);
  const [sucessEditSnackbar, setSucessEditSnackbar] = React.useState(false);


  const handleClickOpenAdd = () => {
    setOpenAddEmployee(true);
  };

  const handleCloseAdd = () => {
    setOpenAddEmployee(false);
  };

  const handleClickOpenEdit = (selectedEmployeeData) => {
    setSelectedEmployee(selectedEmployeeData);
    setOpenEditEmployee(true);
  };

  const handleCloseEdit = () => {
    setOpenEditEmployee(false);
  };

  const handleDeleteEmployee = (employeeCode) => {
    deleteEmployee(employeeCode);
  };

  if (isLoading) {
    return <div>Cargando...</div>;  
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

      <AddEmployeeDialog open={openAddEmployee} handleClose={handleCloseAdd} />
      <EditEmployeeDialog 
        open={openEditEmployee} 
        handleClose={handleCloseEdit} 
        employeeData={selectedEmployee} 
        setSucessEditSnackbar={setSucessEditSnackbar}
        />

  
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1em'}}>
        <Button 
          variant="outlined"
          onClick={handleClickOpenAdd}>
          Agregar empleado
        </Button>
      </Box>

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
            {employees && employees.map((employee) => (
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
                    onClick={() => handleDeleteEmployee(employee.employeeCode)}
                    >
                    <DeleteIcon /> 
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='body2'>
        { search ? `Resultados para: ${search}` : '' }
      </Typography>

    </Box>
  );
}
