import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import  {useState}from 'react'



const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate()

  const [message, setMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const signInData = new FormData(event.currentTarget);
    
    axios.post('https://employee-manage-81b7455eae3f.herokuapp.com/api/v1/user/login',signInData,{
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      navigate("/view")
    }).catch(err => {
      console.log(err)
      setMessage('Invalid user information, please try again');

    })
    
  };




  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link to={'/'}>
                <Button color="primary">Home</Button>
              </Link>
            </Grid>
          </Grid>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {message && ( <p style={{ color: 'red' }}>{message}</p> )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/signup"}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
