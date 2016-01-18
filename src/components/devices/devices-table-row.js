import React from 'react'
import { BtnRowToolbar } from '../buttons.js'
import { EditRowButton, DeleteRowButton } from '../buttons.js'


export const Tr = ({model, onDelete}) => {
	const del = (e) => {
		e.preventDefault()
		onDelete(model)
	}

	return (
		<tr className="animated fadeIn">
			<td>{model.get('brand')}</td>
			<td>{model.get('category')}</td>
			<td>{model.get('subcategory')}</td>
			<td>{model.get('model')}</td>
			<td>{model.get('description')}</td>
			<td className="text-center">
				<BtnRowToolbar buttons={[
					<EditRowButton to={`/devices/edit/${model.id}`}/>,
					<DeleteRowButton />
				]}/>
			</td>
		</tr>
	)
}