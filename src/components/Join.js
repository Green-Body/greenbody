import React, { Component } from 'react';

function Join(props) {
    return (
        <div className="join">
            <div className="joinBox">
                <p className="form_tit">Join</p>
                <form className="inputLogin" action="/api/signup" method="POST">
                    <input className="formLogin input" type="text" name="userid" placeholder="Enter ID"/>
                    <input className="formLogin input" type="text" name="nickname" placeholder="Enter NickName"/>
                    <input className="formLogin input" type="text" name="password" placeholder="Enter Password"/>
                    <input className="formLogin input" type="text" placeholder="Confirm Password"/>
                    <input className="formLogin submit" type="submit" value="Sign up"/>
                </form>
            </div>
        </div>
    )
}

export default Join;