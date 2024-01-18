import * as yup from 'yup';

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('Please provide your first name.')
    .matches(/^[a-zA-Z_ ]*$/, 'No special characters are allowed.')
    .min(2, 'The first name should not be less than 2 characters.')
    .max(16, 'The first name should not be more than 16 characters.'),

  lastName: yup
    .string()
    .required('Please provide your last name.')
    .matches(/^[a-zA-Z_ ]*$/, 'No special characters are allowed.')
    .min(2, 'The last name should not be less than 2 characters.')
    .max(16, 'The last name should not be more than 16 characters.'),

  countryCode: yup
    .string()
    .required('Please select your country')
    .test('not-empty', 'Country code should not be empty', (value) => value.trim() !== ''),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required.'),

  email: yup.string().required('An email address is required.').email('Invalid email address.'),
  status: yup.string().max(64, 'Status must be less than 64 characters.'),
  password: yup
    .string()
    .required('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.'
    ),
});

export const signInSchema = yup.object({
  email: yup.string().required('Email address is required.').email('Invalid email address.'),
  password: yup.string().required('Password is required.'),
});
