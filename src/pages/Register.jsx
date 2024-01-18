import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
      <div className='flex mx-auto h-full'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
