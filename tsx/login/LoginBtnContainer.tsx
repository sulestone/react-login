import * as React from 'react';

interface Props {
    isLoginEnabled
}
export default class LoginBtnContainer extends React.Component<Props,{}> {
    render () {
        return (
            <div>
                <input
                    type="submit"
                    value="submit"
                    disabled={!this.props.isLoginEnabled}
                />
            </div>
        )
    }
}
