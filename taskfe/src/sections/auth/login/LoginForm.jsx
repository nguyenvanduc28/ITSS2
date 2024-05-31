import { useContext, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import account from '../../../data/account';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../services/auth/login';
import { AuthContext } from '../../../context/AuthContext';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { handleLoggedin } = useContext(AuthContext);
  const navigate = useNavigate();
  const username = useRef(null);
  const password = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (validateEmail(username.current.value)) {
      const payload = {
        email: username.current.value,
        password: password.current.value
      }

      login(payload)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.userInfoDto;
          handleLoggedin(token, user);
          navigate('/dashboard')
        })
        .catch((err) => {
          toast.error('Check your account again');
        })
    } else {
      toast.error('Check your email again');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField inputRef={username} name="email" label="Email" />

        <TextField
          inputRef={password}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Grid>
          <Checkbox name="remember" label="Remember me" />
          Remember password
        </Grid>
        <Link to="/forgot-password" variant="subtitle2" underline="hover">
          Forgot password
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <ToastContainer />
    </>
  );
}
