import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddEmployeeDialog({ open, handleClose }) {
  const [employee, setEmployee] = React.useState({
    'Código': '',
    'Nombre': '',
    'Apellido': '',
    'Dirección': '',
    'Puesto': '',
    'Correo Electrónico': '',
    'Teléfono': '',
    'Teléfono Secundario': ''
  });

  const [first, setFirst] = React.useState(true);

  const handleInputChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const isFormEmpty = () => {

    let fields = { ...employee };
    delete fields['Teléfono Secundario'];

    for (let key in fields) {
      if (fields[key] === '') {
        return true;
      }
    }
    return false;
  };

  const handleAccept = () => {
    if (first) {
      setFirst(false);
      return;
    }

    if (!isFormEmpty() && !first) {
      handleClose();
    }
  };

  return (
    <div>
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
              label={key}
              type="text"
              fullWidth
              variant="standard"
              required={key !== 'Teléfono Secundario'}
              error={key !== 'Teléfono Secundario' && employee[key] === '' && !first}
              helperText={key !== 'Teléfono Secundario' &&  employee[key] === '' && !first ? 'Campo requerido.' : ''}
              name={key}
              value={employee[key]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAccept}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
