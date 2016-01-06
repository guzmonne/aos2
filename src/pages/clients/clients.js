import React from 'react';
import Page from '../../components/page.js'
import ClientsTable from '../../components/clients/clients-table.js'

class Clients extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Clients';
    this.title = 'Clientes'
    this.pageTitle = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
    this.breadCrumbs = [{txt: 'Clients'}]
	}	

	render() {
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<h1>{this.title}</h1>
				<ClientsTable clients={[{id: 1, name: 'ALUCAR S.A.', identification: '123456789', contact: 'something', addresses: 'something else'}]}></ClientsTable>
			</Page>
		);
	}
}

export default Clients
