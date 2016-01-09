import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Page from '../../components/page.js'

class Configuration extends React.Component {
	constructor(props) {
    super(props);
		this.displayName = 'Configuration';
		this.isActive    = this.isActive.bind(this)
		this.breadCrumbs = [{txt: 'Configuración'}]
	}	

	isActive(tabName){
		const currentTab = this.props.routing.path.replace(/\/|configuration/g, '')
		console.log(currentTab)
		return currentTab === tabName
	}

	render() {
		const changeConfigurationTab = this.props.changeConfigurationTab

		return (
			<Page title={<span><i className="fa fa-cog"></i>Configuración</span>} breadCrumbs={this.breadCrumbs}>
				<div className="nav">
					<ul className="nav nav-tabs">
						<li className={this.isActive('') && 'active'}>
							<Link to="/configuration">General</Link>
						</li>
						<li className={this.isActive('account') && 'active'}>
							<Link to="/configuration/account">Cuenta</Link>
						</li>
						<li className={this.isActive('users') && 'active'}>
							<Link to="/configuration/users">Usuarios</Link>
						</li>
					</ul>
				</div>
				<div className="tab-body">
					{this.props.children}
				</div>
			</Page>
		)
	}
}

Configuration.propTypes = {
	configuration: React.PropTypes.object
}

function select (state){
	return { routing: state.routing }
}

export default connect(
	select, {}
)(Configuration)
