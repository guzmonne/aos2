import React from 'react'
import { BtnRowToolbar, EyeRowButton } from '../../components/buttons.js'

export default ({family, subfamilies, del}) => {

	return (

		<tr style={{verticalAlign: 'middle'}}>
			<td>
				<BtnRowToolbar 
					buttons={[<EyeRowButton />]}
				/>
			</td>
			<td>{family}</td>
			<td>
				<ul className="list-unstyled">
					{subfamilies.map((subfamily, i) => {
						return (
							<li key={i}>
								<a href="#" className="text-primary">{subfamily.get('value')}</a>
							</li>
						)
					})}
					<li style={{borderTop: '1px solid #DCDCDC'}}>
						<a href="#" className="text-success">Nueva Subcategoría</a>
					</li>
				</ul>
			</td>
		</tr>
	)

}