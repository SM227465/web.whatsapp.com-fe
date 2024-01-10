import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
// import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { registerSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { registerUser } from '../../features/userSlice';
import countryCodes from '../../constants/countryCodes';

const RegisterForm = () => {
  const { status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser({ ...data, countryCode: '+91' }));

    if (status === 'succeeded') {
      navigate;
    }
  };

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='max-w-lg main-register space-y-8 p-8 dark:bg-dark_bg_2 rounded-xl'>
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
            <AuthInput
              name='countryCode'
              label='Country code'
              type='number'
              placeholder='Select your country'
              register={register}
              error={errors.phoneNumber?.message}
            />

            <div className='mt-3'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for='country-code'>Select your country</label>
              <select className="border-current border-dark-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark_bg_3" name='country-code'>
                <option value=''>Select</option>
                {countryCodes.map((country) => (
                  <option
                    value={country.dial_code}
                  >{`${country.emoji} (${country.dial_code}) ${country.name}`}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className='grid grid-cols-2 gap-4'>
            <AuthInput
              name='phoneNumber'
              label='Phone number'
              type='number'
              placeholder='Type your phone number.'
              register={register}
              error={errors.phoneNumber?.message}
            />

            <AuthInput
              name='email'
              label='Email'
              type='text'
              placeholder='Type your email address.'
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* <AuthInput
              name='status'
              label='Status'
              type='text'
              placeholder='Type your status.'
              register={register}
              error={errors.status?.message}
            /> */}

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


          <button
            type='submit'
            className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
          '
          >
            Sign Up
            {/* {status === 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign up'} */}
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
