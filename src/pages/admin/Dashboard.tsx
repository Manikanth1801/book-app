import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  Book as BookIcon,
  People as PeopleIcon,
  LocalOffer as SalesIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

// Mock data for dashboard
const stats = {
  totalBooks: 1250,
  totalCustomers: 850,
  activeSales: 5,
  totalRevenue: 45678.90,
};

const recentOrders = [
  { id: 'ORD001', date: '2024-03-15', total: 129.99, status: 'Delivered' },
  { id: 'ORD002', date: '2024-03-14', total: 89.99, status: 'Processing' },
  { id: 'ORD003', date: '2024-03-14', total: 199.99, status: 'Shipped' },
  { id: 'ORD004', date: '2024-03-13', total: 59.99, status: 'Delivered' },
  { id: 'ORD005', date: '2024-03-13', total: 149.99, status: 'Processing' },
];

const lowStockBooks = [
  { id: 'BK001', title: 'The Great Gatsby', stock: 3, price: 19.99 },
  { id: 'BK002', title: 'To Kill a Mockingbird', stock: 5, price: 15.99 },
  { id: 'BK003', title: '1984', stock: 2, price: 12.99 },
  { id: 'BK004', title: 'Pride and Prejudice', stock: 4, price: 14.99 },
];

const activeSales = [
  { id: 'SALE001', name: 'Summer Reading', discount: 20, books: 15 },
  { id: 'SALE002', name: 'New Releases', discount: 15, books: 8 },
  { id: 'SALE003', name: 'Classic Collection', discount: 25, books: 12 },
];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div">
        {typeof value === 'number' && title.includes('Revenue')
          ? `$${value.toLocaleString()}`
          : value.toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={<BookIcon color="primary" />}
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<PeopleIcon color="primary" />}
        />
        <StatCard
          title="Active Sales"
          value={stats.activeSales}
          icon={<SalesIcon color="primary" />}
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={<MoneyIcon color="primary" />}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mt: 3 }}>
        {/* Recent Orders */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Orders
          </Typography>
          <List>
            {recentOrders.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem>
                  <ListItemText
                    primary={`Order ${order.id}`}
                    secondary={`${order.date} - $${order.total}`}
                  />
                  <Typography
                    variant="body2"
                    color={
                      order.status === 'Delivered'
                        ? 'success.main'
                        : order.status === 'Processing'
                        ? 'warning.main'
                        : 'info.main'
                    }
                  >
                    {order.status}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Low Stock Books */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Low Stock Books
          </Typography>
          <List>
            {lowStockBooks.map((book) => (
              <React.Fragment key={book.id}>
                <ListItem>
                  <ListItemText
                    primary={book.title}
                    secondary={`Stock: ${book.stock} | Price: $${book.price}`}
                  />
                  <Typography
                    variant="body2"
                    color={book.stock <= 3 ? 'error.main' : 'warning.main'}
                  >
                    {book.stock <= 3 ? 'Critical' : 'Low'}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Active Sales */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Active Sales
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
          {activeSales.map((sale) => (
            <Card key={sale.id}>
              <CardContent>
                <Typography variant="h6">{sale.name}</Typography>
                <Typography color="text.secondary">
                  {sale.discount}% off
                </Typography>
                <Typography variant="body2">
                  {sale.books} books included
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard; 