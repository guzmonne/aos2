import React from 'react'
import {Link} from 'react-router' 

const sidebarLinks = [
	{
		to: 'service_requests',
		txt: 'Ordenes de Servicio',
		icon: 'fa fa-clipboard'
	},
	{
		to: 'clients',
		txt: 'Clientes',
		icon: 'fa fa-users'
	},
	{
		to: 'devices',
		txt: 'Equipos',
		icon: 'fa fa-desktop'
	}
]

export default ({username}) => {
	return (
		<div className="sidey">
			<Logo username={username || ""}/>
			<SideBarDropdown />
			<SideNav links={sidebarLinks}/>
		</div>
	)
}

const Logo = ({username}) => {
	return (
		<div className="logo">
			<h1>
				<Link to="/">
					<i className="fa fa-code br-red"></i>
					<text>{" " + username}</text>
					{' Welcome '}
				</Link>
			</h1>
		</div>
	)
}

Logo.propTypes = {
	username: React.PropTypes.string.isRequired
}

const SideBarDropdown = () => {
	return (
		<div className="sidebar-dropdown">
			<a className="br-red">
				<i className="fa fa-bars"></i>
			</a>
		</div>
	)
}

const SideNav = ({links}) => {
	return (
		<div className="side-nav">
			<div className="side-nav-block">
				<h4>Menu</h4>
				<ul className="list-unstyled">
					{links.map((link, i) => <SideNavMenuItem key={i} link={link} />)}
				</ul>
			</div>
			<div className="side-nav-block">
				<h4>Administración</h4>
				<ul className="list-unstyled">
					<SideNavMenuItem link={{ to: 'configuration', txt: 'Configuración', icon: 'fa fa-cog' }}/>
				</ul>
			</div>
		</div>
	)
}

SideNav.propTypes = {
	links: React.PropTypes.array.isRequired
}

const SideNavMenuItem = ({link}) => {
	return (
		<li>
			<Link to={link.to}>
				<i className={link.icon || "fa fa-desktop"}></i>
				{link.txt}
			</Link>
		</li>
	)
}

SideNavMenuItem.propTypes = {
	link: React.PropTypes.object.isRequired
}

