import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const Marketing = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - would be fetched from Google Sheets API in production
  const marketingStats = {
    totalApplications: 45,
    conversionRate: '12.5%',
    averageIncome: '$75,000',
    topLocations: [
      { location: 'Downtown', count: 15 },
      { location: 'Suburbs North', count: 12 },
      { location: 'Waterfront', count: 10 },
      { location: 'West End', count: 8 }
    ],
    propertyTypePreferences: [
      { type: 'Apartment', percentage: '45%' },
      { type: 'House', percentage: '30%' },
      { type: 'Condo', percentage: '15%' },
      { type: 'Townhouse', percentage: '10%' }
    ],
    recentApplications: [
      {
        id: 1,
        date: '2023-08-15',
        name: 'John Doe',
        propertyType: 'Apartment',
        location: 'Downtown',
        budget: '$2,500'
      },
      {
        id: 2,
        date: '2023-08-14',
        name: 'Jane Smith',
        propertyType: 'House',
        location: 'Suburbs North',
        budget: '$450,000'
      },
      {
        id: 3,
        date: '2023-08-13',
        name: 'Mike Johnson',
        propertyType: 'Condo',
        location: 'Waterfront',
        budget: '$350,000'
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Marketing Analytics
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Total Applications</Typography>
              <Typography variant="h3">{marketingStats.totalApplications}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Conversion Rate</Typography>
              <Typography variant="h3">{marketingStats.conversionRate}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Average Income</Typography>
              <Typography variant="h3">{marketingStats.averageIncome}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Locations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Top Requested Locations</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Applications</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketingStats.topLocations.map((location) => (
                      <TableRow key={location.location}>
                        <TableCell>{location.location}</TableCell>
                        <TableCell align="right">{location.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Property Type Preferences */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Property Type Preferences</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Property Type</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketingStats.propertyTypePreferences.map((preference) => (
                      <TableRow key={preference.type}>
                        <TableCell>{preference.type}</TableCell>
                        <TableCell align="right">{preference.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Applications</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Property Type</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Budget</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketingStats.recentApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.date}</TableCell>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.propertyType}</TableCell>
                        <TableCell>{application.location}</TableCell>
                        <TableCell align="right">{application.budget}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Marketing;