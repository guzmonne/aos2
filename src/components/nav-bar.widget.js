import React from 'react'
import {Link} from 'react-router'

export default ({username, onLogout}) => {
	username || (username = "ChangeMe")

	return (
		<nav className="top-nav top-nav-light cf">
			<input type="checkbox" id="menu-toggle" className="menu-toggle"/>
			<label htmlFor="menu-toggle">
				<a className="button button-outlined">
					<i className="fa fa-bars"></i>
					&nbsp;
					MENU
				</a>
			</label>

			<ul className="list-unstyled list-inline cf">
				<li className="app-name">
					<a>AOS</a>
				</li>
				<li className="has-dropdown">
					<a>Clientes</a>
					<div className="icon-arrow-down"></div>
					<ul className="list-unstyled dropdown cf">
						<li>
							<a>Lista</a>
						</li>
						<li>
							<a>Nuevo</a>
						</li>
						<li>
							<a>Reportes</a>
						</li>
					</ul>
				</li>
				<li className="float-right has-dropdown">
					<a>
						<i className="fa fa-user"></i>
						&nbsp;
						{username}
					</a>
					<div className="icon-arrow-down"></div>
					<ul className="list-unstyled dropdown cf">
						<li>
							<a onClick={onLogout}>Logout</a>
						</li>
					</ul>
				</li>
				<li className="float-right">
					<Link to="configuration">
						<i className="fa fa-cog"></i>
					</Link>
				</li>
			</ul>
		</nav>	
	);
}