import React from 'react';
import { connect } from 'react-redux'
import { createClient } from './clients.actions.js'
import Page from '../../components/page.js'
import ClientsForm from '../../components/clients/clients-form.js'

class ClientsCreate extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'ClientsCreate';
		this.title       = 'Crear Nuevo Cliente'
		this.pageTitle   = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Clients', to: '/clients'}, {txt: 'Nuevo'}]
		this.client      = {name: '', contact: [], identification: '', addresses: []}
	}

	render() {
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="container">
					<ClientsForm onSubmit={data => console.log(data)} client={this.client}></ClientsForm>
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
		createClient
	}
)(ClientsCreate)