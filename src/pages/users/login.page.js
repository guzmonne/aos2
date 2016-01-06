import React from 'react';
import { connect } from 'react-redux'
import { loginUser } from './login.actions.js'
import LoginForm from '../../components/login-form.js'

class Login extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Login';
	}

	render() {
		return (
			<div className="outer-page">
				<div className="login-page">
					<div className="tab-content">
						<div className="tab-pane fade active in" id="login">

							<LoginForm 	onSubmit={this.props.loginUser}
													error={this.props.currentUser.err}
													isLoggingIn={this.props.currentUser.isLoggingIn}/>
						
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	currentUser: React.PropTypes.object
}

function select(state){
	return {
		currentUser: state.currentUser
	}
}

export default connect(
	select,
	{
		loginUser
	}
)(Login)