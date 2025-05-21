import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [propertyMetrics, setPropertyMetrics] = useState([
    {
      id: 1,
      address: '123 Main St, Apt 4B',
      type: 'apartment',
      inquiries: 15,
      viewings: 8,
      applications: 3,
      leaseAgreements: 1,
      conversionRate: 37.5,
    },
    {
      id: 2,
      address: '456 Oak Ave',
      type: 'house',
      inquiries: 22,
      viewings: 12,
      applications: 5,
      leaseAgreements: 2,
      conversionRate: 41.7,
    },
  ]);

  // Property Performance Chart Data
  const propertyPerformance = {
    labels: propertyMetrics.map((p) => p.address.split(',')[0]),
    datasets: [
      {
        label: 'Interest Metrics',
        data: propertyMetrics.map((p) => p.inquiries),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Property Interest Distribution
  const propertyInterest = {
    labels: ['Inquiries', 'Viewings', 'Applications', 'Lease Agreements'],
    datasets: [
      {
        data: propertyMetrics.reduce(
          (acc, p) => [
            acc[0] + p.inquiries,
            acc[1] + p.viewings,
            acc[2] + p.applications,
            acc[3] + p.leaseAgreements,
          ],
          [0, 0, 0, 0],
        ),
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
      },
    ],
  };

  // Conversion Funnel
  const conversionTrends = {
    labels: propertyMetrics.map((p) => p.address.split(',')[0]),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: propertyMetrics.map((p) => p.conversionRate),
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
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
          Property Analytics
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
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property Interest Trends
              </Typography>
              <Line
                data={propertyPerformance}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: false },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interest Distribution
              </Typography>
              <Bar
                data={propertyInterest}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property Conversion Rates
              </Typography>
              <Bar
                data={conversionTrends}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: false },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Inquiries</TableCell>
                  <TableCell align="right">Viewings</TableCell>
                  <TableCell align="right">Applications</TableCell>
                  <TableCell align="right">Lease Agreements</TableCell>
                  <TableCell align="right">Conversion Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propertyMetrics.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.address}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell align="right">{property.inquiries}</TableCell>
                    <TableCell align="right">{property.viewings}</TableCell>
                    <TableCell align="right">{property.applications}</TableCell>
                    <TableCell align="right">
                      {property.leaseAgreements}
                    </TableCell>
                    <TableCell align="right">
                      {property.conversionRate}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
