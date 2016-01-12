import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import ClientsTable from '../../components/clients/clients-table.js'
import { UpdateButton } from '../../components/buttons.js'
import { fetchClients, deleteClient } from './clients.actions.js'
import IndexClass from '../../components/bases/index.class.js'
import ClientDeleteDialog from '../../components/clients/client-delete-dialog.js'
import Page from '../../components/page.js'

class Clients extends IndexClass {
	constructor(props) {
    super(props);
		this.displayName = 'Clients';
		this.title       = 'Clientes'
		this.pageTitle   = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Clients'}]
    
    this.updateState = 'clients'		
		this.updateAction = this.props.fetchClients
		this.deleteAction = this.props.deleteClient
	}

	render() {
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="row">
					<div className="col-md-12">
						<ClientDeleteDialog  showModal={this.state.showModal} closeModal={this.closeModal} confirmDel={this.confirmDel} />
						<UpdateButton onClick={this.forceUpdate} loading={this.props.clients.loading}/>
						<Link to="/clients/create" className="pull-right">
							<Button bsStyle="success">
								<i className="fa fa-plus"></i>{' '}Nuevo Cliente
							</Button>
						</Link>
					</div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-lg-12">
						<ClientsTable clients={this.props.clients.collection} onDelete={this.del}/>
					</div>
				</div>
			</Page>
		);
	}
}

function select(state){
	return {
		clients: state.clients
	}
}

export default connect(
	select, 
	{
		fetchClients,
		deleteClient
	}
)(Clients)
