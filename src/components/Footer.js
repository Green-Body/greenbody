import React, { Component } from 'react';
import logo_w from '../img/logo.png';

function Footer(props) {
    return (
        <div className="footer">
            <p className="footer_member">
                #mosquito1717 안나겸 <br/>
                #david02324 장다윗 <br/>
                #Eunjung0516 조은정 <br/>
            </p>
            <p className="footer_copy">
                2021 Green Body. All rights reserved.
            </p>
            <p className="footer_logo">
                <img src={logo_w} alt="Green Body" class="img_base"/>
            </p>
        </div>
    )
}

export default Footer;