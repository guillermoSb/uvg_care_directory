import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


import { addEmployee } from '../helpers/addEmployee';


export default function AddEmployeeDialog({ open, handleClose }) {
  
  const [employee, setEmployee] = React.useState({
    'employeeCode': '',
    'name': '',
    'lastName': '',
    'location': '',
    'position': '',
    'email': '',
    'phoneNumber': '',
    'phoneNumber2': ''
  });

  const [first, setFirst] = React.useState(true);

  const [infoCreateSnackbar, setInfoCreateSnackbar] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('');

  const handleInputChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.id]: event.target.value,
    });
  };  

  const isFormEmpty = () => {

    let fields = { ...employee };
    delete fields['phoneNumber2'];

    for (let key in fields) {
      if (fields[key] === '') {
        return true;
      }
    }
    return false;
  };

  const isEmailValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleAccept = () => {
    if (first) {
      setFirst(false);
    }

    if (!isFormEmpty() && !first && isEmailValid(employee['email'])) {
      handleClose();
      addEmployee(employee);
      setEmployee({
        'employeeCode': '',
        'name': '',
        'lastName': '',
        'location': '',
        'position': '',
        'email': '',
        'phoneNumber': '',
        'phoneNumber2': ''
      });
      setFirst(true);
    }
    if (isFormEmpty()) {
      setInfoMessage('Por favor, llene todos los campos.');
      setInfoCreateSnackbar(true);
    }
  };

  const handleCancel = () => {
    handleClose();
    setEmployee({
      'employeeCode': '',
      'name': '',
      'lastName': '',
      'location': '',
      'position': '',
      'email': '',
      'phoneNumber': '',
      'phoneNumber2': ''
    });
    setFirst(true);
  };

  return (
    <div>

      <Snackbar
        open = {infoCreateSnackbar} 
        autoHideDuration = {4000}
        onClose = {() => setInfoCreateSnackbar(false)}
      >
        <Alert
          onClose = {() => setInfoCreateSnackbar(false)}
          severity = 'info'
          sx = {{ width: '100%' }}
        >
          {infoMessage}
        </Alert>
      </Snackbar>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar información de empleado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para añadir datos de un empleado, por favor proporcione 
            la información en los campos siguientes.
          </DialogContentText>

          {Object.keys(employee).map((key, index) => (
            <TextField
              key={index}
              autoFocus
              margin="dense"
              id={key}
              label={
                key === 'employeeCode' ? 'Código' :
                key === 'name' ? 'Nombre' :
                key === 'lastName' ? 'Apellido' :
                key === 'location' ? 'Dirección' :
                key === 'position' ? 'Puesto' :
                key === 'email' ? 'Correo Electrónico' : 
                key === 'phoneNumber' ? 'Teléfono' : 
                key === 'phoneNumber2' ? 'Teléfono Secundario' : key}
              type={key === 'email' ? 'email' : 'text'}
              fullWidth
              variant="standard"
              required={key !== 'phoneNumber2'}
              error={(key !== 'phoneNumber2' && employee[key] === '' && !first) || 
                     (key === 'email' && !isEmailValid(employee[key]) && !first)}
                     
              helperText={(key !== 'phoneNumber2' &&  employee[key] === '' && !first) ? 'Campo requerido.' : 
                          (key === 'email' && !isEmailValid(employee[key]) && !first ? 'Formato de correo electrónico inválido.' : '')}
              name={key}
              value={employee[key]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleAccept}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
