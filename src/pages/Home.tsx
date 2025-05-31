import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { books } from '../data/books';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BookCard from '../components/common/BookCard';

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleAddToCart = (book: any) => {
    const cartItem = {
      bookId: book.id,
      quantity: 1,
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        coverImage: book.image,
        category: book.category,
        inStock: book.inStock,
        rating: book.rating,
        reviews: []
      }
    };
    dispatch(addToCart(cartItem));
    setSnackbarMessage(`"${book.title}" added to cart!`);
    setSnackbarOpen(true);
  };

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => theme.palette.secondary.main,
          color: '#000',
          py: { xs: 10, md: 14 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  fontWeight: 800,
                  mb: 3,
                }}
              >
                Discover Your Next Favorite Book
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 5,
                  opacity: 1,
                  fontWeight: 500,
                }}
              >
                Explore our vast collection of books and find your next great read.
              </Typography>
              <Button
                component={RouterLink}
                to="/books"
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                Browse Books
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="/hero-image.jpg"
                alt="Books"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: 6,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.10)',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Featured Books Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 5,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          Featured Books
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 5,
          }}
        >
          {books.slice(0, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            component={RouterLink}
            to="/books"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ px: 5, fontWeight: 700, borderRadius: 3 }}
          >
            View All Books
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              mb: 5,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Browse by Category
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 5,
            }}
          >
            {['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Poetry'].map((category) => (
              <Card
                key={category}
                component={RouterLink}
                to={`/category/${category}`}
                sx={{
                  textDecoration: 'none',
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: (theme) => theme.palette.secondary.main,
                  color: '#000',
                  fontWeight: 700,
                  borderRadius: 4,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {category}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 