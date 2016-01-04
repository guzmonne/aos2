import React from 'react'

export default ({message}) => {
	return (
		<div className="form-element-error">
			<div className="message message-error">{message}</div>
		</div>
	)
}