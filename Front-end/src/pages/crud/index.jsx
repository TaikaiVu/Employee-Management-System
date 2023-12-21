import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useHandleTool = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create/")
  };

  const handleView = (id) => {
    navigate(`/detail/${id}`)
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/emp/employees?eid=${id}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return { handleCreate, handleView, handleEdit, handleDelete, handleLogout };
};

function Create() {
  const { handleCreate } = useHandleTool();

  return (
    <GridToolbarContainer>
      <Button color="primary" variant="contained" onClick={() => handleCreate()} >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function List() {
  const { handleView, handleEdit, handleDelete, handleLogout } = useHandleTool();

  const columns = [
    { field: 'firstname', headerName: 'First Name', width: 140, editable: true },
    { field: 'lastname', headerName: 'Last Name', width: 140, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'gender', headerName: 'Gender', width: 120, editable: true },
    { field: 'salary', headerName: 'Salary', type: 'number', width: 130, editable: true },
    {
      field: 'action',
      headerName: 'Action',
      width: 270,
      renderCell: (params) => (
        <div>
          <GridActionsCellItem
            icon={<Button variant="contained" color="warning">View</Button>}
            label="View"
            onClick={() => handleView(params.id)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<Button variant="contained" color="success">Edit</Button>}
            label="Edit"
            onClick={() => handleEdit(params.id)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<Button variant="contained" color="error">Delete</Button>}
            label="Delete"
            onClick={() => handleDelete(params.id)}
            color="inherit"
          />
        </div>
      ),
    },
  ];

  const [rows, setRows] = useState('');

  React.useEffect(() => {
    axios.get('https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/emp/employees')
      .then(response => {
        const data = response.data.emp;
        const formattedData = data.map(employee => ({
          id: employee._id,
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          gender: employee.gender,
          salary: employee.salary,
        }));
        setRows(formattedData);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []); 

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Button
        type="button"
        variant="contained"
        color="info"
        onClick={handleLogout}
        style={{ marginBottom: '10px', width: '100px' }}
      >
        Logout
      </Button>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Employee List
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: Create,
          }}
        />
      </Box>
    </Box>
  );
}
