import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState} from 'react';
import { Link } from 'react-router-dom';


export default function SignIn() {
  const [loginType, setLoginType] = React.useState('admin');
  const [ id, setId ] = useState();
  const handleChange = (e) => {
    setId(e.target.value)
  }
  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              label="ID"
              autoFocus
            />
            <Link to={'/' + loginType} state={{"id" : id}}>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            </Link>
          </Box>
          <Box>
          <ToggleButtonGroup>
            <ToggleButton selected={loginType === "admin"} onClick={() => setLoginType('admin')}>Admin</ToggleButton>
            <ToggleButton selected={loginType === "trainer"} onClick={() => setLoginType('trainer')}>Trainer</ToggleButton>
            <ToggleButton selected={loginType === "client"} onClick={() => setLoginType('client')}>Client</ToggleButton>
          </ToggleButtonGroup>
          </Box>
        </Box>
      </Container>
  );
}