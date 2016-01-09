import React from 'react'
import Table from '../table.js'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { BtnRowToolbar } from '../buttons.js'

/* Table Head */
const thead = <tr>
								<th>#</th>
								<th>Nombre</th>
								<th>ID</th>
								<th>Contacto</th>
								<th>Direcciones</th>
								<th className="text-center">
									<i className="fa fa-ellipsis-h"></i>
								</th>
							</tr>

/* Tooltips */
const editTooltip = <Tooltip id="editClient">
											Editar
										</Tooltip>
const newServiceRequestTooltip = 	<Tooltip id="newServiceRequest">
																		Nueva Orden de Servicio
																	</Tooltip>
/* Buttons */
const EditButton = ({tooltip}) => {
	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			<button data-toggle="tooltip" className="btn btn-warning btn-with-sup">
				<i className="fa fa-pencil"></i>
			</button>
		</OverlayTrigger>
	)
}
const NewServiceRequestButton = ({tooltip}) => {
	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			<button className="btn btn-success btn-with-sup">
				<i className="fa fa-clipboard"></i>
				<sup><i className="fa fa-plus"></i></sup>
			</button>
		</OverlayTrigger>
	)
}
/* Table Row */
const Tr = ({client}) => {
	return (
		<tr>
			<td>{client.id}</td>
			<td>{client.name}</td>
			<td>{client.identification}</td>
			<td>{client.contact}</td>
			<td>{client.addresses}</td>
			<td className="text-center">
				<BtnRowToolbar buttons={[
					<EditButton tooltip={editTooltip} />,
					<NewServiceRequestButton tooltip={newServiceRequestTooltip} />
				]}/>
			</td>
		</tr>
	)
}

const Clients = ({clients}) => {
	const tbody = clients.map(client => <Tr key={client.id} client={client} />)

	return (
		<Table thead={thead} tbody={tbody}/>
	)
}

Clients.propTypes = {
	clients: React.PropTypes.array.isRequired
}

export default Clients