import React from 'react'

export function Tabs({style, tabComponent, children}) {
	return (
		<div className="container-fluid">
			<nav>
				<ul className="nav nav-tabs">
					{children}
				</ul>
			</nav>
			<div className="tab-body" style={style}>
				{tabComponent}
			</div>
		</div>
	)
}

export function Tab({name, active, children, onActivate}){
	const activeClass = (!!active) ? 'active' : '';
	const activate = () => onActivate(name)

	return (
		<li className={activeClass}>
			<a onClick={activate} className={activeClass}>
				{children}
			</a>
		</li>
	)
}

export function TabContainer ({style, tabs, activeTab, onActivate}) {
	const isTabActive = tabName => tabName === activeTab

	const _tabs = tabs.map(tab => (
		<Tab 	name={tab.name}
					onActivate={onActivate}
					active={isTabActive(tab.name)}
					key={tab.name}>
			{tab.txt}
		</Tab>
	));

	const tabComponent = tabs.filter(tab => isTabActive(tab.name))[0].component

	return <Tabs style={style} tabComponent={tabComponent}>{_tabs}</Tabs>

}