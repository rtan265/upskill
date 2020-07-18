import React, { FormEvent } from "react";
import { User } from "../App";
import { debug } from "console";

interface IProps {
    user: User | null | undefined,
    setUser: Function
}

interface IState {
    email?: string,
    password?: string,

    error?: string[]
}

class Login extends React.Component<IProps, IState> {
    constructor(props : IProps){
        super(props);

        this.state = {
            email: "",
            password: "",

            error: []
        }
    }

    handleChangeEmail(event : FormEvent<HTMLInputElement>){
      this.setState({email: event.currentTarget.value});
    }

    handleChangePassword(event : FormEvent<HTMLInputElement>){
      this.setState({password: event.currentTarget.value});
    }

    /**
     * Submit logic.
     * When the user presses the login button, a request is made to the backend to attempt to login.
     * @param event 
     */
    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(this.validateClientSide()){
          console.log("Submitting login form");
          console.log(this.state);
        }
    }

    /**
     * Handles validation for client-side related things.
     * - If a field is empty, then client-side validation is false.
     * @returns valid If form is valid to be submitted on the client.
     */
    validateClientSide(){
      let overallError : string[] = [];
      let valid = true;
  
      if (!(this.state.email && this.state.password)) {
        overallError.push("Fields cannot be empty.");
        valid = false;
      }
  
      this.setState({
        error: overallError
      }); 
  
      return valid;
    }

    render() {
        return (
            <div>
                <h1>Please register</h1>
                <div>
                    {this.state.error && this.state.error.length > 0 && (<h2>Errors:</h2>)}
                    {this.state.error && this.state.error.map((errorReason, index) => (
                        <li key={index}>
                            {errorReason}
                        </li>
                    ))}
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={this.handleChangeEmail.bind(this)} value={this.state.email} /><br/>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" onChange={this.handleChangePassword.bind(this)} value={this.state.password} /><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default Login;