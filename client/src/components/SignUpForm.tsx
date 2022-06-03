import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { useError } from '../contexts/ErrorContext';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { hideSignUpForm, createUser } = useUser();

  const error = useError();

  const navigate = useNavigate();

  const SignUpHandler = async (e: any) => {
    e.preventDefault();
    hideSignUpForm();
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    createUser(email, password)
      .then((result: Response) => {
        if (result.ok) {
          navigate('/');
        } else {
          return result.json();
        }
      })
      .then((err) => {
        error?.setErrorTitle('Kunde inte skapa användare');
        error?.setErrorMessage(err.error);
        error?.handleOpen();
      });
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{ margin: '1rem 0' }}>Skapa konto</h1>
            <TextField
              style={{ margin: '1rem 0' }}
              className="box-1-input"
              type="email"
              name="email"
              label="Email"
              error={email.length > 0 && !/^.+\@\S+\.\S+$/.test(email)}
              helperText={
                email.length > 0 && !/^.+\@\S+\.\S+$/.test(email)
                  ? 'Du måste ange en giltig epostadress'
                  : null
              }
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
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ width: '100%', background: '#333333', marginBottom: '1rem' }}
            onClick={signUp}
          >
            Skapa konto
          </Button>
        </div>

        <button
          onClick={SignUpHandler}
          style={{ background: 'none', border: 'none', paddingTop: '1rem' }}
        >
          <p>Har du inget konto? Registrera dig här.</p>
        </button>
      </Box>
    </div>
  );
}

export default SignUpForm;
