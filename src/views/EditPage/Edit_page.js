// YourComponent.js
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { updateUserDetails } from 'store/actions';
import httpService, { endpoints } from 'utils/httpService';

const Edit_page = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const role = userDetails.role;

  const [ofhr, setOfhr] = useState({
    day: "",
    slot: ""
  });

  return (
    <>
      <Typography variant="h4" mb={4} color="black" textAlign="center" sx={{ fontSize: '2.5rem' }}>
        Edit Your Profile
      </Typography>
      <Formik
        initialValues={{
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          department: userDetails.department,
          course: userDetails.coursesAssigned,
          officeHours: userDetails.officeHours,
          submit: null,
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          // ... (validation schema)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // Your submission logic goes here
            setStatus({ success: true });
            setSubmitting(false);
            const res = await httpService({
              base: endpoints.auth.base,
              endpoint: endpoints.auth.updateProfile,
              reqBody: values,
              successNotif: true
            })
            if (res) { }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {/* First Name Field */}
            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-firstName-login">Change First Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-firstName-login"
                type="text"
                value={values.firstName}
                name="firstName"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
                label="Change First Name"
                inputProps={{}}
              />
              {touched.firstName && errors.firstName && (
                <FormHelperText error id="standard-weight-helper-text-firstName-login">
                  {errors.firstName}
                </FormHelperText>
              )}
            </FormControl>

            {/* Last Name Field */}
            <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-lastName-login">Change Last Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-lastName-login"
                type="text"
                value={values.lastName}
                name="lastName"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
                label="Change Last Name"
                inputProps={{}}
              />
              {touched.lastName && errors.lastName && (
                <FormHelperText error id="standard-weight-helper-text-lastName-login">
                  {errors.lastName}
                </FormHelperText>
              )}
            </FormControl>

            {/* New Field for Change Course */}
            {role === 'Professor' || role === 'TA' ? (
              <FormControl fullWidth error={Boolean(touched.course && errors.course)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-course">Change Course</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-course"
                  type="text"
                  value={values.course}
                  name="course"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="Change Course"
                  inputProps={{}}
                />
                {touched.course && errors.course && (
                  <FormHelperText error id="standard-weight-helper-text-course">
                    {errors.course}
                  </FormHelperText>
                )}
              </FormControl>
            ) : null}

            {/* Office Hours Field */}
            {role === 'Professor' || role === 'TA' ? (
              <>
                <Select
                  label="Select Day"
                  onChange={(e) => setOfhr(prev => ({ ...prev, day: e.target.value }))}
                  value={ofhr.day}
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(i => (
                    <MenuItem value={i}>{i}</MenuItem>
                  ))}
                </Select>
                <Select
                  label="Select Day"
                  onChange={(e) => setOfhr(prev => ({ ...prev, slot: e.target.value }))}
                  value={ofhr.slot}
                >
                  {["8:30 - 9:45", "10:00 - 11:15", "11:30 - 12:45", "13:00 - 14:15", "14:30 - 15:45", "16:00 - 17:15"].map(i => (
                    <MenuItem value={i}>{i}</MenuItem>
                  ))}
                </Select>
                <Button variant="contained" onClick={() => {
                  if (values.officeHours.filter(i => i.day === ofhr.day && i.slot === ofhr.slot).length === 0) {
                    setFieldValue("officeHours", [...values.officeHours, ofhr])
                    setOfhr({ day: "", slot: "" })
                  }
                }}>Add</Button>
                <ul>
                  {values.officeHours.map(i => (
                    <li>{i.day} | {i.slot} <Button onClick={() =>
                      setFieldValue("officeHours", values.officeHours.filter(o => JSON.stringify(o) !== JSON.stringify(i)))
                    }>X</Button></li>
                  ))}
                </ul>
              </>
            ) : null}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Confirm Changes
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik >
    </>
  );
};

export default Edit_page;
