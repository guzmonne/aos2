import React from 'react';
import Rx from 'rx'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Modal, Button } from 'react-bootstrap'
import Page from '../../components/page.js'
import ClientsTable from '../../components/clients/clients-table.js'
import { UpdateButton } from '../../components/buttons.js'
import { fetchClients, deleteClient } from './clients.actions.js'

class Clients extends React.Component {
	constructor(props) {
    super(props);
		this.displayName = 'Clients';
		this.title       = 'Clientes'
		this.pageTitle   = <span><i className="fa fa-users purple"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Clients'}]
    
    this.updateSubject = new Rx.BehaviorSubject()
		
		this.del         = this.del.bind(this)
		this.confirmDel  = this.confirmDel.bind(this)
		this.closeModal  = this.closeModal.bind(this)
		this.forceUpdate = this.forceUpdate.bind(this)

    this.state = {showModal: false, clientToBeDelId: null}
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

	closeModal(e){
		if (e)
			e.preventDefault()
		this.setState({
			showModal: false,
			clientToBeDelId: null
		})
	}

	del(user){
		this.setState({
			showModal: true,
			clientToBeDelId: user.id
		})
	}

	confirmDel(e){
		e.preventDefault()
		if (!this.state.clientToBeDelId) return
		this.props.deleteClient(this.state.clientToBeDelId)
		this.closeModal()
	}

	render() {
		return (
			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<Modal show={this.state.showModal} onHide={this.closeModal} backdrop={true}>
					<Modal.Header closeButton>
		        <Modal.Title>
		        	<span className="text-warning">
			        	<i className="fa fa-exclamation-triangle"></i>
			        	{' '}
			        	¡Atención!
		        	</span>
	        	</Modal.Title>
		      </Modal.Header>
					<Modal.Body>
						<p className="text-center">¿Esta seguro que desea eliminar este cliente?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="default" onClick={this.closeModal}>
							Cancelar
						</Button>
						<div className="pull-left">
							<Button bsStyle="primary" onClick={this.confirmDel}>
								Aceptar
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
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
