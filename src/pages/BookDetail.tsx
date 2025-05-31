import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Rating,
  Chip,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { books } from '../data/books';
import { addToCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { RootState } from '../store';
import { addReview } from '../store/slices/reviewSlice';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const book = books.find(b => b.id === id);
  const relatedBooks = books.filter(b => b.category === book?.category && b.id !== id).slice(0, 4);
  const reviews = useSelector((state: RootState) => (id ? state.reviews[id] : [])) || [];
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!book) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Book not found
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/books')} sx={{ mt: 2 }}>
          Back to Books
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
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

  const handleSubmitReview = () => {
    if (!user) {
      setSnackbarMessage('You must be logged in to submit a review.');
      setSnackbarOpen(true);
      return;
    }
    if (newReview.comment.trim()) {
      dispatch(addReview({
        bookId: book.id,
        review: {
          id: Date.now().toString(),
          userId: user.email,
          userName: user.name || user.email,
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date().toISOString(),
        },
      }));
      setSnackbarMessage('Review submitted successfully!');
      setSnackbarOpen(true);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/books')}
        sx={{ mb: 3 }}
      >
        Back to Books
      </Button>

      {/* Book Details */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 6, mb: 6 }}>
        {/* Book Image */}
        <Box>
          <Card sx={{ maxWidth: 400, mx: 'auto' }}>
            <CardMedia
              component="img"
              height="500"
              image={book.image}
              alt={book.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Box>

        {/* Book Information */}
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            {book.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            by {book.author}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Rating value={book.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({book.rating}) • {reviews.length} reviews
            </Typography>
          </Box>
          <Chip label={book.category} color="primary" sx={{ mb: 2 }} />
          <Typography variant="h4" color="error" sx={{ fontWeight: 700, mb: 3 }}>
            ${book.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
            {book.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={!book.inStock}
              sx={{ flex: 1 }}
            >
              {book.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              color={isFavorite ? 'error' : 'default'}
              size="large"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Format: {book.format} • In Stock: {book.stock} copies
          </Typography>
        </Box>
      </Box>

      {/* Customer Reviews Section */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Customer Reviews
        </Typography>
        {/* Add Review Form */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Write a Review
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="body2">Rating:</Typography>
            <Rating
              value={newReview.rating}
              onChange={(_, value) => setNewReview({ ...newReview, rating: value || 5 })}
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your thoughts about this book..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitReview}
            disabled={!newReview.comment.trim()}
          >
            Submit Review
          </Button>
        </Box>
        {/* Reviews List */}
        <List>
          {reviews.length === 0 && (
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No reviews yet. Be the first to review this book!
            </Typography>
          )}
          {reviews.map((review) => (
            <ListItem key={review.id} alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemAvatar>
                <Avatar>{review.userName?.charAt(0) || '?'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {review.userName}
                    </Typography>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
                secondary={review.comment}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            Related Books
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3
          }}>
            {relatedBooks.map((relatedBook) => (
              <Card
                key={relatedBook.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/books/${relatedBook.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={relatedBook.image}
                  alt={relatedBook.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                    {relatedBook.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {relatedBook.author}
                  </Typography>
                  <Typography variant="h6" color="error" sx={{ fontWeight: 700, mt: 1 }}>
                    ${relatedBook.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
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

export default BookDetail; 