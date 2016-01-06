import React from 'react';
import FormElementError from './form-element-error.js'

class LoginForm extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'LoginForm';
		this.submitForm = this.submitForm.bind(this);
	}	

	submitForm(e){
		e.preventDefault();
		const {username, password} = this.refs;
		this.props.onSubmit(username.value, password.value);
	}

	render() {
		const error = this.props.error || {};

		let inputClass = 'form-control', $message = '', {message} = error;

		const $submitButton =	<button	type='submit'
																	className='btn btn-primary btn-block'>
														Aceptar
													</button>
		const $loginInButton =	<button	className='btn btn-primary btn-block' disabled>
															<i className="fa fa-spinner fa-spin"></i>
														</button>

		const $button = (!!this.props.isLoggingIn) ? $loginInButton : $submitButton;

		if (!!message){
			inputClass = 'form-control error'
			$message = <label htmlFor="username" className="error">{message}</label>
		}

		return (
			<form onSubmit={this.submitForm}>
				
				<div className="form-group">
					<label forHtml="username">Usuario</label>
					<input placeholder="Usuario" type="text" className={inputClass} ref="username"/>
				</div>
				<div className="form-group">
					<label forHtml="password">Contraseña</label>
					<input placeholder="Contraseña" type="password" className={inputClass} ref="password"/>
				</div>

				{$button}
			
			</form>
		);
	}
}

export default LoginForm
