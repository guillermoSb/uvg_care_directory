import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function AlertDialog({ open, onClose }) {

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
              ¿Está seguro de eliminar la información de este empleado?
            </Typography>
          </DialogContentText> 
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose} autoFocus>
            Aceptar
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
