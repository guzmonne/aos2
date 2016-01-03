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
			<div>
				<div className="grid-flex-container">
					<div className="grid-flex-cell"></div>
					<div className="grid-flex-cell grid-flex-cell-1of3">

						<LoginForm 	onSubmit={this.props.loginUser}
												error={this.props.currentUser.err}
												isLoggingIn={this.props.currentUser.isLoggingIn}/>

					</div>
					<div className="grid-flex-cell"></div>
				</div>
				<div className="grid-flex-container"></div>
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