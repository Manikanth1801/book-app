import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {debounce} from 'lodash';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search books...',
  initialValue = '',
  fullWidth = false,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/books?search=${encodeURIComponent(query)}`);
      }
    }, 300),
    [onSearch, navigate]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    } else {
      navigate('/books');
    }
  };

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        fullWidth={fullWidth}
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'background.paper',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar; 