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

		let inputClass = 'form-input', $message = '', {message} = error;

		const $submitButton =	<button	type='submit'
																	className='button button-primary button-block'>
														Aceptar
													</button>
		const $loginInButton =	<button	className='button button-primary button-block' disabled>
															<i className="fa fa-spinner fa-spin"></i>
														</button>

		const $button = (!!this.props.isLoggingIn) ? $loginInButton : $submitButton;

		if (!!message){
			inputClass = 'form-input input-invalid'
			$message = <FormElementError message={message} />
		}

		return (
			<form onSubmit={this.submitForm}>
				<fieldset>
					<legend>Iniciar Sesión</legend>
					
					{$message}
					
					<div className="form-element">
						<label>Usuario</label>
						<input type="text" className={inputClass} ref="username"/>
					</div>
					<div className="form-element">
						<label>Contraseña</label>
						<input type="password" className={inputClass} ref="password"/>
					</div>
					
					{$button}
				</fieldset>
			</form>
		);
	}
}

export default LoginForm
