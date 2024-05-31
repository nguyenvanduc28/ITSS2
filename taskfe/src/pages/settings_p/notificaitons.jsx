
import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
// import { Event, Description, FormatListBulleted, Email } from '@mui/icons-material';
import Iconify from '../../components/iconify';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { createAuthHeader } from '../../utils/createAuthHeader';
import { AuthContext } from '../../context/AuthContext';
import { ColorModeContext } from '../../theme';
export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const { handleChangeMode } = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform password change logic here
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);



    handleSendOtp(currentPassword, newPassword);

    // Reset form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const { token } = useContext(AuthContext);
  const sendEmail = async (oldPassword, newPassword) => {
    const request = axios.create({
      baseURL: 'http://localhost:8080',
    });
    const headers = createAuthHeader(token);
    const data = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }
    try {
      const res = await request.post('auth/change-password', data, {
        headers
      })
      return res.data
    } catch (error) {
      console.log('change-password ' + error)
    }
  }
  const handleSendOtp = async (oldPassword, newPassword) => {
    try {
      const res = await sendEmail(oldPassword, newPassword)

      if (res.responseCode === 200) {
        toast.success("Changed password")
      }
      else toast.error("Error");

    } catch (error) {
      toast.error("Error");
    }
  }
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
        <Tab label="Change Password" />
        <Tab label="Theme" />
      </Tabs>

      {currentTab === 0 && (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      )}

      {currentTab === 1 && (
        <Box>
          <FormControlLabel control={<Switch onChange={(event) => {
            // console.log(event.target.checked);
            // handleChangeMode(event.target.checked)
            colorMode.toggleColorMode();
            
          }}/>} defaultChecked={localStorage.getItem("theme")==='light'} label="Dark mode" />
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
}
