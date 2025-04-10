import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search,
  LocationOn,
  Hotel,
  Bathtub,
  DirectionsCar,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';

const Properties = ({ listingType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [favorites, setFavorites] = useState([]);

  // Mock property data - would be fetched from API in production
  const properties = [
    {
      id: 1,
      type: 'apartment',
      title: 'Modern Downtown Apartment',
      address: '123 City Center, Downtown',
      price: listingType === 'rentals' ? 2500 : 450000,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      image: 'https://placehold.co/600x400',
      status: 'available'
    },
    {
      id: 2,
      type: 'house',
      title: 'Luxury Suburban Home',
      address: '456 Maple Avenue, Suburbs',
      price: listingType === 'rentals' ? 3500 : 750000,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      image: 'https://placehold.co/600x400',
      status: 'available'
    }
  ];

  const toggleFavorite = (propertyId) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
          {listingType === 'rentals' ? 'Rental Properties' : 'Properties for Sale'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by location or property name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property Type</InputLabel>
              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                label="Property Type"
              >
                <MenuItem value="all">All Properties</MenuItem>
                <MenuItem value="apartment">Apartments</MenuItem>
                <MenuItem value="house">Houses</MenuItem>
                <MenuItem value="condo">Condos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  bgcolor: 'background.default', // White background
                  boxShadow: 1, // Subtle box shadow
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                      transform: 'translateY(-4px)', // Lift on hover
                      boxShadow: 5, // Stronger shadow on hover
                  }
              }}

              >
                <Chip
                  label={property.status}
                  size="small"
                  sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1,
                    bgcolor: property.status === 'available' ? 'available.main' : 'underContract.main',
                    color: 'white',
                 }}
                />
                <CardMedia sx={{ position: 'relative' }}
                  component="img"
                  height="200"
                  image={property.image}
                  alt={property.title}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' }
                  }}
                  onClick={() => toggleFavorite(property.id)}
                >
                  {favorites.includes(property.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    {property.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  >
                    <LocationOn sx={{ fontSize: 18, mr: 0.5 }} />
                    {property.address}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                    {formatPrice(property.price)}
                    {listingType === 'rentals' && '/month'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip
                      icon={<Hotel />}
                      label={`${property.bedrooms} Beds`}
                      size="small"
                    />
                    <Chip
                      icon={<Bathtub />}
                      label={`${property.bathrooms} Baths`}
                      size="small"
                    />
                    <Chip
                      icon={<DirectionsCar />}
                      label={`${property.parking} Parking`}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Properties;