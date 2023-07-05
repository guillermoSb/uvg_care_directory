import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function SearchBar({ setSearchh }) {

    const [input, setInput] = React.useState('');

    const handleInputChange = (e) => {
      setInput(e.target.value);
    }

    const handleSearch = (e) => {
      e.preventDefault();
      setSearchh(input);
    }

    return (
      <Box sx={{ margin: '2em', marginBottom: '0'}}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={5}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSearch}
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
                    type="submit" 
                  >
                    Buscar
                  </Button>
 
                </Box>
            </Grid>
        </Grid>
      </Box>
    );
}
