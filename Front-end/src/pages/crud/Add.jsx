import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const navigator = useNavigate()

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
        salary: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData.firstname)

        try {
            await axios.post('https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/emp/employees', formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigator('/view');
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    


    return (
        <Box sx={{ width: 400, margin: 'auto', marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
            Add New Employee
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
            Add Employee
            </Button>
        </form>
        </Box>
    );
};

export default Add
