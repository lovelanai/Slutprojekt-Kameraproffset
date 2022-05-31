import { createTheme, Stack, ThemeProvider, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import './css/AdminPage.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      contrastText: '#FBF7F5', //button text white instead of black
    },
    background: {
      default: '#333333',
    },

    secondary: {
      main: '#DA344D',
    },
  },
});

function AdminPage() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          background: '#ffffff',
          position: 'fixed',
          width: '100%',
          zIndex: '3',
        }}
      >
        <Stack direction="row" spacing={3} sx={{ padding: '1rem' }}>
          <Typography>ADMINISTRATION</Typography>
          <Link to="products">PRODUKTER</Link>
          <Link to="orders">ORDRAR</Link>
        </Stack>
      </div>
      <div className="admin-top-container">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default AdminPage;
