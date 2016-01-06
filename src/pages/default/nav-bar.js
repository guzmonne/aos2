import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import NavBarWidget from '../../components/nav-bar.widget.js'
import {logoutUser} from '../users/login.actions.js'
import {toggleNavBarMenu} from './main.layout.actions.js'

class NavBar extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'NavBar';
	}	

	render() {
		const {toggleNavBarMenu, logoutUser} = this.props
		const {isShowingNavBarMenu} = this.props.mainLayout
		const {username} = this.props.currentUser
		const defaultMenuClass = 'head-user dropdown pull-right'

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3 col-sm-4 col-xs-6">
						<h2>
							<i className="fa fa-dashboard lblue"></i>
							&nbsp;AOS
						</h2>
					</div>
					<div className="col-md-offset-6 col-md-3 hidden-sm hidden-xs">
						<div className={isShowingNavBarMenu ? defaultMenuClass + " open" : defaultMenuClass}>
							<a onClick={toggleNavBarMenu} href="javascript: void(0)" id="profile" data-toggle="dropdown" aria-expanded={isShowingNavBarMenu}>
								<i className="fa fa-user red"></i>
								{" " + username + " "}
								<i className="fa fa-caret-down red"></i>
							</a>
							<ul onMouseLeave={toggleNavBarMenu} className="dropdown-menu">
								<li>
									<Link to="configuration" params={{tab: 'profile'}}>Perfil</Link>
								</li>
								<li>
									<Link to="configuration" params={{tab: 'general'}}>Configuración</Link>
								</li>
								<li>
									<a href="users/login" onClick={logoutUser}>Cerrar Sesión</a>
								</li>
							</ul>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
		);
	}
}

NavBar.propTypes = {
	currentUser: React.PropTypes.object
}

function select (state) {
	return { 
		currentUser: state.currentUser,
		mainLayout: state.mainLayout
	}
}

export default connect(
	select,
	{
		logoutUser,
		toggleNavBarMenu
	}
)(NavBar)
