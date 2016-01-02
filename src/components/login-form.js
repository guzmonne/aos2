import React from 'react';

class LoginForm extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'LoginForm';
		this.submitForm = this.submitForm.bind(this);
	}	

	submitForm(e){
		e.preventDefault();
		const {username, password} = this.refs;
		console.log(username.value, password.value)
		this.props.onSubmit(username.value, password.value);
	}

	render() {
		return (
			<form onSubmit={this.submitForm}>
				<fieldset>
					<legend>Iniciar Sesión</legend>
					<div className="form-element">
						<label>Usuario</label>
						<input type="text" className="form-input" ref="username"/>
					</div>
					<div className="form-element">
						<label>Contraseña</label>
						<input type="password" className="form-input" ref="password"/>
					</div>

					<button type='submit'
									className='button button-primary button-block'>
						Aceptar
					</button>
				</fieldset>
			</form>
		);
	}
}

export default LoginForm
