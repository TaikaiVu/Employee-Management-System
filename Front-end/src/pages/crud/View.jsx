import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const View = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/emp/employees/${id}`);
        setEmployee(response.data.Employee);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setEmployee(null);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        View Employee Detail
      </Typography>
      <Box
        sx={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
          textAlign: 'left', 
        }}
      >
    
        <Typography variant="body1">First name: {employee?.firstname}</Typography>
        <Typography variant="body1">Last name: {employee?.lastname}</Typography>
        <Typography variant="body1">Email: {employee?.email}</Typography>
         
      </Box>
    </Box>
  );
};

export default View;
