import React from 'react';
import { connect } from 'react-redux'
import DashboardWidget from '../../components/dashboard.widget.js'

class Dashboard extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'Dashboard';
	}	

	render() {
		return (
			<DashboardWidget username={this.props.currentUser.username}/>
		);
	}
}

Dashboard.propTypes = {
	currentUser: React.PropTypes.object
}

function select(state){
	return {
		currentUser: state.currentUser
	}
}

export default connect(
	select,
	{}
)(Dashboard)
