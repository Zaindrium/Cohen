import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme configuration inspired by Zillow and Serhant
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a365d', // Deep blue like Serhant
      light: '#2c5282',
      dark: '#102a4c'
    },
    secondary: {
      main: '#718096', // Sophisticated gray
      light: '#a0aec0',
      dark: '#4a5568'
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }
      }
    }
  }
});

function App() {
  const [listingType, setListingType] = useState('rentals'); // 'rentals' or 'sales'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard listingType={listingType} setListingType={setListingType} />} />
            <Route path="/properties" element={<Properties listingType={listingType} />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/marketing" element={<Marketing />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;