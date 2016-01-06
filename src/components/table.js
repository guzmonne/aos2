import React from 'react'

export default ({thead, tbody}) => {
	return (
		<div className="table-responsive">
			<table className="table table-hover table-striped">
				<thead>
					{thead}
				</thead>
				<tbody>
					{tbody}
				</tbody>
			</table>
		</div>
	)
}