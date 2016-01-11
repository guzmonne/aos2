import React from 'react'
import Table from '../table.js'
import { thead } from './clients-table-thead.js'
import { Tr } from './clients-table-row.js'

const Clients = ({clients, onDelete}) => {
	const tbody = clients.map((client, index) => {
		return <Tr key={client.id} client={client} onDelete={onDelete}/>
	})
	return (
		<Table thead={thead} tbody={tbody} />
	)
}

Clients.propTypes = {
	clients: React.PropTypes.array.isRequired
}

export default Clients