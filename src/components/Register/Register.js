import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    onEmailChange = event => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = event => {
        this.setState({password: event.target.value});
    }

    onNameChange = event => {
        this.setState({name: event.target.value});
    }

    onSignUpClick = () => {
        fetch('https://powerful-beach-15259.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.email) {
                    this.props.loadUser(user);
                    this.props.onStateChange('home');
                } else {
                    alert('Unable to sign up.');
                }
            })
            .catch(err => alert('Unable to sing up'));
    }

    render() {
        return (
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <form>
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    onChange={this.onNameChange}
                                    required
                                />
                            </form>
                        </div>
                        <div className="mt3">
                            <form>
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                    required
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
                                    onChange={this.onPasswordChange}
                                    required
                                />
                            </form>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSignUpClick} 
                            className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign up" 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className='f7'>Already have an account?</p>
                        <p onClick={() => this.props.onStateChange('signin')} className="f6 link dim black d pointer">Sign In</p>
                    </div>
                </div>
            </main>
        );
    }
}

export default Register;