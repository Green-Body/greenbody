import React, { Component } from 'react';
import login_logo from '../img/login_logo.png';

function Header(props) {
    return (
        <div className="header">
            <h1><img src={login_logo} alt="" class="img_base"/></h1>
            <p>Green body와 함께 건강한<br/>생활을 해보세요</p>
        </div>
    )
}

export default Header;