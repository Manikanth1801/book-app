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

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            <Card
              key={book.id}
              component={RouterLink}
              to={`/books/${book.id}`}
              sx={{
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={book.image}
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 700 }}
                >
                  ${book.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
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
                to={`/categories/${category.toLowerCase()}`}
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
    </Box>
  );
};

export default Home; 