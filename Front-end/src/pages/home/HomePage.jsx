import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@mui/material';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '100px',
};

const buttonStyle = {
  marginBottom: '20px',
};

const HomePage = () => {
  return (
    <Container component="main" maxWidth="xs" style={containerStyle}>
      <Button to="/login" component={Link} variant="contained" color="primary" style={buttonStyle}>
        Sign In
      </Button>
      <Button to="/signup" component={Link} variant="contained" color="primary" style={buttonStyle}>
        Sign Up
      </Button>
    </Container>
  );};





export default HomePage;

