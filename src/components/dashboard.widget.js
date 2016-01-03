import React from 'react';

export default (props) => {
	return (
		<div className="grid-flex-container">
			<div className="grid-flex-cell">
				<h1>
					<span className="text-primary">
						Hello {props.username}!
					</span>
					<br/>
					<small>
						Welcome to AOS
					</small>
				</h1>
			</div>
		</div>
	);
}