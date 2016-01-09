import React from 'react';
import UsersTable from '../users/users-table.js'
import CreateUserModal from '../users/create-user-modal.js'
import { connect } from 'react-redux'
import { fetchUsers, createUser, toggleCreateUserModal } from './users.actions.js'
import { UpdateButton, CreateButton } from '../buttons.js'
import Rx from 'rx'

class Users extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Users';
    this.updateSubject = new Rx.BehaviorSubject();
    this.update = () => this.updateSubject.onNext({forceUpdate: true});
	}

	componentDidMount(){
		const {users, fetchUsers} = this.props
		const msSinceLastFetch = () => new Date().getTime() - users.lastFetch.getTime()

		this.updateSubject.
			throttle(1000).
			map(options => (options) ? options.forceUpdate : !users.lastFetch).
			filter(forceUpdate => forceUpdate || msSinceLastFetch() > 60000 ).
			subscribe(
				() => fetchUsers(),
				(e) => console.error(e),
				() => console.log('Completed Users UpdateSubject')
			)
	}

	componentWillUnmount(){
		this.updateSubject.onCompleted();
	}

	render() {
		const user = {name: '', username: '', email: ''}
		const {users, toggleCreateUserModal, createUser} = this.props
		const {isShowingCreateModal} = this.props.users
		const showModal = () => this.props.toggleCreateUserModal()
		const $modal = <CreateUserModal 	close={toggleCreateUserModal}
													user={user}
													onSave={createUser}
													updating={users.isCreatingUser}
													error={users.createUserError}
													modalIn={isShowingCreateModal}/>

		return (
			<div className="container container-fluid">
				<UpdateButton onClick={this.update} loading={this.props.users.isFetching}/>
				<CreateButton className="float-right" onClick={showModal}>Nuevo Usuario</CreateButton>

				<hr/>

				<UsersTable onDelete={(user) => console.log(user.getUsername())}
										users={users.collection}/>

				{isShowingCreateModal ? $modal : null}
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
		createUser,
		toggleCreateUserModal
	}
)(Users)