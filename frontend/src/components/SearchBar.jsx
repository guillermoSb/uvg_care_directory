import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SearchBar() {
    return (
      <Box sx={{ margin: '2em', marginBottom: '0'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={6} lg={5}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: 2 
                  }}
                >
                  <TextField 
                    id="outlined-basic" 
                    label="Ingrese su búsqueda" 
                    variant="outlined" 
                    sx={{ flex: '1 1 auto' }} 
                    size='small'
                  />
                  <Button variant="contained">Buscar</Button>
                </Box>
            </Grid>
        </Grid>
      </Box>
    );
}
