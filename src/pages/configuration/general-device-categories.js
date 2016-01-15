import React from 'react'
import {thead} from './general-device-categories-thead.js'
import Tr from './general-device-categories-row.js'
import DeviceCategoryModal from './general-device-categories-modal.js'
import { BtnRowToolbar, AddRowButton } from '../../components/buttons.js'
import DeleteDialog from '../../components/delete-dialog.js'

class GeneralDeviceCategories extends React.Component {
	constructor(props){
		super(props)

		this.showSubcategoryModal = this.showSubcategoryModal.bind(this)
		this.showCategoryModal    = this.showCategoryModal.bind(this)
		this.onToggleCategory     = this.onToggleCategory.bind(this)
		this.onAddCategory        = this.onAddCategory.bind(this)
		this.onAddSubcategory     = this.onAddSubcategory.bind(this)
		this.toggleCategory       = this.toggleCategory.bind(this)
		this.onClose              = this.onClose.bind(this)
		this.onDelete             = this.onDelete.bind(this)

		this.state = {
			showSubcategoryModal       : false,
			showCategoryModal          : false,
			showToggleCategoryDialog   : false,
			showDeleteCategoriesDialog : false,
			category                   : null
		}
	}

	showSubcategoryModal(category) {
		this.setState({category, showSubcategoryModal: true})
	}

	onAddSubcategory(subcategory){
		this.props.onAddSubcategory(this.state.category.id, subcategory)
		this.onClose()
	}

	showCategoryModal() {
		this.setState({ showCategoryModal: true })
	}

	onAddCategory(category){
		this.props.onAddCategory(category)
		this.onClose()
	}

	onToggleCategory(category){
		this.setState({
			showToggleCategoryDialog : true,
			category                 : category
		})
	}

	toggleCategory(){
		this.props.onToggleCategory(this.state.category)
		this.onClose()
	}
	
	onClose(){
		this.setState({
			showSubcategoryModal       : false,
			showCategoryModal          : false,
			showToggleCategoryDialog   : false,
			showDeleteCategoriesDialog : false
		})
	}

	onDelete(e){
		e.preventDefault()
		this.props.deleteCategoryHelpers()
		this.onClose()
	}

	render(){
		const {categories} = this.props
		const spinner = <h2><i className="fa fa-spinner fa-spin"></i>{' Loading...'}</h2>
		
		const row = (category, i) => {
			return (
				<Tr
					key={i}
					category={category}
					onCreate={this.showSubcategoryModal.bind(this, category)}
					onSelect={this.props.toggleCategorySelection.bind(this, category)}
					onToggleCategory={this.onToggleCategory.bind(this, category)}
					onToggleSubcategory={this.props.onToggleSubcategory}/>
			)
		}
		const table = (
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th>
							Categoría
						</th>
						<th>
							Subcategoría
						</th>
					</tr>
				</thead>
				<tbody>
					{categories.
						filter(c => c.enabled).
						sort((c1, c2) => c1.value.localeCompare(c2.value)).
						map( row )}
					{categories.
						filter(c => !c.enabled).
						sort((c1, c2) => c1.value.localeCompare(c2.value)).
						map( row )}
				</tbody>
			</table>
		)

		return (
			<div className="modal-container">
				
				<h4 className="add-margin-bottom">
					<strong>Categorías de Equipos</strong>
				</h4>

				<button
					className="btn btn-danger btn-xs pull-right margin-bottom"
					onClick={() => this.setState({showDeleteCategoriesDialog: true})}
					disabled={categories.filter(c => c.selected).length === 0}
				>
					<i className="fa fa-trash"></i>
				</button>
				
				<button
					onClick={this.showCategoryModal}
					className="btn btn-success btn-xs margin-bottom"
				>
					<i className="fa fa-plus"></i>{' Nueva Categoría'}
				</button>

				{categories.length === 0 ? spinner : table}

				<DeviceCategoryModal
					showModal={this.state.showSubcategoryModal}
					onClose={this.onClose}
					category={this.state.category && this.state.category.value}
					onAdd={this.onAddSubcategory}
				/>

				<DeviceCategoryModal
					showModal={this.state.showCategoryModal}
					onClose={this.onClose}
					onAdd={this.onAddCategory}
				/>

				<DeleteDialog
					showModal={this.state.showDeleteCategoriesDialog}
					closeModal={this.onClose}
					confirmDel={this.onDelete}
				>
					<p className="text-center">
						¿Esta seguro que desea eliminar las categorías seleccionadas?
					</p>
				</DeleteDialog>

				<DeleteDialog
					showModal={this.state.showToggleCategoryDialog}
					closeModal={this.onClose}
					confirmDel={this.toggleCategory}
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