import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface Sale {
  id: number;
  name: string;
  discount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  books: number;
}

const mockSales: Sale[] = [
  {
    id: 1,
    name: 'Summer Reading Sale',
    discount: 20,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    isActive: true,
    books: 15,
  },
  {
    id: 2,
    name: 'Back to School',
    discount: 15,
    startDate: '2024-08-15',
    endDate: '2024-09-15',
    isActive: true,
    books: 10,
  },
  {
    id: 3,
    name: 'Holiday Special',
    discount: 25,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    isActive: false,
    books: 20,
  },
];

export default function Sales() {
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const handleOpen = (sale?: Sale) => {
    setSelectedSale(sale || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSale(null);
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
          Add New Sale
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Books</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.name}</TableCell>
                <TableCell>{sale.discount}%</TableCell>
                <TableCell>{sale.startDate}</TableCell>
                <TableCell>{sale.endDate}</TableCell>
                <TableCell>
                  <Typography
                    color={sale.isActive ? 'success.main' : 'error.main'}
                  >
                    {sale.isActive ? 'Active' : 'Inactive'}
                  </Typography>
                </TableCell>
                <TableCell>{sale.books}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(sale)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedSale ? 'Edit Sale' : 'Add New Sale'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Sale Name"
              defaultValue={selectedSale?.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Discount"
              type="number"
              defaultValue={selectedSale?.discount}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              defaultValue={selectedSale?.startDate}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="End Date"
              type="date"
              defaultValue={selectedSale?.endDate}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={selectedSale?.isActive}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            {selectedSale ? 'Save Changes' : 'Add Sale'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 