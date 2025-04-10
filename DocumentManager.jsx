import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Description,
  Folder,
  Upload,
  Delete,
  Download,
  Add
} from '@mui/icons-material';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Lease Agreement - 123 Main St',
      type: 'lease',
      uploadDate: '2024-01-15',
      size: '2.5 MB'
    },
    {
      id: 2,
      name: 'Sales Contract - 456 Oak Ave',
      type: 'contract',
      uploadDate: '2024-01-14',
      size: '1.8 MB'
    }
  ]);

  const [openUpload, setOpenUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', name: 'All Documents', icon: <Description /> },
    { id: 'lease', name: 'Lease Agreements', icon: <Description /> },
    { id: 'contract', name: 'Sales Contracts', icon: <Description /> },
    { id: 'property', name: 'Property Documents', icon: <Folder /> }
  ];

  const handleUpload = () => {
    // Implement document upload logic here
    setOpenUpload(false);
  };

  const handleDelete = (documentId) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };

  const filteredDocuments = documents.filter(doc =>
    (selectedFolder === 'all' || doc.type === selectedFolder) &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
          Document Manager
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <List>
                  {folders.map((folder) => (
                    <ListItem
                      button
                      key={folder.id}
                      selected={selectedFolder === folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                    >
                      <ListItemIcon>{folder.icon}</ListItemIcon>
                      <ListItemText primary={folder.name} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenUpload(true)}
              >
                Upload
              </Button>
            </Box>

            <Card>
              <List>
                {filteredDocuments.map((doc) => (
                  <ListItem key={doc.id}>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={`Uploaded: ${doc.uploadDate} | Size: ${doc.size}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => {/* Implement download */}}>
                        <Download />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(doc.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openUpload} onClose={() => setOpenUpload(false)}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload />}
              fullWidth
            >
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpload(false)}>Cancel</Button>
          <Button onClick={handleUpload} variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DocumentManager;