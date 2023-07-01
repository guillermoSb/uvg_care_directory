
import { Box } from '@material-ui/core';
import { useState } from 'react';
import BasicTable from './components/BasicTable';
import SearchBar from './components/SearchBar';
import Title from './components/Title';

export const DirectoryApp = () => {

  const [search, setSearch] = useState('');

  return (
    <Box>
      <Title />
      <SearchBar setSearchh={setSearch} />
      <BasicTable search={search} />
    </Box>

  )
}
