import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007C8F', // Zillow blue
    },
    secondary: {
      main: '#F5F5F5', // Soft gray
    },
    background: {
      default: '#FFFFFF', // Crisp white
    },
    text: {
      primary: '#003B4D', // Dark blue
      secondary: '#5A5A5A',
    },
    available: {
      main: '#00A676', // Green
    },
    underContract: {
      main: '#FF6B6B', // Red
    },
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#003B4D',
    },
        h2: {

      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#003B4D',
    },
    body1: {
      fontFamily: 'Open Sans',
      color: '#5A5A5A',
    },
    body2: {
      fontFamily: 'Open Sans',
      color: '#5A5A5A',
    },
  },
});

export default theme;