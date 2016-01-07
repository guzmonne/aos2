import React from 'react'
import Table from '../table.js'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

const Clients = ({clients}) => {
	const thead = <tr>
									<th>#</th>
									<th>Nombre</th>
									<th>ID</th>
									<th>Contacto</th>
									<th>Direcciones</th>
									<th className="text-center"><i className="fa fa-ellipsis-h"></i></th>
								</tr>
	const editTooltip = <Tooltip id="editClient">Editar</Tooltip>
	const newServiceRequestTooltip = <Tooltip id="newServiceRequest">Nueva Orden de Servicio</Tooltip>

	const Tr = ({client}) => {
		return (
			<tr>
				<td>{client.id}</td>
				<td>{client.name}</td>
				<td>{client.identification}</td>
				<td>{client.contact}</td>
				<td>{client.addresses}</td>
				<td className="text-center">
					<div className="btn-toolbar btn-center" style={{display: 'inline-block'}}>
						<div className="btn-group btn-group-xs">
							<OverlayTrigger placement="top" overlay={editTooltip}>
								<button data-toggle="tooltip" className="btn btn-warning btn-with-sup ui-tooltip">
									<i className="fa fa-pencil"></i>
								</button>
							</OverlayTrigger>
						</div>
						<div className="btn-group btn-group-xs">
							<OverlayTrigger placement="top" overlay={newServiceRequestTooltip}>
								<button className="btn btn-success btn-with-sup">
									<i className="fa fa-clipboard"></i>
									<sup><i className="fa fa-plus"></i></sup>
								</button>
							</OverlayTrigger>
						</div>
					</div>
				</td>
			</tr>
		)
	}
	const tbody = clients.map(client => <Tr key={client.id} client={client} />)

	return (
		<Table thead={thead} tbody={tbody}/>
	)
}

Clients.propTypes = {
	clients: React.PropTypes.array.isRequired
}

export default Clients