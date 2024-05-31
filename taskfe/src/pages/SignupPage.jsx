import { useContext, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
// hooks
import { Stack, Container, Typography, Button, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo/Logo';
// @mui
import account from '../data/account';
// components
import Iconify from '../components/iconify/Iconify';
import 'react-toastify/dist/ReactToastify.css';
// sections
import { signup } from '../services/auth/signup';
import { AuthContext } from '../context/AuthContext';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));
const validate = (account) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.username)) {
        toast("Check email")
        return false;
    }
    if (account.password !== account.verifypassword) {
        toast("Check password")
        return false;
    }
    return true;
}

// ----------------------------------------------------------------------

export default function SignupPage() {
    const { handleLoggedin} = useContext(AuthContext);
    const mdUp = useResponsive('up', 'md');
    const navigate = useNavigate();
    const [account2, setAccount] = useState({
        username: "",
        password: "",
        verifypassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        if (validate(account2)) {
            const payload = {
                email: account2.username,
                password: account2.password
            }
            signup(payload)
                .then((res) => {
                    console.log(res);
                    if (res.responseCode === 200) {
                        const token = res.data.token;
                        const user = res.data.userInfoDto;
                        handleLoggedin(token, user);
                        toast.success('Signup thành công');
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 800);
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((err) => {
                    toast.error(err);
                })
        }
        // })
    }

    const handleChange = (key, value) => {
        setAccount({
            ...account2,
            [key]: value
        })
    }
    return (
        <>
            <Helmet>
                <title> Login  </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Signup
                        </Typography>

                        <>
                            <Stack direction="column" spacing={3}>
                                <TextField value={account2.username} onChange={(e) => handleChange("username", e.target.value)} name="email" label="Email" />

                                <TextField
                                    value={account2.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
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

                                <TextField
                                    value={account2.verifypassword}
                                    onChange={(e) => handleChange("verifypassword", e.target.value)}
                                    name="verifypassword"
                                    label="Re-enter the password"
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

                            <LoadingButton style={{ marginTop: "20px", marginBottom: "20px" }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                                Signup
                            </LoadingButton>

                        </>
                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Do you have an account?
                            <Link to={"/login"}>Login</Link>
                        </Typography>
                    </StyledContent>
                </Container>
            </StyledRoot>
            <ToastContainer />
        </>
    );
}
