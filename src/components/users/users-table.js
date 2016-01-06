import React from 'react'

export default function UsersTable ({users, onDelete}) {
	const userRows = users.map(user => <UserRow key={user.id} user={user} onDelete={onDelete}/>)

	return (
		<div className="table-responsive">
			<table className="table table-hover table-striped">
		    <thead>
		      <tr>
		        <th>#</th>
		        <th>Nombre</th>
		        <th>Usuario</th>
		        <th>Email</th>
		        <th>
		    			<i className="fa fa-ellipsis-h"></i>
		        </th>
		      </tr>
		    </thead>
		    <tbody>
		    	{userRows} 	      
		    </tbody>
		  </table>
		</div>
	)
}

UsersTable.propTypes = {
	users: React.PropTypes.array.isRequired,
	onDelete: React.PropTypes.func.isRequired
}

function UserRow ({user, onDelete}) {
	const del = e => {
		e.preventDefault()
		onDelete(user);
	}

	return (
		<tr className="animated fadeIn">
      <td>{user.id}</td>
      <td>{user.get('name')}</td>
      <td>{user.getUsername()}</td>
      <td>{user.getEmail()}</td>
      <td>
      	<button onClick={del} className="btn-outline-danger">
      		<i className="fa fa-trash"></i>
      	</button>
      </td>
    </tr>
	)
}