import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Typography } from '@mui/material';

// Değerlendirme Formu 6: Proje ana sayfası.
const HomePage = () => {
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to VetApp
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Your one-stop solution for veterinary management
          </Typography>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/animal">
            Manage Animals
          </Button>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/appointment">
            Manage Appointments
          </Button>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/customer">
            Manage Customers
          </Button>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/doctor">
            Manage Doctors
          </Button>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/report">
            View Reports
          </Button>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/vaccine">
            Manage Vaccines
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
