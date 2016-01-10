import React from 'react'
import Table from '../table.js'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { BtnRowToolbar } from '../buttons.js'

/* Table Head */
const thead = <tr>
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
			<button data-toggle="tooltip" className="btn btn-warning btn-with-sup btn-outline">
				<i className="fa fa-pencil"></i>
			</button>
		</OverlayTrigger>
	)
}
const NewServiceRequestButton = ({tooltip}) => {
	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			<button className="btn btn-success btn-with-sup btn-outline">
				<i className="fa fa-clipboard"></i>
				<sup><i className="fa fa-plus"></i></sup>
			</button>
		</OverlayTrigger>
	)
}
/* Addresses */
const AddressItem = ({address}) => 	<div className="text-primary-on-hover">
																			<i className="fa fa-home"></i>
																			<strong>{' ' + address.street}</strong>
																			{address.location ? <br/> : null}
																			{address.location ? address.location : null}
																			{address.state ? ', ' + address.state : null}
																		</div> 
/* Contact */
const ContactItem = ({contact}) =>	<div className="text-primary-on-hover">
																			{contact.type === 'phone' ?
																				<i className="fa fa-phone"></i> :
																				<i className="fa fa-envelope"></i>
																			}
																			<strong>{' ' + contact.description}</strong>
																			<br/>
																			{contact.value}
																		</div>
/* Table Row */
const Tr = ({client}) => {
	return (
		<tr className="animated fadeIn">
			<td>{client.get('name')}</td>
			<td>{client.get('identification')}</td>
			<td>
				{client.get('contact').
					filter(c => c.type === 'phone').
					map( (p, i) => <ContactItem key={i} contact={p} />)}
				{client.get('contact').
					filter(c => c.type === 'email').
					map( (p, i) => <ContactItem key={i} contact={p} />)}
			</td>
			<td>
				{client.get('addresses').map((a, i) => <AddressItem key={i} address={a}/>)}
			</td>
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