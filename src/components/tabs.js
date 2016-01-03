import React from 'react'

export function Tabs({tabComponent, children}) {
	return (
		<div className="container container-fluid">
			<nav>
				<ul className="list-unstyled list-inline tabs">
					{children}
				</ul>
			</nav>
			<div className="tab-body">
				{tabComponent}
			</div>
		</div>
	)
}

export function Tab({name, active, children, onActivate}){
	const activeClass = (!!active) ? 'current-item' : '';
	const activate = () => onActivate(name)

	return (
		<li className={activeClass}>
			<a onClick={activate} className={activeClass}>
				{children}
			</a>
		</li>
	)
}

export function TabContainer ({tabs, activeTab, onActivate}) {
	console.log(activeTab)

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

	return <Tabs tabComponent={tabComponent}>{_tabs}</Tabs>

}