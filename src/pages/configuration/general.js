import React from 'react'
import { connect } from 'react-redux'
import GeneralDeviceCategories from './general-device-categories.js'
import {
	fetchDeviceCategoryHelpers,
	createDeviceSubcategoryHelper,
	createDeviceCategoryHelper,
	toggleDeviceCategoryHelper,
	toggleDeviceSubcategoryHelper,
	deleteDeviceCategoryHelpers} from './general.actions.js'

class GeneralConfig extends React.Component {
	constructor(props){
		super(props)

		this.displayName = 'GeneralConfig'
	}

	componentWillMount(){
		this.props.fetchDeviceCategoryHelpers()
	}

	render(){
		const {categories} = this.props.general

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-6">

						<GeneralDeviceCategories
							categories={categories}
							onAddSubcategory={this.props.createDeviceSubcategoryHelper}
							onAddCategory={this.props.createDeviceCategoryHelper}
							onToggleCategory={this.props.toggleDeviceCategoryHelper}
							onToggleSubcategory={this.props.toggleDeviceSubcategoryHelper}
							deleteCategoryHelpers={this.props.deleteDeviceCategoryHelpers}
						/>

					</div>
				</div>
			</div>
		)
	}
}

function select(state){
	return {
		general: state.general
	}
}

export default connect(
	select,
	{
		fetchDeviceCategoryHelpers,
		createDeviceCategoryHelper,
		createDeviceSubcategoryHelper,
		toggleDeviceCategoryHelper,
		toggleDeviceSubcategoryHelper,
		deleteDeviceCategoryHelpers
	}
)(GeneralConfig)