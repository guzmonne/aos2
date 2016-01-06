import React from 'react'

export default ({message}) => {
	return (
		<div className="alert alert-danger">
			<div className="message message-error">{message}</div>
		</div>
	)
}