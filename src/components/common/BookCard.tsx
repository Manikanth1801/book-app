import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Book } from '../../types/mockTypes';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { RootState } from '../../store';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((b) => b.id === book.id);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(addToCart({ book, quantity: 1 }));
  };

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleWishlistToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(book.id));
    } else {
      dispatch(addToWishlist(book));
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%', bgcolor: 'grey.200' }}>
        <CardMedia
          component="img"
          image={book.coverImage || '/images/placeholder.jpg'}
          alt={book.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
            zIndex: 2,
          }}
          onClick={handleWishlistToggle}
        >
          {isInWishlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        {hovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.45)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1,
              pointerEvents: 'none',
              borderRadius: 2,
            }}
          >
            Click for more details
          </Box>
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.format}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={book.rating} precision={0.5} size="small" readOnly />
          {book.reviews && book.reviews.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({book.reviews.length})
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h6" color="primary.main">
            ${book.price.toFixed(2)}
          </Typography>
          {book.salePrice && book.price > book.salePrice && (
            <Typography variant="body2" color="error.main" sx={{ textDecoration: 'line-through' }}>
              ${book.salePrice.toFixed(2)}
            </Typography>
          )}
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
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          disabled={!book.inStock}
        >
          {book.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Box>
    </Card>
  );
};

export default BookCard; 