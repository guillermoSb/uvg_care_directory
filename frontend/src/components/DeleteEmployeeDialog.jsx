import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Typography } from '@mui/material';

import { deleteEmployee } from '../helpers/deleteEmployee';


export default function AlertDialog({ open, onClose, employeeData, setSuccessDeleteSnackbar }) {

  const handleDeleteEmployee = () => {
    const { employeeCode } = employeeData;
    deleteEmployee(employeeCode);
    onClose();
    setSuccessDeleteSnackbar(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1" align='center'>
              ¿Confirma que desea eliminar los datos de {employeeData.name} {employeeData.lastName}?
            </Typography>
          </DialogContentText> 
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleDeleteEmployee} autoFocus>
            Aceptar
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
