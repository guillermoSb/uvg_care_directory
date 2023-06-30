import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function SearchBar() {
   
    const [input, setInput] = React.useState('');
    const [search, setSearch] = React.useState('');

    const handleInputChange = (e) => {
      setInput(e.target.value);
    }

    const handleSearch = (e) => {
      e.preventDefault();
      setSearch(input);
    }



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
                    onChange={handleInputChange}
                    value={input}
                  />
                  <Button 
                    variant="contained"
                    onClick={ handleSearch }
                  >
                    Buscar
                  </Button>

                  <Typography variant='body2'>
                    { search ? `Resultados para: ${search}` : '' }
                  </Typography>
                  
                </Box>
            </Grid>
        </Grid>
      </Box>
    );
}
