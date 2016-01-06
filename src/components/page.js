import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router'

const defaultCrumbs = [ {txt: 'DefaultLink'} ]

export default ({title, breadCrumbs, children}) => {
	return (
		<div className="container">
			<div className="page-content">
				<div className="single-head">
					<h3 className="pull-left">
						{title || <div><i className="fa fa-desktop purple"></i>&nbsp;Título</div>}
					</h3>
					<div className="pull-right">
						<BreadCrumbs crumbs={breadCrumbs || defaultCrumbs}/>
					</div>
					<div className="clearfix"></div>
				</div>
				{children}
			</div>
		</div>
	)
}

export const BreadCrumbs = ({crumbs}) => {
	const clone = crumbs.slice(0);
	const last = clone.splice(clone.length - 1, 1)[0]
	const Crumb = ({to, txt, last}) => {
		return (
			<span>
				{!last && <Link to={to || "#"}>{txt}</Link>}
				{last ? txt : ' / '}
			</span>
		)
	}

	return (
		<div className="breads">
			<strong>Nav</strong>
			{" : "}
			<Crumb txt="Dashboard" to="/"/>
			{ clone.map((crumb, i) => <Crumb key={i} to={crumb.to} txt={crumb.txt}/>) }
			<Crumb txt={last.txt} last={true} />
		</div>
	)
} 

BreadCrumbs.propTypes = {
	crumbs: React.PropTypes.array.isRequired
}