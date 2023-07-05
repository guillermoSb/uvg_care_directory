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


export default function AddEmployeeDialog({ open, handleClose, setSuccessCreateSnackbar }) {
  
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

  const [createError, setCreateError] = React.useState([]);
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

  const isCodeValid = (code) => {
    const re = /^[0-9]+$/;
    return re.test(code);
  }

  const handleAccept = async () => {
    if (first) {
      setFirst(false);
    }

    if (!isFormEmpty() && isEmailValid(employee['email']) && isCodeValid(employee['employeeCode'])) {

      const response = await addEmployee(employee);

      if (!response.ok) {
        const resBody = await response.json();
        setCreateError(resBody.errors);

      } else {
        setCreateError([]);
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
        setSuccessCreateSnackbar(true);
      }
    }
    if (!isCodeValid(employee['employeeCode'])) {
      setInfoMessage('Solo se aceptan valores númericos.');
      setInfoCreateSnackbar(true);
    }
    if (isFormEmpty()) {
      setInfoMessage('Por favor, llene todos los campos requeridos.');
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


      {createError.length > 0 && 
        createError.map((error, index) => (
          <Snackbar
            key={index} 
            open={createError.length > 0}
            autoHideDuration={4000}
            onClose={() => setCreateError([])}
          >
            <Alert
              onClose={() => setCreateError([])}
              severity='error'
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        ))
      }

        


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
                    (key === 'email' && !isEmailValid(employee[key]) && !first) ||
                    (key === 'employeeCode' && !isCodeValid(employee[key]) && !first)}
       
              helperText={(key !== 'phoneNumber2' &&  employee[key] === '' && !first) ? 'Campo requerido.' : 
                    (key === 'email' && !isEmailValid(employee[key]) && !first) ? 'Formato de correo electrónico inválido.' :
                    (key === 'employeeCode' && !isCodeValid(employee[key]) && !first) ? 'Código inválido.' : ''}
        
                    
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
