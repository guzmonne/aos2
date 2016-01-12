import React from 'react'
import { BtnRowToolbar } from '../buttons.js'
import { EditRowButton, NewServiceRequestRowButton, DeleteRowButton } from '../buttons.js'
import { AddressItem } from './clients-table-row-address-item.js'
import { ContactItem } from './clients-table-row-contact-item.js'

/* Table Row */
export const Tr = ({model, onDelete}) => {
	const del = (e) => {
		e.preventDefault()
		onDelete(model);
	}

	return (
		<tr className="animated fadeIn">
			<td>{model.get('name')}</td>
			<td>{model.get('identification')}</td>
			<td>
				<table style={{width: '100%'}}>
					<tbody>
						{model.get('contact').
							filter(c => c.type === 'phone').
							map( (p, i) => <ContactItem key={i} contact={p} />)}
						{model.get('contact').
							filter(c => c.type === 'email').
							map( (p, i) => <ContactItem key={i} contact={p} />)}
					</tbody>
				</table>
			</td>
			<td>
				{model.get('addresses').map((a, i) => <AddressItem key={i} address={a}/>)}
			</td>
			<td className="text-center">
				<BtnRowToolbar buttons={[
					<NewServiceRequestRowButton />,
					<EditRowButton id={model.id} to={`/clients/edit/${model.id}`}/>,
					<DeleteRowButton onDelete={del}/>
				]}/>
			</td>
		</tr>
	)
}