import React from 'react'
import { BtnRowToolbar, EyeRowButton } from '../../components/buttons.js'

export default ({category, onCreate, onDelete, onToggleCategory, onToggleSubcategory, onSelect=function(){}}) => {
	const click = (e) => {
		e.preventDefault()
		onCreate()
	}

	const toggleCategory = () => onToggleCategory(category)

	const Subcategory = ({cat, sub}) => {
		let showDeleteButton = false
		
		const toggleSubcategory = () => onToggleSubcategory(sub)
		const del = e => {
			e.preventDefault()
			e.stopPropagation()
			onDelete(sub)
		}
 
		return (
			<span>
				{cat.enabled? 
					<a href="javascript:void(0);" className="text-primary hidden-content">
						{sub.enabled ? sub.value : <strike className="text-muted">{sub.value}</strike>}
						<span className="show-on-hover" onClick={toggleSubcategory}> <i className={(sub.enabled ? "fa fa-eye-slash" : "fa fa-eye")}></i> </span>
						<span className="show-on-hover" onClick={del}> <i className="fa fa-times text-danger"></i> </span>
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
				<input type="checkbox" checked={category.selected} onChange={onSelect}/>
			</td>
			<td>
				{category.enabled ? 
					<i onClick={toggleCategory} className="pointer fa fa-2x fa-toggle-on text-primary"></i> :
					<i onClick={toggleCategory} className="pointer fa fa-2x fa-toggle-off text-muted"></i>}
			</td>
			<td><text>{category.value}</text></td>
			<td>
				<ul className="list-unstyled">
					{category.
						subcategories.
						sort( (sA, sB) => sA.value.localeCompare(sB.value) ).
						map((subcategory, i) => {
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