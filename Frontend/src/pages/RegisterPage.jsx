import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
