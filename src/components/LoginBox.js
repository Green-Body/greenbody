import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LoginBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            userid: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        console.log(this.state.userid, this.state.password);
    }

    render(){
        return (
            <div className="loginBox">
                <p className="form_tit">Login</p>
                <form className="inputLogin" action="/api/login" method="POST">
                    <input 
                        className="formLogin input" 
                        type="text"
                        placeholder="ID"
                        name="userid"
                        value={this.state.userid}
                        onChange={this.handleInput}
                    />
                    <input 
                        className="formLogin input" 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInput}
                    />
                    <input 
                        className="formLogin submit" 
                        type="submit" 
                        value="LogIn"
                        onSubmit={this.handleSubmit}
                    />
                </form>
                <div className="loginLine"></div>
                <p className="account">
                    Don't you have an account? <Link to="/join"><strong>Sign Up</strong></Link>
                </p>
            </div>
        )
    }    
}

export default LoginBox;