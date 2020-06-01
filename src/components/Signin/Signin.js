import React, { Component } from 'react';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = event => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = event => {
        this.setState({signInPassword: event.target.value});
    }

    onSigninClick = () => {
        fetch('http://localhost:3030/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onStateChange('home');
                }
            })
            .catch(err => alert('User not found. Wrong email and password combination.'));

    }

    render () {
        return (
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <form>
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    required="required"
                                    onChange={this.onEmailChange}
                                />
                            </form>
                        </div>
                        <div className="mv3">
                            <form>
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    required="required"
                                    onChange={this.onPasswordChange}
                                />
                            </form>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" 
                            onClick={this.onSigninClick} 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className='f7'>Don't have an account?</p>
                        <p onClick={() => this.props.onStateChange('register')} className="f6 link dim black d pointer">Sign Up</p>
                    </div>
                </div>
            </main>
        );
    }
}

export default Signin;