import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function SearchBar() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={6} lg={5}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField 
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined" 
                    fullWidth 
                  />
                </Box>
            </Grid>
        </Grid>
    );
}
