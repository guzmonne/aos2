import React from 'react';
import { connect } from 'react-redux'
import NavBarWidget from '../../components/nav-bar.widget.js'
import {logoutUser} from '../users/login.actions.js'

class NavBar extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'NavBar';
	}	

	render() {
		return (
			<NavBarWidget 
				username={this.props.currentUser.username}
				onLogout={this.props.logoutUser}/>
		);
	}
}

NavBar.propTypes = {
	currentUser: React.PropTypes.object
}

function select (state) {
	return { 
		currentUser: state.currentUser
	}
}

export default connect(
	select,
	{
		logoutUser
	}
)(NavBar)
