import React from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page.js'
import ClientsForm from '../../components/clients/clients-form.js'
import { fetchClient, updateClient } from './clients.actions.js'

class ClientsEdit extends React.Component {
	constructor(props){
		super(props)
		this.displayName = 'ClientsEdit'
		this.title = 'Editar Cliente'
		this.breadCrumbs = [{txt: 'Clientes', to: '/clients'}, {txt: 'Editar'}]
		this.submit = this.submit.bind(this)
	}

	componentDidMount(){
		this.props.fetchClient(this.props.params.id)
	}

	submit(data){
		if (!data) return
		this.props.updateClient(data)
	}

	render(){
		const pageTitle = <span><i className="fa fa-users orange"></i>{' ' + this.title + ': ' + this.props.clients.activeClient.get('name')}</span>
		const loadingPageTitle = <span><i className="fa fa-spinner fa-spin orange"></i>{' ' + this.title}</span>

		const {loading} = this.props.clients

		const clientsForm = <ClientsForm  loading={this.props.clients.loading}
																			onSubmit={this.submit}
																			client={this.props.clients.activeClient.attributes} />

		return (
			<Page title={loading ? loadingPageTitle : pageTitle} breadCrumbs={this.breadCrumbs}>
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
		fetchClient,
		updateClient
	}
)(ClientsEdit)