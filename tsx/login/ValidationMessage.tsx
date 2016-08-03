import * as React from 'react';
interface Props {
    message: string
    isValid: string
}
export default class ValidationMessage extends React.Component<Props,{}> {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <li className={this.props.isValid}>
                {this.props.message}
            </li>
        );
    }
}