import React from 'react';
import { connect } from 'react-redux'
import Page from '../../components/page.js'
import ClientsTable from '../../components/clients/clients-table.js'
import {Button} from 'react-bootstrap'
import { pushPath } from 'redux-simple-router'

class Clients extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Clients';
    this.title = 'Clientes'
    this.pageTitle = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
    this.breadCrumbs = [{txt: 'Clients'}]
	}	

	render() {
		const goToCreateNewClient = (e) => {
			e.preventDefault()
			this.props.pushPath("clients/create")
		}

		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<Button bsStyle="success" onClick={goToCreateNewClient}>
					<i className="fa fa-plus"></i>{' '}Nuevo Cliente
				</Button>
				<hr/>
				<ClientsTable clients={[{id: 1, name: 'ALUCAR S.A.', identification: '123456789', contact: 'something', addresses: 'something else'}]}></ClientsTable>
			</Page>
		);
	}
}

export default connect(
	null, 
	{
		pushPath
	}
)(Clients)
