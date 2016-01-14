import React from 'react'
import { BtnRowToolbar, EyeRowButton } from '../../components/buttons.js'

export default ({category, onCreate, onToggleCategory, onToggleSubcategory}) => {
	const click = (e) => {
		e.preventDefault()
		onCreate()
	}

	const toggleCategory = () => onToggleCategory(category)

	const Subcategory = ({cat, sub}) => {
		const toggleSubcategory = () => onToggleSubcategory(sub)
		return (
			<span onClick={toggleSubcategory}>
				{cat.enabled? 
					<a href="javascript:void(0);" className="text-primary">
						{sub.enabled ? sub.value : <strike className="text-muted">{sub.value}</strike>}
					</a> :
					<span className="text-muted">
						{sub.enabled ? sub.value : <strike className="text-muted">{sub.value}</strike>}
					</span>}
			</span>
		)
	}

	return (
		<tr className={category.enabled ? null : "row-disabled"} style={{verticalAlign: 'middle'}}>
			<td>
				{category.enabled ? 
					<i onClick={toggleCategory} className="pointer fa fa-2x fa-toggle-on text-primary"></i> :
					<i onClick={toggleCategory} className="pointer fa fa-2x fa-toggle-off text-muted"></i>}
			</td>
			<td>{category.value}</td>
			<td>
				<ul className="list-unstyled">
					{category.subcategories.map((subcategory, i) => {
						return (
							<li key={i}>
								<Subcategory cat={category} sub={subcategory} />
							</li>
						)
					})}
					{category.enabled ?
					<li style={{borderTop: '1px solid #DCDCDC'}}>
						<a href="#" onClick={click} className="text-success">Nueva Subcategoría</a>
					</li>
					:
					null}
				</ul>
			</td>
		</tr>
	)

}