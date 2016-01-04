import React from 'react';
import { connect } from 'react-redux'
import AccountWidget from './account.widget.js'
import {updateAccount, enableAccountEdition, disableAccountEdition} from './account.actions.js'


class Account extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Account';
	}	

	render() {
		const {updateAccount, account, enableAccountEdition, disableAccountEdition} = this.props

		return (
			<AccountWidget 	currentUser={this.props.currentUser}
											editable={account.editable}
											onEdit={enableAccountEdition}
											onCancel={disableAccountEdition}
											onSave={updateAccount}
											updating={account.updating}/>
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