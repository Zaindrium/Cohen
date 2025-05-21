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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Build,
  Assignment,
  PriorityHigh,
  CheckCircle,
  Schedule,
  Add,
} from '@mui/icons-material';

const Maintenance = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      property: '123 Main St, Apt 4B',
      issue: 'Leaking faucet in master bathroom',
      priority: 'medium',
      status: 'pending',
      dateSubmitted: '2024-01-15',
      assignedTo: 'John Smith',
    },
    {
      id: 2,
      property: '456 Oak Ave, Unit 2',
      issue: 'AC not cooling properly',
      priority: 'high',
      status: 'in-progress',
      dateSubmitted: '2024-01-14',
      assignedTo: 'Mike Johnson',
    },
  ]);

  const [openNewRequest, setOpenNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    property: '',
    issue: '',
    priority: 'medium',
    assignedTo: '',
  });

  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'error',
  };

  const statusIcons = {
    pending: <Schedule color="warning" />,
    'in-progress': <Build color="info" />,
    completed: <CheckCircle color="success" />,
  };

  const handleSubmitRequest = () => {
    const request = {
      ...newRequest,
      id: requests.length + 1,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
    };

    setRequests([...requests, request]);
    setOpenNewRequest(false);
    setNewRequest({
      property: '',
      issue: '',
      priority: 'medium',
      assignedTo: '',
    });
  };

  const handleRequestChange = (event) => {
    const { name, value } = event.target;
    setNewRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          Maintenance Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenNewRequest(true)}
        >
          New Request
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <List>
                {requests.map((request) => (
                  <ListItem
                    key={request.id}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                  >
                    <ListItemIcon>{statusIcons[request.status]}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography variant="subtitle1">
                            {request.property}
                          </Typography>
                          <Chip
                            size="small"
                            label={request.priority}
                            color={priorityColors[request.priority]}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.primary">
                            {request.issue}
                          </Typography>
                          <Typography variant="body2">
                            Submitted: {request.dateSubmitted} | Assigned to:{' '}
                            {request.assignedTo}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openNewRequest} onClose={() => setOpenNewRequest(false)}>
        <DialogTitle>New Maintenance Request</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property"
                name="property"
                value={newRequest.property}
                onChange={handleRequestChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Issue Description"
                name="issue"
                value={newRequest.issue}
                onChange={handleRequestChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={newRequest.priority}
                  onChange={handleRequestChange}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Assign To"
                name="assignedTo"
                value={newRequest.assignedTo}
                onChange={handleRequestChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewRequest(false)}>Cancel</Button>
          <Button onClick={handleSubmitRequest} variant="contained">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Maintenance;
