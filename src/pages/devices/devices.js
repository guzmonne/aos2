import React from 'react'
import Rx from 'rx'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Modal, Button } from 'react-bootstrap'
import Page from '../../components/page.js'
import DevicesTable from '../../components/devices/devices-table.js'
import IndexClass from '../../components/bases/index.class.js'
import { UpdateButton } from '../../components/buttons.js'
import DeviceDeleteDialog from '../../components/devices/device-delete-dialog.js'
import { fetchDevices, deleteDevice } from './devices.actions.js'

class Devices extends IndexClass {
	constructor(props){
		super(props)
		this.displayName = 'Devices'
		this.title = 'Equipos'
		this.pageTitle = <span><i className="fa fa-desktop lblue"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Equipos'}]

		this.updateState = 'devices'
		this.updateAction = this.props.fetchDevices
		this.deleteAction = this.props.deleteDevice
	}

	render(){
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="row">
					<div className="col-md-12">
						<DeviceDeleteDialog  showModal={this.state.showModal} closeModal={this.closeModal} confirmDel={this.confirmDel} />
						<UpdateButton onClick={this.forceUpdate} loading={this.props.devices.loading} />
						<Link to="/devices/create" className="pull-right">
							<Button bsStyle="success">
								<i className="fa fa-plus"></i>{' '}Nuevo Equipo
							</Button>
						</Link>
					</div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-lg-12">
						<DevicesTable  
							devices={this.props.devices.collection}
							onDelete={this.del}/>
					</div>
				</div>
			</Page>
		)
	}
}

function select (state){
	return {
		devices: state.devices
	}
}

export default connect(
	select,
	{
		fetchDevices,
		deleteDevice
	}
)(Devices)