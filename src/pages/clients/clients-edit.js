import React from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page.js'
import ClientsForm from '../../components/clients/clients-form.js'
import { fetchClient } from './clients.actions.js'

class ClientsEdit extends React.Component {
	constructor(props){
		super(props)
		this.displayName = 'ClientsEdit'
		this.title = 'Editar Cliente'
		this.pageTitle = <span><i className="fa fa-users orange"></i>{' ' + this.title}</span>
		this.loadingPageTitle = <span><i className="fa fa-spinner fa-spin orange"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Clientes', to: '/clients'}, {txt: 'Editar'}]
	}

	componentDidMount(){
		this.props.fetchClient(this.props.params.id)
	}

	submit(data){
	}

	render(){
		const {loading} = this.props.clients

		const clientsForm = <ClientsForm  loading={this.props.clients.loading}
																			onSubmit={this.submit}
																			client={this.props.clients.activeClient.attributes} />

		return (
			<Page title={loading ? this.loadingPageTitle : this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="container">
					{loading ? <h3><i className="fa fa-spinner fa-spin orange"></i>{' Loading...'}</h3> : clientsForm}
				</div>
			</Page>
		)
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
		fetchClient
	}
)(ClientsEdit)