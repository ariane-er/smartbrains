import React from "react";
import Alert from "@material-ui/lab/Alert";
// import { Collapse } from "reactstrap";
import Collapse from '@material-ui/core/Collapse';

class Register extends React.Component {

//Create state
constructor(props) {
    super(props);
    this.state = {
        registerEmail: "",
        registerPassword: "",
        confirmPassword: "",
        registerName: "",
        passwordNotMatch: false,
        fieldsIncomplete: false,
    }
};

 
closeAlerts = () => {
    this.setState({ 
        passwordNotMatch: false,
        fieldsIncomplete: false,
     })
}

onNameChange = (event) => {
    this.setState({ registerName: event.target.value })
}

onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
};

onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
};

onConfirmPasswordChange = (event) => {
    this.setState({confirmPassword: event.target.value})
};

onSubmitRegister = () => {

    this.closeAlerts();
    //Confirm passwords
    if (this.state.registerPassword === this.state.confirmPassword) {

        //now, confirm all fields have been filled
        if (this.state.registerPassword!==""
        && this.state.confirmPassword !== ""
        && this.state.registerEmail !== ""
        && this.state.registerName !== "" ) {

            //fetch to check the sign in
            fetch("http://localhost:3000/register", {
                //pass an object with parameters
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: this.state.registerEmail,
                    password: this.state.registerPassword,
                    name: this.state.registerName,
                })
            })
            .then(response => response.json())
            .then(user => { //the response data from the back-end is the new user
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange("home");
                }
            })

        } else {
            this.setState({fieldsIncomplete: true});
        }
    } else {
        this.setState({passwordNotMatch: true});
    }    

    
}

render() {

    //Get the props inside render.
    const { onRouteChange } = this.props;

    return (
        <div>
        <div className="flex items-center justify-center">
        <Collapse in={this.state.passwordNotMatch}>
            <Alert severity="error">Passwords don't match.</Alert>
        </Collapse>
        </div>
        <div className="flex items-center justify-center">
        <Collapse in={this.state.fieldsIncomplete}>
            <Alert severity="error">Please complete all the fields.</Alert>
        </Collapse>
        </div>
        <div className="flex items-center justify-center" >
        <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center v-mid">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                    <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name"
                    onChange={this.onNameChange}
                    />
                </div>
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
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                    <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="passwordConfirm"  
                    id="passwordConfirm"
                    onChange={this.onConfirmPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="">
                <input 
                        onClick={this.onSubmitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit"  
                        value="Register"
                        />
                </div>
                <div className="lh-copy mt3">
                <p onClick={() => onRouteChange("signin")} className="f6 link dim black db pointer">Already have an account?</p>
                </div>
            </div>
            </main>
        </article>
        </div>
        </div>

    )
}
}

export default Register;