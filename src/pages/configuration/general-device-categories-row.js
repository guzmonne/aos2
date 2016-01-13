import React from 'react'
import { BtnRowToolbar, EyeRowButton } from '../../components/buttons.js'

export default ({category, onClick}) => {
	const click = (e) => {
		e.preventDefault()
		onClick()
	}

	return (
		<tr style={{verticalAlign: 'middle'}}>
			<td>
				<BtnRowToolbar 
					buttons={[<EyeRowButton />]}
				/>
			</td>
			<td>{category.value}</td>
			<td>
				<ul className="list-unstyled">
					{category.subcategories.map((subcategory, i) => {
						return (
							<li key={i}>
								<a href="#" className="text-primary">{subcategory.value}</a>
							</li>
						)
					})}
					<li style={{borderTop: '1px solid #DCDCDC'}}>
						<a href="#" onClick={click} className="text-success">Nueva Subcategoría</a>
					</li>
				</ul>
			</td>
		</tr>
	)

}