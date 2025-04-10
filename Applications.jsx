import React, { useState } from 'react';
import { Box, Container, Tabs, Tab } from '@mui/material';
import RentalForm from './RentalForm';
import SalesForm from './SalesForm';

const Applications = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', py: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Rental Application" />
            <Tab label="Sales Application" />
          </Tabs>
        </Box>
        
        {activeTab === 0 ? <RentalForm /> : <SalesForm />}
      </Box>
    </Container>
  );
};

export default Applications;