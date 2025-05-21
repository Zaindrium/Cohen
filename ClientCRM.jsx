import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Person,
  Add,
  Edit,
  Delete,
  Phone,
  Email,
  Home,
} from '@mui/icons-material';

const ClientCRM = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      status: 'potential',
      interests: ['2-bedroom', 'downtown'],
      viewingHistory: [
        {
          property: '123 Main St, Apt 4B',
          date: '2024-01-15',
          notes: 'Liked the layout, concerned about price',
        },
      ],
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '(555) 987-6543',
      status: 'active',
      interests: ['house', 'suburban'],
      viewingHistory: [
        {
          property: '456 Oak Ave',
          date: '2024-01-14',
          notes: 'Very interested, discussing offer',
        },
      ],
    },
  ]);

  const [openNewClient, setOpenNewClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddClient = () => {
    // Implement add client logic
    setOpenNewClient(false);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setOpenNewClient(true);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
          Client Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenNewClient(true)}
        >
          Add Client
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="All Clients" />
                <Tab label="Potential" />
                <Tab label="Active" />
                <Tab label="Past" />
              </Tabs>
            </Box>

            <CardContent>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />

              <List>
                {filteredClients.map((client) => (
                  <ListItem
                    key={client.id}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography variant="subtitle1">
                            {client.name}
                          </Typography>
                          <Chip
                            size="small"
                            label={client.status}
                            color="primary"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Email fontSize="small" />
                            {client.email}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Phone fontSize="small" />
                            {client.phone}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mt: 1,
                            }}
                          >
                            <Home fontSize="small" />
                            Last Viewing: {client.viewingHistory[0]?.property}
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditClient(client)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClient(client.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openNewClient} onClose={() => setOpenNewClient(false)}>
        <DialogTitle>
          {selectedClient ? 'Edit Client' : 'Add New Client'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                defaultValue={selectedClient?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={selectedClient?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={selectedClient?.phone}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewClient(false)}>Cancel</Button>
          <Button onClick={handleAddClient} variant="contained">
            {selectedClient ? 'Save Changes' : 'Add Client'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientCRM;
