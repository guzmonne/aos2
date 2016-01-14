import React from 'react'
import {thead} from './general-device-categories-thead.js'
import Tr from './general-device-categories-row.js'
import DeviceCategoryModal from './general-device-categories-modal.js'
import { BtnRowToolbar, AddRowButton } from '../../components/buttons.js'
import DeleteDialog from '../../components/delete-dialog.js'

class GeneralDeviceCategories extends React.Component {
	constructor(props){
		super(props)

		this.displayName = 'GeneralDeviceCategories'
		this.state = {
			showSubcategoryModal     : false,
			showCategoryModal        : false,
			showToggleCategoryDialog : false,
			category                 : null
		}
	}

	render(){
		const {categories} = this.props
		const spinner = (
			<h2><i className="fa fa-spinner fa-spin"></i>{' Loading...'}</h2>
		)
		const showSubcategoryModal = (category) => {
			this.setState({category, showSubcategoryModal: true})
		}
		const showCategoryModal = () => this.setState({
			showCategoryModal: true
		})
		const onClose = () => this.setState({
			showSubcategoryModal     : false,
			showCategoryModal        : false,
			showToggleCategoryDialog : false
		})
		const onToggleCategory = (category) => this.setState({
			showToggleCategoryDialog : true,
			category                 : category
		})
		const onAddSubcategory = (subcategory) => { 
			this.props.onAddSubcategory(this.state.category.id, subcategory)
			onClose()
		}
		const onAddCategory = (category) => {
			this.props.onAddCategory(category)
			onClose()
		}
		const toggleCategory = () => {
			this.props.onToggleCategory(this.state.category)
			onClose()
		}
		const row = (category, i) => {
			return (
				<Tr
					key={i}
					category={category}
					onCreate={showSubcategoryModal.bind(this, category)}
					onToggleCategory={onToggleCategory.bind(this, category)}
					onToggleSubcategory={this.props.onToggleSubcategory}/>
			)
		}
		const table = (
			<table className="table table-hover table-striped">
				<thead>
					{thead}
				</thead>
				<tbody>
					{categories.filter(c => c.enabled).map( row )}
					{categories.filter(c => !c.enabled).map( row )}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="3" className="text-center">
							<BtnRowToolbar buttons={[
								<AddRowButton onClick={showCategoryModal}/>
							]}/>
						</td>
					</tr>
				</tfoot>
			</table>
		)
		
		return (
			<div className="modal-container">
				
				<h4 className="add-margin-bottom">
					<strong>Categorías de Equipos</strong>
				</h4>

				{categories.length === 0 ? spinner : table}

				<DeviceCategoryModal
					showModal={this.state.showSubcategoryModal}
					onClose={onClose}
					category={this.state.category && this.state.category.value}
					onAdd={onAddSubcategory}
				/>

				<DeviceCategoryModal
					showModal={this.state.showCategoryModal}
					onClose={onClose}
					onAdd={onAddCategory}
				/>

				<DeleteDialog
					showModal={this.state.showToggleCategoryDialog}
					closeModal={onClose}
					confirmDel={toggleCategory}
				>
					<p className="text-center">
						¿Esta seguro que desea 
						{this.state.category && this.state.category.enabled ? ' desactivar ': ' activar '}
						esta categoría?
					</p>
				</DeleteDialog>

			</div>
		)
	}
}

GeneralDeviceCategories.propTypes = {
	categories: React.PropTypes.array.isRequired
}

export default GeneralDeviceCategories