import React from 'react'
import {thead} from './general-device-categories-thead.js'
import Tr from './general-device-categories-row.js'
import DeviceCategoryModal from './general-device-categories-modal.js'


class GeneralDeviceCategories extends React.Component {
	constructor(props){
		super(props)

		this.displayName = 'GeneralDeviceCategories'
		this.state = {
			showModal: false,
			category : null
		}
	}

	render(){
		const {categories} = this.props
		const spinner = (
			<h2><i className="fa fa-spinner fa-spin"></i>{' Loading...'}</h2>
		)
		const showModal = (category) => {
			this.setState({category, showModal: true})
		}
		const onClose = () => this.setState({showModal: false})
		const onAdd = (subcategory) => { 
			this.props.onAdd(this.state.category.id, subcategory)
			onClose()
		}
		const table = (
			<table className="table table-hover table-striped">
				<thead>
					{thead}
				</thead>
				<tbody>
					{categories.map( (category, i) => {
						return (
							<Tr key={i} category={category} onClick={showModal.bind(this, category)}/>
						)
					} )}
				</tbody>
			</table>
		)
		
		return (
			<div className="modal-container">
				
				<h4 className="add-margin-bottom">
					<strong>Categorías de Equipos</strong>
				</h4>

				{categories.length === 0 ? spinner : table}

				<DeviceCategoryModal
					showModal={this.state.showModal}
					onClose={onClose}
					container={this}
					category={this.state.category && this.state.category.value}
					onAdd={onAdd}
				/>

			</div>
		)
	}
}

GeneralDeviceCategories.propTypes = {
	categories: React.PropTypes.array.isRequired
}

export default GeneralDeviceCategories