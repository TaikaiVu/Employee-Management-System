import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    salary: '',
  });

  useEffect(() => {
    // Fetch employee data for editing
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/emp/employees/${id}`
        );
        const employeeData = response.data.Employee;
        setFormData({
          firstname: employeeData.firstname,
          lastname: employeeData.lastname,
          email: employeeData.email,
          gender: employeeData.gender,
          salary: String(employeeData.salary), 
        });
      } catch (error) {
        console.error('Error fetching employee data for edit:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate('/view')
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/emp/employees/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/view');
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  return (
    <Box sx={{ width: 400, margin: 'auto', marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        Edit Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2 }}>
          Update 
        </Button>
        <Button type="submit" variant="contained" color="error" sx={{ marginTop: 2 }} onClick={() => handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default Edit;
