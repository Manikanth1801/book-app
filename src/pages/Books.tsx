import React, { useState } from 'react';
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
  Slider,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { Book } from '../types/mockTypes';
import { books as booksData } from '../data/books';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BookCard from '../components/common/BookCard';

const Books: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 50]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Update search params when search query changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params, { replace: true });
  }, [searchQuery, searchParams, setSearchParams]);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const categories = Array.from(new Set(booksData.map(book => book.category)));

  const filteredBooks = booksData.filter(book => {
    const matchesSearch = searchQuery === '' || 
                         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
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
      default:
        return 0;
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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 50]);
    setSortBy('featured');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Book Collection
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          {searchQuery ? 
            `Search results for "${searchQuery}" (${sortedBooks.length} books found)` : 
            `Discover your next favorite book from our carefully curated collection (${sortedBooks.length} books)`
          }
        </Typography>
        
        {/* Search and Filter Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <TextField
                fullWidth
                placeholder="Search by title, author, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="title">Title A-Z</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Top Rated</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '150px' }}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Filters Section */}
        {showFilters && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Category
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '2 1 400px', minWidth: '300px' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Price Range
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={50}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 25, label: '$25' },
                    { value: 50, label: '$50' },
                  ]}
                />
              </Box>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Books Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {sortedBooks.map((book) => (
          <Box key={book.id} sx={{ flex: '1 1 250px', minWidth: '250px' }}>
            <BookCard book={book} />
          </Box>
        ))}
      </Box>

      {/* No Results Message */}
      {sortedBooks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No books found matching your criteria
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      )}

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
    </Container>
  );
};

export default Books; 