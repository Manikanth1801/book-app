import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Sale } from '../../types/mockTypes';
import { Book } from '../../types';
import { mockSales, mockBooks } from '../../data/mockData';

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [formData, setFormData] = useState<Partial<Sale>>({
    isActive: true,
    books: [],
    discountPercentage: 0,
    theme: 'default',
  });

  const handleOpen = (sale?: Sale) => {
    if (sale) {
      setSelectedSale(sale);
      setFormData(sale);
    } else {
      setSelectedSale(null);
      setFormData({
        isActive: true,
        books: [],
        discountPercentage: 0,
        theme: 'default',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSale(null);
    setFormData({
      isActive: true,
      books: [],
      discountPercentage: 0,
      theme: 'default',
    });
  };

  const handleSubmit = () => {
    if (selectedSale) {
      // Update existing sale
      setSales(sales.map(sale => 
        sale.id === selectedSale.id ? { ...sale, ...formData } : sale
      ));
    } else {
      // Add new sale
      const newSale: Sale = {
        ...formData as Sale,
        id: Date.now().toString(),
        books: formData.books || [],
      };
      setSales([...sales, newSale]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sales Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Sale
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Books</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.name}</TableCell>
                <TableCell>{sale.description}</TableCell>
                <TableCell>{sale.discountPercentage}%</TableCell>
                <TableCell>
                  {new Date(sale.startDate).toLocaleDateString()} - {new Date(sale.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{sale.books.length} books</TableCell>
                <TableCell>
                  <Chip
                    label={sale.isActive ? 'Active' : 'Inactive'}
                    color={sale.isActive ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(sale)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(sale.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedSale ? 'Edit Sale' : 'Add New Sale'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Sale Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Discount Percentage"
                value={formData.discountPercentage || ''}
                onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
              />
              <TextField
                fullWidth
                select
                label="Theme"
                value={formData.theme || 'default'}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as Sale['theme'] })}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="christmas">Christmas</MenuItem>
                <MenuItem value="summer">Summer</MenuItem>
                <MenuItem value="festival">Festival</MenuItem>
              </TextField>
            </Box>
            <TextField
              fullWidth
              select
              SelectProps={{
                multiple: true,
                value: formData.books || [],
                onChange: (e) => {
                  const selectedIds = e.target.value as string[];
                  setFormData({ ...formData, books: selectedIds });
                },
              }}
              label="Select Books"
            >
              {mockBooks.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title} - ${book.price}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedSale ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sales; 