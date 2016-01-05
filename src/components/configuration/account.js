import React from 'react';
import { connect } from 'react-redux'
import { store } from '../../state/store.js'
import UserForm from '../users/user-form.js'
import {updateAccount, enableAccountEdition, disableAccountEdition} from './account.actions.js'


class Account extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Account';
	}

	componentWillMount(){
		store.dispatch(this.props.disableAccountEdition())
	}

	render() {
		const {updateAccount, account, enableAccountEdition, disableAccountEdition} = this.props

		return (
			<div className="container">
				<UserForm	user={this.props.currentUser}
									editable={account.editable}
									onEdit={enableAccountEdition}
									onCancel={disableAccountEdition}
									onSave={updateAccount}
									updating={account.updating}
									error={account.error}
									legend={"Cuenta"}/>
			</div>
		);
	}
}

function select (state) {
	return {
		currentUser: state.currentUser,
		account: state.account
	}
}

export default connect(
	select,
	{
		enableAccountEdition,
		disableAccountEdition,
		updateAccount
	}
)(Account)