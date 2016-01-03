import React from 'react';
import { connect } from 'react-redux'
import { store } from '../../state/store.js'
import { Tabs, Tab, TabContainer } from '../../components/tabs.js'
import { changeConfigurationTab } from './configuration.actions.js'

class Configuration extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Configuration';
    this.isTabActive = this.isTabActive.bind(this);
	}	

	isTabActive(tabName){
		return this.props.configuration.tab === tabName
	}

	render() {
		const tabName = this.props.configuration.tab
		const changeConfigurationTab = this.props.changeConfigurationTab

		const tabsArray = [
			{name: 'general', txt: 'General', component: <div>General</div> },
			{name: 'account', txt: 'Cuenta', component: <div>Cuenta</div> },
			{name: 'users', txt: 'Usuarios', component: <div>Usuarios</div> }
		];

		return (
			<TabContainer tabs={tabsArray} activeTab={tabName} onActivate={changeConfigurationTab}/>
		)
	}
}

Configuration.propTypes = {
	configuration: React.PropTypes.object
}

function select (state){
	return { configuration: state.configuration }
}

export default connect(
	select, 
	{
		changeConfigurationTab
	}
)(Configuration)
