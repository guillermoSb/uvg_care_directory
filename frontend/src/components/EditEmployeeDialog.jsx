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


export default function EditEmployeeDialog({ open, handleClose, employeeData, setSucessEditSnackbar }) {
  
  const [employee, setEmployee] = React.useState(employeeData);
  const [prevData, setPrevData] = React.useState(employeeData);

  const [editError, setEditError] = React.useState('');
  const [infoEditSnackbar, setInfoEditSnackbar] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('');

  React.useEffect(() => {
    setEmployee(employeeData);
    setPrevData(employeeData);
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

  const isDataChanged = () => {
    for (let key in employee) {
      if (employee[key] !== prevData[key]) {
        return true;
      }
    }
    return false;
  };
  

  const handleAccept = async () => {

    if (!isFormEmpty() && isEmailValid(employee['email'])) {
      const employeeCode = employee['employeeCode'];
      const employeeDataa = { ...employee };
      delete employeeDataa['employeeCode'];

      const response = await editEmployee(employeeCode, employeeDataa);

      if (!response.ok) {
        const resBody = await response.json();
        setEditError(resBody.message);
      } else {
        
        if (isDataChanged()) {
          handleClose();
          setSucessEditSnackbar(true);
        } else {
          setInfoEditSnackbar(true);
          setInfoMessage('No se ha modificado ningún dato.');
        }
      }
    }

    if (isFormEmpty()) {
      setInfoEditSnackbar(true);
      setInfoMessage('Por favor, llene todos los campos requeridos.');
    }

  };

  return (
    <>
    <Snackbar open={editError !== ''} autoHideDuration={4000} onClose={() => setEditError('')}>
      <Alert onClose={() => setEditError('')} severity="error" sx={{ width: '100%' }}>
        {editError}
      </Alert>
    </Snackbar>

    <Snackbar open={infoEditSnackbar} autoHideDuration={6000} onClose={() => setInfoEditSnackbar(false)}>
      <Alert onClose={() => setInfoEditSnackbar(false)} severity="info" sx={{ width: '100%' }}>
        {infoMessage}
      </Alert>
    </Snackbar>


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
              error={(key !== 'phoneNumber2' && employee[key] === '') || 
                    (key === 'email' && !isEmailValid(employee[key]))}
                    
              helperText={(key !== 'phoneNumber2' &&  employee[key] === '') ? 'Campo requerido.' : 
                          (key === 'email' && !isEmailValid(employee[key]) ? 'Correo electrónico inválido.' : '')}
              name={key}
              value={employee[key]}
              onChange={handleInputChange}
              onBlur={handleInputChange}
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
