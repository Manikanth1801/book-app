import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { books as booksData } from '../data/books';
import { addToCart } from '../store/slices/cartSlice';

const SearchResults: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Update search params when search query changes
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    setSearchParams(params, { replace: true });
  }, [searchQuery, setSearchParams]);

  const filteredBooks = booksData.filter(book => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return book.title.toLowerCase().includes(query) ||
           book.author.toLowerCase().includes(query) ||
           book.category.toLowerCase().includes(query) ||
           book.description.toLowerCase().includes(query);
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default: // relevance
        // Simple relevance scoring based on title match
        const aScore = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 1;
        const bScore = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 1;
        return bScore - aScore;
    }
  });

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

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

  const handleSearch = () => {
    // Update URL and trigger search
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          {searchQuery ? 
            `Results for "${searchQuery}" (${sortedBooks.length} books found)` : 
            'Enter a search term to find books'
          }
        </Typography>
        
        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 400px', minWidth: '300px' }}>
              <TextField
                fullWidth
                placeholder="Search by title, author, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSearch}
                        sx={{ minWidth: 'auto', px: 2 }}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {searchQuery && (
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="relevance">Relevance</MenuItem>
                    <MenuItem value="title">Title A-Z</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Top Rated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Results Grid */}
      {searchQuery && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {sortedBooks.map((book) => (
            <Box key={book.id} sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={book.image}
                    alt={book.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(book.id);
                    }}
                  >
                    {favorites.includes(book.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={book.rating || 0} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({book.rating || 0})
                    </Typography>
                  </Box>
                  <Chip
                    label={book.category}
                    size="small"
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>
                      ${book.price.toFixed(2)}
                    </Typography>
                    <Chip
                      label={book.format}
                      size="small"
                      color={book.format === 'eBook' ? 'secondary' : 'default'}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="secondary"
                    disabled={!book.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(book);
                    }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    {book.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* No Results Message */}
      {searchQuery && sortedBooks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No books found for "{searchQuery}"
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Try using different keywords or check your spelling
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/books')}
          >
            Browse All Books
          </Button>
        </Box>
      )}

      {/* Empty State */}
      {!searchQuery && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            Enter a search term to find books
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Search by title, author, category, or description
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/books')}
          >
            Browse All Books
          </Button>
        </Box>
      )}

      {/* Snackbar */}
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
    </Container>
  );
};

export default SearchResults; 