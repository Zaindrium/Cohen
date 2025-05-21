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
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LeaseAgreement = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [formData, setFormData] = useState({
    // Property Details
    property: '',
    propertyType: '',
    monthlyRent: '',
    leaseStartDate: '',
    leaseDuration: '',
    depositAmount: '',

    // Tenant Information
    tenantName: '',
    email: '',
    phone: '',
    currentAddress: '',
    employmentStatus: '',
    monthlyIncome: '',

    // Employment Details
    employer: '',
    employerContact: '',
    position: '',
    employmentLength: '',

    // References
    previousLandlord: {
      name: '',
      phone: '',
      email: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },

    // Additional Terms
    utilities: [],
    petPolicy: '',
    parkingSpaces: '',
    specialConditions: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 1. Create new client in CRM
      const clientData = {
        name: formData.tenantName,
        email: formData.email,
        phone: formData.phone,
        status: 'active',
        interests: [formData.propertyType],
        viewingHistory: [
          {
            property: formData.property,
            date: new Date().toISOString().split('T')[0],
            notes: 'Lease agreement submitted',
          },
        ],
      };

      // 2. Create Google Sheets copy
      // This would be handled by your backend service

      // 3. Update property analytics
      // This would be handled by your backend service

      setNotification({
        open: true,
        message: 'Lease agreement submitted successfully!',
        severity: 'success',
      });

      // Navigate to CRM after successful submission
      setTimeout(() => navigate('/crm'), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error submitting lease agreement',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lease Agreement
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Property Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Property Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Property"
                name="property"
                value={formData.property}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Property Type</InputLabel>
                <Select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  label="Property Type"
                >
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="condo">Condo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Monthly Rent"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Lease Start Date"
                name="leaseStartDate"
                value={formData.leaseStartDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Tenant Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Tenant Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="tenantName"
                value={formData.tenantName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            {/* Employment Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Employment Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Employer"
                name="employer"
                value={formData.employer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Monthly Income"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
              />
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
                Submit Lease Agreement
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeaseAgreement;
