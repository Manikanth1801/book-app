import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Slider,
  Paper,
  IconButton,
  useTheme,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { books as booksData } from '../data/books';
import { addToCart } from '../store/slices/cartSlice';

const categoryDescriptions: Record<string, string> = {
  'Fiction': 'Immerse yourself in captivating stories, from literary classics to contemporary novels that explore the human experience.',
  'Non-Fiction': 'Discover real-world insights, biographies, history, and educational content that inform and inspire.',
  'Science Fiction': 'Explore futuristic worlds, space adventures, and imaginative technologies that push the boundaries of possibility.',
  'Mystery': 'Solve puzzles and uncover secrets with thrilling detective stories and suspenseful page-turners.',
  'Romance': 'Fall in love with heartwarming stories of passion, relationships, and happily-ever-afters.',
  'Fantasy': 'Journey to magical realms filled with mythical creatures, epic quests, and supernatural adventures.',
  'Biography': 'Learn from the lives of remarkable people who have shaped our world and left lasting legacies.',
  'Self-Help': 'Transform your life with practical advice, personal development strategies, and motivational guidance.',
  'Children': 'Delight young readers with age-appropriate stories that educate, entertain, and inspire imagination.',
  'Teen & Young Adult': 'Connect with coming-of-age stories that resonate with teenage experiences and challenges.',
};

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 50]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const decodedCategory = decodeURIComponent(category || '');
  const categoryBooks = booksData.filter(book => 
    book.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  const filteredBooks = categoryBooks.filter(book => {
    const matchesSearch = searchQuery === '' || 
                         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    return matchesSearch && matchesPrice;
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
      case 'newest':
        return new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime();
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
    setPriceRange([0, 50]);
    setSortBy('featured');
  };

  if (categoryBooks.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom>
          Category not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The category "{decodedCategory}" doesn't exist or has no books.
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/books')}>
          Browse All Books
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/books')}
          sx={{ textDecoration: 'none' }}
        >
          Books
        </Link>
        <Typography color="text.primary">{decodedCategory}</Typography>
      </Breadcrumbs>

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          {decodedCategory}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2, maxWidth: '800px' }}>
          {categoryDescriptions[decodedCategory] || `Explore our collection of ${decodedCategory} books.`}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          {searchQuery ? 
            `Search results in ${decodedCategory} for "${searchQuery}" (${sortedBooks.length} books found)` : 
            `${sortedBooks.length} books in ${decodedCategory}`
          }
        </Typography>
        
        {/* Search and Filter Bar */}
        <Paper sx={{ p: 2, mb: showFilters ? 2 : 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <TextField
                fullWidth
                placeholder={`Search in ${decodedCategory}...`}
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
                  <MenuItem value="newest">Newest First</MenuItem>
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
            <Box sx={{ maxWidth: 500 }}>
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
          </Paper>
        )}
      </Box>

      {/* Books Grid */}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>
                    ${book.price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={book.format}
                    size="small"
                    color={book.format === 'eBook' ? 'secondary' : 'primary'}
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

      {/* No Results Message */}
      {sortedBooks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No books found in {decodedCategory}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Try adjusting your filters or search terms
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

export default Category; 