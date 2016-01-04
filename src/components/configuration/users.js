import React from 'react';
import UsersTable from '../users-table.js'
import { connect } from 'react-redux'
import { fetchUsers, forceFetchUsers } from './users.actions.js'
import { UpdateButton } from '../buttons.js'

class Users extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Users';
	}

	componentWillMount(){
		this.props.fetchUsers()
	}

	render() {
		const {users} = this.props

		const update = () => {
			this.props.forceFetchUsers()
		}

		return (
			<div className="container container-fluid">
				<UpdateButton onClick={update} loading={this.props.users.isFetching}/>

				<UsersTable onDelete={(user) => console.log(user)}
										users={users.collection}/>
			</div>	
		);
	}
}

Users.propTypes = {
	users: React.PropTypes.object
}

function select (state) {
	return {
		users: state.users
	}
}

export default connect(
	select,
	{
		fetchUsers,
		forceFetchUsers
	}
)(Users)