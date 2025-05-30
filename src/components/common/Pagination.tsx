import React from 'react';
import {
  Box,
  Pagination as MuiPagination,
  PaginationItem,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
    searchParams.set('limit', newItemsPerPage.toString());
    searchParams.set('page', '1'); // Reset to first page when changing items per page
    setSearchParams(searchParams);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3,
        mb: 3,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="items-per-page-label">Items per page</InputLabel>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          label="Items per page"
          onChange={handleItemsPerPageChange}
        >
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={36}>36</MenuItem>
          <MenuItem value={48}>48</MenuItem>
        </Select>
      </FormControl>

      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default Pagination; 