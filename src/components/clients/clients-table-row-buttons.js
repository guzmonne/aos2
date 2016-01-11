import React from 'react'
import { Link } from 'react-router'
import { OverlayTrigger } from 'react-bootstrap'

/* Buttons */
export const EditButton = ({tooltip, id}) => {
	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			<Link to={`/clients/edit/${id}`} className="btn btn-warning btn-with-sup btn-outline">
				<i className="fa fa-pencil"></i>
			</Link>
		</OverlayTrigger>
	)
}
export const NewServiceRequestButton = ({tooltip}) => {
	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			<button className="btn btn-success btn-with-sup btn-outline">
				<i className="fa fa-clipboard"></i>
				<sup><i className="fa fa-plus"></i></sup>
			</button>
		</OverlayTrigger>
	)
}

export const DeleteButton = ({tooltip, onDelete}) => {
	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			<button onClick={onDelete} className="btn btn-danger btn-with-sup btn-outline">
				<i className="fa fa-trash"></i>
			</button>
		</OverlayTrigger>
	)
}