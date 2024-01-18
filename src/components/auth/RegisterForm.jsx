import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { changeStatus, registerUser } from '../../features/userSlice';
import countryCodes from '../../constants/countryCodes';
import Cookies from 'universal-cookie';
import Picture from './Picture';
import axios from 'axios';

const RegisterForm = () => {
  const { status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  console.log('Error', errors);

  const onSubmit = async (data) => {
    console.log('Data', data);

    let res;
    dispatch(changeStatus('loading'));
    if (picture) {
      const imageData = await uploadImage();
      res = await dispatch(registerUser({ ...data, picture: imageData.secure_url }));
    } else {
      res = await dispatch(registerUser(data));
    }

    if (res.payload?.success) {
      const cookies = new Cookies();
      cookies.set('accessToken', res.payload.token.access);
      cookies.set('refreshToken', res.payload.token.refresh);
      navigator('/', { replace: true });
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('upload_preset', 't9w9gg71');
    formData.append('file', picture);
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/raizo/image/upload',
      formData
    );

    return data;
  };

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full space-y-8 p-8 dark:bg-dark_bg_2 rounded-xl max-w-7xl'>
        <div className='text-center dark:text-dark_text_1'>
          <h2 className='text-3xl font-bold'>Create Account</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <AuthInput
              name='firstName'
              label='First name'
              type='text'
              placeholder='Type your first name.'
              register={register}
              error={errors.firstName?.message}
            />
            <AuthInput
              name='lastName'
              label='Last name'
              type='text'
              placeholder='Type your last name.'
              register={register}
              error={errors.lastName?.message}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='mt-3'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='country-code'
              >
                Select your country
              </label>
              <select
                className='border-current border-dark-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark_bg_3'
                name='countryCode'
                {...register('countryCode')}
              >
                <option value=''>Select</option>
                {countryCodes.map((country) => (
                  <option
                    key={country.code}
                    value={country.dial_code}
                  >{`${country.emoji} (${country.dial_code}) ${country.name}`}</option>
                ))}
              </select>
              {errors.countryCode && <p className='text-red-400'>{errors.countryCode.message}</p>}
            </div>

            <AuthInput
              name='phoneNumber'
              label='Phone number'
              type='number'
              placeholder='Type your phone number.'
              register={register}
              error={errors.phoneNumber?.message}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <AuthInput
              name='email'
              label='Email'
              type='text'
              placeholder='Type your email address.'
              register={register}
              error={errors.email?.message}
            />
            <AuthInput
              name='status'
              label='Status'
              type='text'
              placeholder='Type your status.'
              register={register}
              error={errors.status?.message}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <AuthInput
              name='password'
              label='Password'
              type='password'
              placeholder='Type your password.'
              register={register}
              error={errors.password?.message}
            />
            <AuthInput
              name='confirmPassword'
              label='Confirm password'
              type='password'
              placeholder='Confirm your password.'
              register={register}
              error={errors.password?.message}
            />
          </div>

          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          />

          <button
            type='submit'
            className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
          '
          >
            {status === 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign up'}
          </button>
          <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
            <span>have an account ?</span>
            <Link
              to='/login'
              className=' hover:underline cursor-pointer transition ease-in duration-300'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
