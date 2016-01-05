import React from 'react';
import { connect } from 'react-redux'
import { restoreLoginSessionToken } from '../users/login.actions.js'
import { store } from '../../state/store'
import NavBar from './nav-bar.js'
import { showModalOverlay, hideModalOverlay } from './main.layout.actions.js'

class MainLayout extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'MainLayout';
	}

	componentWillMount(){
		store.dispatch(restoreLoginSessionToken())
	}

	render() {
		const overlay = (this.props.mainLayout.isShowingOverlay) ? 'overlay has-modal' : 'overlay'

		return (
			<div className={overlay}>
				<NavBar />
				{this.props.children}
			</div>
		);
	}
}

MainLayout.propTypes = {
	mainLayout: React.PropTypes.object
}

function select(state){
	return {
		mainLayout: state.mainLayout
	}
}

export default connect(
	select,
	{
		showModalOverlay,
		hideModalOverlay
	}
)(MainLayout)