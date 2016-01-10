import React from 'react'
import { BtnRowToolbar } from '../buttons.js'
import { editTooltip, newServiceRequestTooltip } from './clients-table-row-tooltips.js'
import { EditButton, NewServiceRequestButton } from './clients-table-row-buttons.js'
import { AddressItem } from './clients-table-row-address-item.js'
import { ContactItem } from './clients-table-row-contact-item.js'

/* Table Row */
export const Tr = ({client}) => {
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
					<EditButton tooltip={editTooltip} id={client.id}/>,
					<NewServiceRequestButton tooltip={newServiceRequestTooltip} />
				]}/>
			</td>
		</tr>
	)
}