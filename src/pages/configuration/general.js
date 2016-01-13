import React from 'react'
import { connect } from 'react-redux'
import GeneralDeviceCategories from './general-device-categories.js'
import {fetchDeviceCategoryHelpers, createDeviceCategoryHelper} from './general.actions.js'

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
							onAdd={this.props.createDeviceCategoryHelper}
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
		createDeviceCategoryHelper
	}
)(GeneralConfig)