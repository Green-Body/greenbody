import React from 'react';
import '../App.css';
import TopLog from '../components/TopLog';
import MyLog from '../components/MyLog';
import Footer from '../components/Footer';

function MyLogPage() {
  return (
    <div>
      <TopLog/>
      <MyLog/>
      <Footer/>
    </div>
  );
}

export default MyLogPage;