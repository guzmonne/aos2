import React from 'react';
import { connect } from 'react-redux'
import UserForm from '../users/user-form.js'
import {updateAccount, enableAccountEdition, disableAccountEdition} from './account.actions.js'


class Account extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Account';
	}

	componentWillMount(){
		if (this.props.account.editable)
			this.props.disableAccountEdition()
	}

	render() {
		const {updateAccount, account, enableAccountEdition, disableAccountEdition} = this.props

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<UserForm	user={this.props.currentUser}
											editable={account.editable}
											onEdit={enableAccountEdition}
											onCancel={disableAccountEdition}
											onSave={updateAccount}
											updating={account.updating}
											error={account.error}
											legend={"Cuenta"}/>
					</div>
				</div>
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