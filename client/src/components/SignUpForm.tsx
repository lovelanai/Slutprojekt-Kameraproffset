import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { hideSignUpForm, createUser } = useUser();

  const navigate = useNavigate();

  const SignUpHandler = async (e: any) => {
    e.preventDefault();
    hideSignUpForm();
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    createUser(email, password);
    navigate('/');
  };

  return (
    <div className="cart-container" style={{ minHeight: 'calc(100vh - 9rem)' }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="on"
      >
        <div className="form-container">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: '1rem 0' }}>Skapa konto</h1>
            <TextField
              style={{ margin: '1rem 0' }}
              className="box-1-input"
              type="email"
              name="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <TextField
              style={{ margin: '1rem 0' }}
              name="password"
              label="Lösenord"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ width: '100%' }}
          onClick={signUp}
        >
          Skapa konto
        </Button>
        <button onClick={SignUpHandler}>
          <p>Har du redan ett konto? Logga in här.</p>
        </button>
      </Box>
    </div>
  );
}

export default SignUpForm;