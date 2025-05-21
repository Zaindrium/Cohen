import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material';
import {
  Home,
  Apartment,
  Description,
  TrendingUp,
  Add,
} from '@mui/icons-material';

const Dashboard = ({ listingType, setListingType }) => {
  const navigate = useNavigate();

  const handleListingTypeChange = (event, newType) => {
    if (newType !== null) {
      setListingType(newType);
    }
  };

  const stats = {
    totalProperties: listingType === 'rentals' ? 24 : 18,
    activeListings: listingType === 'rentals' ? 15 : 12,
    pendingApplications: 8,
    monthlyViews: 1250,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ToggleButtonGroup
            value={listingType}
            exclusive
            onChange={handleListingTypeChange}
            aria-label="listing type"
          >
            <ToggleButton value="rentals" aria-label="rentals">
              <Apartment sx={{ mr: 1 }} />
              Rentals
            </ToggleButton>
            <ToggleButton value="sales" aria-label="sales">
              <Home sx={{ mr: 1 }} />
              Sales
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/properties/new')}
          >
            Add Property
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Home sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Total Properties</Typography>
              </Box>
              <Typography variant="h4">{stats.totalProperties}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Apartment sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Active Listings</Typography>
              </Box>
              <Typography variant="h4">{stats.activeListings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Description sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Pending Applications</Typography>
              </Box>
              <Typography variant="h4">{stats.pendingApplications}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Monthly Views</Typography>
              </Box>
              <Typography variant="h4">{stats.monthlyViews}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
