import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../img/logo.png';

function TopPage(props) {
    return (
        <div className="top">
            <Link to='/myPage' className="title"><img src={logo} alt="Green Body" class="img_base"/></Link>
            <div className="menu_wrap">
                <Link to='/myPage' className="menu menuOn" id="myPage">MyPage</Link>
                <Link to='/myLog' className="menu" id="MyLog">MyLog</Link>
                <Link to='/community' className="menu" id="Community">Community</Link>
                <a href='/api/logout' className="menu" id="Logout">Logout</a>
            </div>
        </div>
    )
}

export default TopPage;