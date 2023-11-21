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

const Edit_page = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [ofhr, setOfhr] = useState('');

  useEffect(() => {
    // Set initial state values when component mounts
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setEmail(userDetails.email);
    setCourse(userDetails.coursesAssigned);
    setOfhr(userDetails.officeHours);
  }, [userDetails]);

  const handleupdate = () => {
    dispatch(
      updateUserDetails({
        firstName: firstName,
        lastName: lastName,
        email: email,
        officeHours: ofhr,
        coursesAssigned: course,
      })
    );
  };

  let role = useSelector((state) => state.user.userDetails.role);

  const officeHourOptions = [userDetails.officeHours];

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
          officeHoursStart: userDetails.officeHours,
          officeHoursEnd: userDetails.officeHours,
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
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
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
                  setFirstName(e.target.value);
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
                  setLastName(e.target.value);
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

            {/* Email Field */}
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Change Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleChange(e);
                }}
                label="Change Email"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
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
                    setCourse(e.target.value);
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
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <FormControl fullWidth error={Boolean(touched.officeHoursStart && errors.officeHoursStart)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-officeHoursStart-login">Change Office Hours (From)</InputLabel>
                    <Select
                      id="outlined-adornment-officeHoursStart-login"
                      value={values.officeHoursStart}
                      name="officeHoursStart"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Change Office Hours (From)"
                    >
                      <MenuItem value="">Select...</MenuItem>
                      {officeHourOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.officeHoursStart && errors.officeHoursStart && (
                      <FormHelperText error id="standard-weight-helper-text-officeHoursStart-login">
                        {errors.officeHoursStart}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center', mt: '26px' }}>
                  <Typography variant="body1" fontSize="1.6rem">
                    TO
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <FormControl fullWidth error={Boolean(touched.officeHoursEnd && errors.officeHoursEnd)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-officeHoursEnd-login">Change Office Hours (To)</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-officeHoursEnd-login"
                      type="text"
                      value={values.officeHoursEnd}
                      name="officeHoursEnd"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setOfhr(e.target.value);
                        handleChange(e);
                      }}
                      label="Change Office Hours (To)"
                      inputProps={{}}
                    />
                    {touched.officeHoursEnd && errors.officeHoursEnd && (
                      <FormHelperText error id="standard-weight-helper-text-officeHoursEnd-login">
                        {errors.officeHoursEnd}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            ) : null}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  onClick={handleupdate}
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
      </Formik>
    </>
  );
};

export default Edit_page;
