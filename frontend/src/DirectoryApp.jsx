
import { Box, Typography } from '@material-ui/core';
import { useState } from 'react';
import BasicTable from './components/BasicTable';
import SearchBar from './components/SearchBar';

export const DirectoryApp = () => {

  const [search, setSearch] = useState('');

  return (
    <Box>
      <Box display='flex' marginTop='2em' marginBottom='3em'>
        <Typography m='auto' variant="h2" gutterBottom>
          Directorio
        </Typography>
      </Box>

      <SearchBar setSearchh={setSearch} />
      <BasicTable search={search} />

    </Box>

  )
}
