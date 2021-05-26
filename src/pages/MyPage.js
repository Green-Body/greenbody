import React from 'react';
import '../App.css';
import TopPage from '../components/TopPage';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Content from '../components/Content';

function MyPage() {
  return (
    <div>
      <TopPage/>
      <div className="con">
        <Profile/>
        <Content/>
      </div>
      <Footer/>
    </div>
  );
}

export default MyPage;