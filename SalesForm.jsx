import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';

const SalesForm = () => {
  const [formData, setFormData] = useState({
    property: {
      address: '',
      type: '',
      bedrooms: '',
      bathrooms: '',
      parkingSpaces: '',
      totalArea: '',
      yearBuilt: '',
    },
    pricing: {
      listingPrice: '',
      offerPrice: '',
      depositAmount: '',
    },
    buyer: {
      name: '',
      email: '',
      phone: '',
      currentAddress: '',
    },
    financials: {
      preApproved: false,
      lenderName: '',
      loanAmount: '',
      downPayment: '',
    },
    employment: {
      employer: '',
      position: '',
      annualIncome: '',
      yearsEmployed: '',
    },
    applicationStatus: 'pending',
    viewingAgent: '',
    offerDate: '',
    closingDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Property Purchase Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Property Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Property Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Address"
                name="property.address"
                value={formData.property.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Property Type"
                name="property.type"
                value={formData.property.type}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Bedrooms"
                name="property.bedrooms"
                value={formData.property.bedrooms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Bathrooms"
                name="property.bathrooms"
                value={formData.property.bathrooms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Total Area (sq ft)"
                name="property.totalArea"
                value={formData.property.totalArea}
                onChange={handleChange}
              />
            </Grid>

            {/* Pricing Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Pricing Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Listing Price"
                name="pricing.listingPrice"
                value={formData.pricing.listingPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Offer Price"
                name="pricing.offerPrice"
                value={formData.pricing.offerPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Deposit Amount"
                name="pricing.depositAmount"
                value={formData.pricing.depositAmount}
                onChange={handleChange}
              />
            </Grid>

            {/* Buyer Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Buyer Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="buyer.name"
                value={formData.buyer.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="buyer.email"
                value={formData.buyer.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="buyer.phone"
                value={formData.buyer.phone}
                onChange={handleChange}
              />
            </Grid>

            {/* Financial Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Financial Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lender Name"
                name="financials.lenderName"
                value={formData.financials.lenderName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Loan Amount"
                name="financials.loanAmount"
                value={formData.financials.loanAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Down Payment"
                name="financials.downPayment"
                value={formData.financials.downPayment}
                onChange={handleChange}
              />
            </Grid>

            {/* Employment Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Employment Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Employer"
                name="employment.employer"
                value={formData.employment.employer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Annual Income"
                name="employment.annualIncome"
                value={formData.employment.annualIncome}
                onChange={handleChange}
              />
            </Grid>

            {/* Application Status */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Application Status</InputLabel>
                <Select
                  name="applicationStatus"
                  value={formData.applicationStatus}
                  onChange={handleChange}
                  label="Application Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="declined">Declined</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SalesForm;
