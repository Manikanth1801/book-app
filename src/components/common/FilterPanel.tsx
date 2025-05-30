import React from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface FilterPanelProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  ratings: number[];
  selectedRatings: number[];
  onRatingChange: (rating: number) => void;
  availability: boolean;
  onAvailabilityChange: (available: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  priceRange,
  onPriceRangeChange,
  categories,
  selectedCategories,
  onCategoryChange,
  ratings,
  selectedRatings,
  onRatingChange,
  availability,
  onAvailabilityChange,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>
        <IconButton onClick={handleExpandClick}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => onPriceRangeChange(newValue as [number, number])}
            valueLabelDisplay="auto"
            min={0}
            max={200}
            valueLabelFormat={(value) => `$${value}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">${priceRange[0]}</Typography>
            <Typography variant="body2">${priceRange[1]}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Categories</Typography>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => onCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Rating</Typography>
          <FormGroup>
            {ratings.map((rating) => (
              <FormControlLabel
                key={rating}
                control={
                  <Checkbox
                    checked={selectedRatings.includes(rating)}
                    onChange={() => onRatingChange(rating)}
                  />
                }
                label={`${rating} Stars & Up`}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={availability}
                onChange={(e) => onAvailabilityChange(e.target.checked)}
              />
            }
            label="In Stock Only"
          />
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FilterPanel; 