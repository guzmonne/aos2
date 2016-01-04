import React from 'react'

export default function UsersTable ({users, onDelete}) {
	const userRows = users.map(user => <UserRow key={user.id} user={user} onDelete={onDelete}/>)

	return (
		<table>
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
		<tr>
      <td>{user.id}</td>
      <td>{user.get('name')}</td>
      <td>{user.getUsername()}</td>
      <td>{user.getEmail()}</td>
      <td>
      	<div className="dropdown-standalone dropdown-outlined">
      		<a className="button-unstyled">
      			<i className="fa fa-cogs"></i>
      		</a>
      		<span className="icon-arrow-down"></span>
      		<ul className="list-unstyled dropdown">
      			<li onClick={del}><a className="text-danger">
      				<i className="fa fa-times"></i>&nbsp;Eliminar
    				</a></li>
      		</ul>
      	</div>
      </td>
    </tr>
	)
}