import React from 'react';
import { connect } from 'react-redux'
import { restoreLoginSessionToken } from '../users/login.actions.js'
import { store } from '../../state/store'
import NavBar from './nav-bar.js'
import Sidebar from './side-bar.js'
import { hideAll, showModalOverlay, hideModalOverlay } from './main.layout.actions.js'

class MainLayout extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'MainLayout';
	}

	componentWillMount(){
		store.dispatch(restoreLoginSessionToken())
	}

	render() {
		const {hideAll} = this.props
		const {isShowingOverlay, isShowingNavBarMenu} = this.props.mainLayout
		const modalOpen = isShowingOverlay ? 'outer modal-open' : 'outer'
		const {username} = this.props.currentUser

		const onHideAll = (e) => {
			console.log(e.target)
			if (isShowingOverlay || isShowingNavBarMenu)
				hideAll()
		}

		const overlay = <div className="modal-backdrop fade in"></div>

		return (
			<div className={modalOpen} >
				<div className="sidebar">
					<Sidebar username={username}/>
				</div>
				<div className="mainbar">
					<div className="main-head">
						<NavBar />
					</div>
					<div className="main-content">
						{this.props.children}
					</div>
				</div>
				{isShowingOverlay ? overlay : null}
			</div>
		);
	}
}

MainLayout.propTypes = {
	mainLayout: React.PropTypes.object
}

function select(state){
	return {
		mainLayout: state.mainLayout,
		currentUser: state.currentUser
	}
}

export default connect(
	select,
	{
		hideAll
	}
)(MainLayout)