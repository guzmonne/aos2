import React from 'react'
import { BtnRowToolbar } from '../buttons.js'
import { editTooltip, newServiceRequestTooltip, deleteTooltip } from './clients-table-row-tooltips.js'
import { EditButton, NewServiceRequestButton, DeleteButton } from './clients-table-row-buttons.js'
import { AddressItem } from './clients-table-row-address-item.js'
import { ContactItem } from './clients-table-row-contact-item.js'

/* Table Row */
export const Tr = ({client, onDelete}) => {
	const del = (e) => {
		e.preventDefault()
		onDelete(client);
	}

	return (
		<tr className="animated fadeIn">
			<td>{client.get('name')}</td>
			<td>{client.get('identification')}</td>
			<td>
				<table style={{width: '100%'}}>
					{client.get('contact').
						filter(c => c.type === 'phone').
						map( (p, i) => <ContactItem key={i} contact={p} />)}
					{client.get('contact').
						filter(c => c.type === 'email').
						map( (p, i) => <ContactItem key={i} contact={p} />)}
				</table>
			</td>
			<td>
				{client.get('addresses').map((a, i) => <AddressItem key={i} address={a}/>)}
			</td>
			<td className="text-center">
				<BtnRowToolbar buttons={[
					<NewServiceRequestButton tooltip={newServiceRequestTooltip} />,
					<EditButton tooltip={editTooltip} id={client.id}/>,
					<DeleteButton tooltip={deleteTooltip} onDelete={del}/>
				]}/>
			</td>
		</tr>
	)
}