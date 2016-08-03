import * as React from 'react';
import ValidationMessage from './ValidationMessage.tsx'
import * as $ from 'jquery';

interface Props {
    username: string,
    isValid: Array<string>,
}

interface StateProps {
    enableLoginBtn: any
}
export default class UsernameContainer extends React.Component<StateProps, Props> {
    constructor(props) {
        super();
        this.state = {
            username: '',
            isValid: []
        };
    }
    validateUserNameInDB(callback) {
        let url = 'api/users';
        let username = this.state.username;

        $.ajax({
            context: this,
            url: url,
            dataType: 'json',
            cache: false,
            success(data) {
                let users = [];
                data.forEach((user) => {
                    users.push(user.username);
                });
                if (users.indexOf(username) >= 0) {
                    this.state.isValid[3] = 'isValid';
                } else {
                    console.log('username not found');
                }
                callback();
            }
        });
    }
    usernameValidation(event) {
        this.state.username = event.target.value;
        this.state.isValid[3] = 'notValid';
        this.setState(this.state, () => {
            console.log('this is username state ' + this.state.username);
            let username = this.state.username;
            this.state.isValid[0] = !/\d/.test(username) && !/\s/.test(username) && username !== '' ? 'isValid' : 'notValid';
            this.state.isValid[1] = username.length >= 3 && !/\s/.test(username) && username !== '' ? 'isValid' : 'notValid';
            this.state.isValid[2] = !/\s/.test(username) && username !== '' ? 'isValid' : 'notValid';
            this.setState(this.state, () => {
                let validationStateBeforeAjaxCall = []; //todo - needs refactoring

                let isLoginBtnEnabled =  () => {
                    this.setState(this.state, () => {
                        let inputField = 'usernameField';
                        let isValid = false;
                        if(this.state.isValid[3] === 'isValid') {
                            isValid = true;
                        }
                        this.props.enableLoginBtn(inputField, isValid);
                    });
                }

                for (var i = 0; i< 3; i++) {
                    validationStateBeforeAjaxCall.push(this.state.isValid[i]);
                }

                if (validationStateBeforeAjaxCall.indexOf('notValid') === -1) {
                    this.validateUserNameInDB(isLoginBtnEnabled.bind(this));
                }

            });
        });
    }
    render() {
        let validationMessage = [
            "username cannot have numeric characters",
            "username length min 3",
            "username is required",
            "user name was found"
        ];
        if (this.state.isValid.length <= 0) {
            validationMessage.forEach((message) => {
                this.state.isValid.push('notValid');
            });
        }

        let messageToBeValidated = validationMessage.map((message, index) => {

            return (
                <ValidationMessage
                    message={message}
                    key={index}
                    isValid={this.state.isValid[index]}
                    />
            )
        })
        return (
            <div>
                <input
                    type="text"
                    value={this.state.username}
                    onInput={this.usernameValidation.bind(this) }
                    />
                <ul>
                    {messageToBeValidated}
                </ul>
            </div>
        );
    }
}