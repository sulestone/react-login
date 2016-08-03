import * as React from 'react';
import ValidationMessage from './ValidationMessage.tsx'

interface Props {
    enableLoginBtn: any
}

interface StateProps {
    password: string,
    isValid: Array<string>
}

export default class PasswordContainer extends React.Component<Props, StateProps> {
    constructor(StateProps) {
        super()
        this.state = {
            password: '',
            isValid: []
        };
    }
    validatePassword (event) {
        this.state.password = event.target.value;
        this.setState(this.state, ()=> {
            let password = this.state.password;
            this.state.isValid[0] = password.length >= 3 ? 'isValid' : 'notValid';
            this.setState(this.state, ()=> {
                let passwordIsValid = false;
                let implementingField = 'passwordField'

                if(this.state.isValid[0] === 'isValid') {
                    passwordIsValid = true;
                }
                this.props.enableLoginBtn(implementingField, passwordIsValid);
            });
        });
    }
    render() {
        let validationMessage = [
            "password is required"
        ];
        validationMessage.forEach((validation) => {
            this.state.isValid.push('notValid');
        })

        let messageToBeValidate = validationMessage.map((message, index) => {
            return (
                <ValidationMessage
                    message={message}
                    key={index}
                    isValid={this.state.isValid[index]}
                    />
            );
        })
        return (
            <div>
                <input
                    type="password"
                    onInput={this.validatePassword.bind(this)}
                    />
                <ul>
                    {messageToBeValidate}
                </ul>
            </div>

        )
    }
}
