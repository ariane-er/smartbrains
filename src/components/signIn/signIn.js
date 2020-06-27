import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Alert from "@material-ui/lab/Alert";


//Convert this into smart component to use states

class SignIn extends Component {

    //Create state
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            showWarning: false,
        }
    };

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };

    onSubmitSignIn = () => {

        //fetch to check the sign in
        fetch("http://localhost:3000/signin", {
            //pass an object with parameters
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                //If the server says the email and pw are okay, it says 'success',
                //so we can route the user to 'home'.
                this.props.loadUser(user);
                this.props.onRouteChange("home");
                this.setState({ showWarning: false })
            } else if (user === "Wrong credentials.") {
                this.setState({ showWarning: true })
            }
        })

        
        
    }

    render() {

        const { onRouteChange } = this.props;

        return (
            <div>
            <div className="flex items-center justify-center">
            <Collapse in={this.state.showWarning}>
                <Alert severity="error">Wrong credentials.</Alert>
            </Collapse>
            </div>
            <div className=" flex items-center justify-center" >
            
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center v-mid">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit"  
                            value="Sign in"
                            />
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
                </main>
            </article>
            </div>
            </div>
    
        );
    };

}

export default SignIn;