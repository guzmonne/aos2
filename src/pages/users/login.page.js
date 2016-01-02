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

						<LoginForm onSubmit={(username, password) => {
							this.props.loginUser(username, password);
						}} />

					</div>
					<div className="grid-flex-cell"></div>
				</div>
				<div className="grid-flex-container">
					<dt>Username</dt>
					{' '}
					<dd>{this.props.currentUser.username}</dd>
					{' '}
					<dt>Password</dt>
					{' '}
					<dd>{this.props.currentUser.password}</dd>
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