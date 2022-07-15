import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { IconButton, InputAdornment, Link } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { loginRequest } from '../utils/apicomm';
import EnterForm from './enterform';

const defaultFormState = {
  email: {
    error: false,
    helpertext: '',
  },
  password: {
    error: false,
    helpertext: false,
  },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);
  const changeHandler = (key) => {
    setFormState((prev) => {
      const newstate = {
        ...prev,
      };
      newstate[key].error = false;
      newstate[key].helpertext = '';
      return newstate;
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginRequest(data)
      .then(() => {
        navigate('/');
      })
      .catch((errors) => {
        Object.keys(errors).forEach((key) => {
          setFormState((oldState) => {
            const newState = {
              ...oldState,
            };
            newState[key].error = true;
            newState[key].helpertext = errors[key].message;
            return newState;
          });
        });
      });
  };

  return (
    <EnterForm
      handleSubmit={handleSubmit}
      pagename={'Log In'}
      buttonname={'Log In'}
      footlinks={
        <Grid container>
          <Grid item xs>
            <Link variant="body2" component={RouterLink} to="/forgot-password">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" component={RouterLink} to="/sign-up">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      }
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={() => {
          changeHandler('email');
          changeHandler('password');
        }}
        error={formState.email.error}
        helperText={formState.email.helpertext}
        variant="filled"
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        id="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        onChange={() => {
          changeHandler('email');
          changeHandler('password');
        }}
        error={formState.password.error}
        helperText={formState.password.helpertext}
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </EnterForm>
  );
};

export default Login;
