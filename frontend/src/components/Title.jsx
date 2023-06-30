import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getEmployees } from '../helpers/getEmployees';

export default function Title() {

  const consoleLog = () => {
    getEmployees().then((data) => {
      console.log(data);
    });
  }

  consoleLog();

  return (
    <Box display='flex' marginTop='2em' marginBottom='3em'>
      <Typography m='auto' variant="h2" gutterBottom>
        Directorio
      </Typography>
    </Box>
  );
}
