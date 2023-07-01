import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Title() {

  return (
    <Box display='flex' marginTop='2em' marginBottom='2em'>
      <Typography m='auto' variant="h2" gutterBottom>
        Directorio
      </Typography>
    </Box>
  );
}
