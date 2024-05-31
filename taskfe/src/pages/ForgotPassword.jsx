import styled from '@emotion/styled';
// @mui
import { MuiOtpInput } from 'mui-one-time-password-input'
import React, { useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// @hooks
import useResponsive from '../hooks/useResponsive';
import { changePass, sendEmail, sendOtp } from '../services/passwordService';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledReSend = styled('span')`
    color: #551a8b;
    text-decoration: underline;
    margin-left: 8px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`
const ForgotPassword = () => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const stackRef1 = useRef(null);
    // const stackRef2 = useRef(null);
    // const stackRef3 = useRef(null);
    const [activeStack, setActiveStack] = useState(1); // Ban đầu hiển thị Stack 1
    const [showToast, setShowToast] = useState(false);
    // const [showStack1, setShowStack1] = useState(true);
    // const [showStack2, setShowStack2] = useState(false);
    // const [showStack3, setShowStack3] = useState(false);
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [vpass, setVPass] = useState('');

    const mdUp = useResponsive('up', 'md');
    const handleSendMail = async () => {
        try {
            setLoading(true);
            const res = await sendEmail({ email: email })
            console.log(res);
            if (res.responseCode === 200) {
                setLoading(false);
                toast.success("An otp has been sent to your email")
                handleClick()
            }
            else toast.error("Error");

        } catch (error) {
            toast.error("Error");
        }
    }
    const handleSendOtp = async () => {
        try {
            setLoading(true);
            const data = {
                email: email,
                otp: otp
            }
            const res = await sendOtp(data)

            if (res.responseCode === 200) {
                setLoading(false);
                toast.success("OTP confirmed")
                handleClick()
            }
            else toast.error("Error");

        } catch (error) {
            toast.error("Error");
        }
    }

    const handleChangePass = async () => {
        setLoading(true);
        const data = {
            email: email,
            password: pass,
            verifyPassword: vpass
        }
        try {
            const res = await changePass(data)
            if (res.responseCode === 200) {
                setLoading(false);
                toast("Success")
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
            else toast.error("Error");
        } catch (error) {
            toast.error("Error");
        }
    }
    const handleClick = () => {
        if (activeStack === 3) {
            // navigate('/login', { state: { showToast: true, message: 'Updated password' } });
            navigate('/login');
        } else {
            setActiveStack((prevStack) => {
                const nextStack = prevStack === 3 ? 1 : prevStack + 1;
                return nextStack;
            });
        }
    };

    const handleChange = (newValue) => {
        setOtp(newValue)
    }

    return (
        <div style={{ display: 'flex' }}>
            {mdUp && (
                <StyledSection>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Hi, Welcome Back
                    </Typography>
                    <img src="/assets/illustrations/illustration_login.png" alt="login" />
                </StyledSection>
            )}
            <Container maxWidth="sm" style={{ display: 'flex' }}>
                <Stack spacing={3} style={{ margin: 'auto', display: activeStack === 1 ? 'flex' : 'none' }}>
                    <h2>Forgot password?</h2>
                    <span>
                        Don't worry when this happens. Please enter your email. We will send the OTP code to this email.
                    </span>
                    <TextField id="Email" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link to="/login" >Go to Login page</Link>
                    </div>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSendMail}>
                        {isLoading ? <CircularProgress style={{border:'none'}} color="inherit" /> : 'Next'}
                    </LoadingButton>
                </Stack>

                <Stack spacing={3} style={{ margin: 'auto', display: activeStack === 2 ? 'flex' : 'none' }}>
                    <h2>Verify OTP</h2>
                    <div>Enter the code we sent to {email}</div>
                    <MuiOtpInput length={6} value={otp} onChange={handleChange} />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" value={otp} onChange={(event) => setOtp(event.target.value)} onClick={handleSendOtp}>
                        {isLoading ? <CircularProgress style={{border:'none'}} color="inherit" /> : 'Next'}
                    </LoadingButton>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>Didn't receive the code?<StyledReSend onClick={handleSendMail}>Resend</StyledReSend></div>
                </Stack>

                <Stack spacing={3} style={{ margin: 'auto', display: activeStack === 3 ? 'flex' : 'none' }}>
                    <h2>New password</h2>
                    <span>Your password must be from 8 to 16 characters long, must contain at least 1 uppercase character, 1 lowercase character, 1 numeric character and 1 special character</span>
                    <TextField id="password" label="Mật khẩu mới" variant="outlined" value={pass} onChange={(event) => setPass(event.target.value)} />
                    <TextField id="confirm-password" label="Xác nhận mật khẩu " variant="outlined" value={vpass} onChange={(event) => setVPass(event.target.value)} />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleChangePass}>
                        {isLoading ? <CircularProgress style={{border:'none'}} color="inherit" /> : 'Submit'}
                    </LoadingButton>
                </Stack>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
