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

import { editEmployee } from '../helpers/editEmployee';


export default function EditEmployeeDialog({ open, handleClose, employeeData }) {
  
  const [employee, setEmployee] = React.useState(employeeData);
  const [first, setFirst] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');


  React.useEffect(() => {
    setEmployee(employeeData);
  }, [employeeData]);

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

  const handleAccept = async () => {
    if (first) {
      setFirst(false);
      return;
    }

    if (!isFormEmpty() && !first && isEmailValid(employee['email'])) {
      // handleClose();
      const employeeCode = employee['employeeCode'];
      const employeeDataa = { ...employee };
      delete employeeDataa['employeeCode'];

      // editEmployee(employeeCode, employeeDataa);

      const response = await editEmployee(employeeCode, employeeDataa);

      if (!response.ok) {
        const resBody = await response.json();
        setErrorMessage(resBody.message);
      } else {
        handleClose();
      }
    }
  };

  return (
    <>
    <Snackbar open={errorMessage !== ''} autoHideDuration={4000} onClose={() => setErrorMessage('')}>
      <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>

      {/* {errorMessage !== '' && <Alert severity="error">{errorMessage}</Alert>} */}
    
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar información de empleado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para editar datos de un empleado, por favor proporcione 
            la información en los campos que quiere modificar.
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
              required={key !== 'phoneNumber2' && key !== 'employeeCode'}
              error={(key !== 'phoneNumber2' && employee[key] === '' && !first) || 
                     (key === 'email' && !isEmailValid(employee[key]) && !first)}
                     
              helperText={(key !== 'phoneNumber2' &&  employee[key] === '' && !first) ? 'Campo requerido.' : 
                          (key === 'email' && !isEmailValid(employee[key]) && !first ? 'Formato de correo electrónico inválido.' : '')}
              name={key}
              value={employee[key]}
              onChange={handleInputChange}
              disabled={key === 'employeeCode'}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAccept}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}
