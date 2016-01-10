import React from 'react';
import { connect } from 'react-redux'
import { createClient, resetActiveClient } from './clients.actions.js'
import Page from '../../components/page.js'
import ClientsForm from '../../components/clients/clients-form.js'

class ClientsCreate extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'ClientsCreate';
		this.title       = 'Crear Nuevo Cliente'
		this.pageTitle   = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Clientes', to: '/clients'}, {txt: 'Nuevo'}]
		this.submit      = this.submit.bind(this)
	}

	componentWillMount(){
		this.props.resetActiveClient()
	}

	submit(data){
		if (!data) return
		this.props.createClient(data)
	}

	render() {
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="container">
					<ClientsForm 	loading={this.props.clients.loading}
												onSubmit={this.submit}
												client={this.props.clients.activeClient.attributes}></ClientsForm>
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
		createClient,
		resetActiveClient
	}
)(ClientsCreate)