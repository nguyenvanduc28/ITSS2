import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from '../../services/updateProfile';
import { ToastContainer, toast } from 'react-toastify';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true); // Khi email đã được xác minh
  const [userInfo, setUserInfo] = useState({});
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // Handle avatar change logic here
    console.log('Change avatar clicked');
  };
  const handleChangeValue = (key, value) => {
    const newUser = {
      ...userInfo, [key]: value
    }
    setUserInfo(newUser);
  }
  const { user, token, handleLoggedin } = useContext(AuthContext);
  useEffect(() => {
    setUserInfo(user);
  }, [])
  const handleSaveChangesClick = () => {
    try {
      updateProfile(userInfo, token)
        .then((res) => {
          if (res.responseCode === 200) {
            toast.success('Đã cập nhật user');
            handleLoggedin(token, res.data)
          }
          else toast.error("Lỗi cập nhật user");
        })
    } catch (error) {
      toast.error("Lỗi cập nhật user");
    }
    setIsEditing(false);
  };
  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Profile
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            src="/assets/images/avatars/avatar_default.jpg"
            alt="Default Avatar"
            sx={{ width: 80, height: 80, mr: 4 }}
          />
          <Box>
            <Typography variant="h5">
              {isEditing ? (
                <TextField
                  variant="standard"
                  label="Name"
                  value={userInfo.fullName}
                  onChange={(event) => handleChangeValue('fullName', event.target.value)}
                />
              ) : (
                userInfo.fullName
              )}

            </Typography>
            {isEditing && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<PhotoCameraIcon />}
                onClick={handleAvatarChange}
              >
                Change Avatar
              </Button>
            )}
          </Box>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" mb={2}>
          About Me
        </Typography>

        <TextField
          label="Email"
          variant="standard"
          value={userInfo.email}
          onChange={(event) => handleChangeValue('email', email.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isEmailVerified ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CheckCircleIcon color="disabled" />
                )}
                <Typography variant="body2" color={isEmailVerified ? 'primary' : 'textSecondary'}>
                  {isEmailVerified ? 'Verified' : 'Not Verified'}
                </Typography>
              </InputAdornment>
            ),
          }}
          disabled={true}

        />
        <TextField
          label="Address"
          variant="standard"
          value={userInfo.address}
          onChange={(event) => handleChangeValue('address', event.target.value)}
          fullWidth
          disabled={!isEditing}

        />
        <FormControl variant="standard" fullWidth disabled={!isEditing}>
          <InputLabel id="state-label">Gender</InputLabel>
          <Select
            labelId="state-label"
            id="gender"
            value={userInfo.gender}
            onChange={(event) => handleChangeValue('gender', event.target.value)}
            defaultValue={userInfo.gender}
          >
            <MenuItem key={1} value="MALE">MALE</MenuItem>
            <MenuItem key={2} value="FEMALE">FEMALE</MenuItem>
            <MenuItem key={3} value="OTHER">OTHER</MenuItem>
          </Select>
        </FormControl>
        {isEditing ? (
          <Box mt={4}>
            <Button variant="contained" onClick={handleSaveChangesClick} sx={{ mr: 2 }}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={handleCancelClick} startIcon={<CancelIcon />}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Button variant="contained" onClick={handleEditClick} sx={{ mt: 4 }}>
            Edit Profile
          </Button>
        )}
      </Paper>
      <ToastContainer/>
    </Box>
  );
}