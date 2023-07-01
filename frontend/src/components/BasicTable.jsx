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


export default function BasicTable({ search }) {

  const { employees, isLoading } = useFetchEmployees(search);

  if (isLoading) {
    return <div>Loading...</div>;  
  }

  return (
    <Box sx={{ margin: '2em', marginTop: '3em' }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1em'}}>
        <Button variant="outlined">
          Agregar trabajador
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
              <TableCell align="right">Teléfono 2</TableCell>
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
