import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Book } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ book, quantity: 1 }));
  };

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative', paddingTop: '140%' }}>
        <LazyLoadImage
          src={book.coverImage}
          alt={book.title}
          effect="blur"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={book.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({book.reviews.length})
          </Typography>
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${book.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAddToCart}
            disabled={!book.inStock}
          >
            {book.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Box>
        {!book.inStock && (
          <Chip
            label="Out of Stock"
            color="error"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard; 