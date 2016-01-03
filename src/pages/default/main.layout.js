import React from 'react';
import { connect } from 'react-redux'
import { restoreLoginSessionToken } from '../users/login.actions.js'
import { store } from '../../state/store'
import NavBar from './nav-bar.js'

class MainLayout extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'MainLayout';
	}

	componentWillMount(){
		store.dispatch(restoreLoginSessionToken())
	}

	render() {
		return (
			<div>
				<NavBar />
				{this.props.children}
			</div>
		);
	}
}

export default MainLayout