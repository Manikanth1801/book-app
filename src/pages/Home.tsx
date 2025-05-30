import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  useTheme,
} from '@mui/material';
import { mockBooks, categories, features, getRandomBookImage } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const featuredBooks = mockBooks.slice(0, 4);

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${getRandomBookImage(0)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Bookstore
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Discover your next favorite book
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/books')}
          sx={{ px: 4, py: 1.5 }}
        >
          Browse Books
        </Button>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Explore Categories
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {categories.map((category) => (
            <Card
              key={category.id}
              sx={{
                flex: '1 1 250px',
                minWidth: '250px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
              onClick={() => navigate(`/books?category=${category.name}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Featured Books Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Books
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {featuredBooks.map((book) => (
            <Card
              key={book.id}
              sx={{
                flex: '1 1 250px',
                minWidth: '250px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <CardMedia
                component="img"
                height="300"
                image={book.coverImage}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom noWrap>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${book.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Choose Us
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {features.map((feature) => (
            <Card
              key={feature.id}
              sx={{
                flex: '1 1 250px',
                minWidth: '250px',
                textAlign: 'center',
                p: 3,
              }}
            >
              <Typography variant="h2" sx={{ mb: 2 }}>
                {feature.icon}
              </Typography>
              <Typography variant="h6" component="h3" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 