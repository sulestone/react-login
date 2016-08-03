import * as React from 'react';
import UsernameContainer from './UsernameContainer.tsx';
import PasswordContainer from './PasswordContainer.tsx';
import LoginBtnContainer from './LoginBtnContainer.tsx';

interface StateProps {
    isLoginEnabled: boolean,
    usernameValid: boolean,
    passwordValid: boolean
}

export default class LoginMainContainer extends React.Component<{},StateProps> {
    constructor(StateProps) {
        super()
        this.state = {
            isLoginEnabled: false,
            usernameValid: false,
            passwordValid: false           
        };

    }
    enableLoginBtn(inputField, isValid) {
        if(inputField === 'passwordField') {
            this.state.passwordValid = isValid;
        }
        if(inputField === 'usernameField') {
            this.state.usernameValid = isValid;
        }
        this.setState(this.state, ()=> {
            if(this.state.usernameValid === true && this.state.passwordValid === true) {
                this.state.isLoginEnabled = true;
            } else {
                this.state.isLoginEnabled = false;
            }
            
            this.setState(this.state);
        })
            
            
    }
    render () {
        return (
            <form>
                <UsernameContainer enableLoginBtn={this.enableLoginBtn.bind(this)}/>
                <PasswordContainer enableLoginBtn={this.enableLoginBtn.bind(this)}/>
                <LoginBtnContainer isLoginEnabled={this.state.isLoginEnabled}/>
            </form>
        )
    }
}
