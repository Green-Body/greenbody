import React from 'react';
import '../App.css';
import Header from '../components/Header';
import LoginBox from '../components/LoginBox';

function LoginPage() {
  return (
    <div className="firstPage">
      <Header/>
      <LoginBox/>
    </div>
  );
}

export default LoginPage;