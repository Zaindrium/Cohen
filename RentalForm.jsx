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
  Divider
} from '@mui/material';

const RentalForm = () => {
  const [formData, setFormData] = useState({
    property: '',
    applicantName: '',
    occupationDate: '',
    rentalAmount: '',
    depositAmount: '',
    keyFee: '',
    adminFee: '',
    itcCheck: '',
    minimumSalary: '',
    employmentDetails: {
      employer: '',
      position: '',
      salary: '',
      startDate: ''
    },
    previousLandlord: {
      name: '',
      reference: ''
    },
    employmentConfirmed: false,
    applicationStatus: 'pending',
    depositRef: '',
    rentalRef: '',
    viewingAgent: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
          Rental Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Property Details */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Property"
                name="property"
                value={formData.property}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Applicant Name"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Occupation Date"
                name="occupationDate"
                value={formData.occupationDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Financial Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Financial Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Rental Amount"
                name="rentalAmount"
                value={formData.rentalAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Deposit Amount"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Key Fee"
                name="keyFee"
                value={formData.keyFee}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Admin Fee"
                name="adminFee"
                value={formData.adminFee}
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
                label="Employer"
                name="employmentDetails.employer"
                value={formData.employmentDetails.employer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position"
                name="employmentDetails.position"
                value={formData.employmentDetails.position}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Salary"
                name="employmentDetails.salary"
                value={formData.employmentDetails.salary}
                onChange={handleChange}
              />
            </Grid>

            {/* Previous Landlord */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Previous Landlord Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Landlord Name"
                name="previousLandlord.name"
                value={formData.previousLandlord.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Reference"
                name="previousLandlord.reference"
                value={formData.previousLandlord.reference}
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

export default RentalForm;