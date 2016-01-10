import React from 'react';
import Rx from 'rx'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Page from '../../components/page.js'
import ClientsTable from '../../components/clients/clients-table.js'
import { Button } from 'react-bootstrap'
import { UpdateButton } from '../../components/buttons.js'
import { pushPath } from 'redux-simple-router'
import { fetchClients } from './clients.actions.js'

class Clients extends React.Component {
	constructor(props) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this)
    this.displayName = 'Clients';
    this.title = 'Clientes'
    this.pageTitle = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
    this.breadCrumbs = [{txt: 'Clients'}]
    this.updateSubject = new Rx.BehaviorSubject()
	}

	componentDidMount(){
		const {clients, fetchClients} = this.props
		const msSinceLastFetch = () => {
			return new Date().getTime() - clients.lastFetch.getTime()
		}

		this.updateSubject.
			throttle(1000).
			map(options => options ? options.forceUpdate : !clients.lastFetch).
			filter(forceUpdate => forceUpdate || msSinceLastFetch() > 60000).
			subscribe(
				() => fetchClients(),
				err => console.error(e),
				() => console.log('Completed Clients UpdateSubject')
			)
	}

	componentWillUnmount(){
		this.updateSubject.onCompleted()
	}

	forceUpdate(e){
		e.preventDefault()

		this.updateSubject.
			onNext({forceUpdate: true})
	}

	render() {
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="row">
					<div className="col-md-12">
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
						<ClientsTable clients={this.props.clients.collection} />
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
		pushPath,
		fetchClients
	}
)(Clients)
