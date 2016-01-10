import React from 'react'

/* Addresses */
export const AddressItem = ({address}) => {
	return (
		<div className="text-primary-on-hover">
			<i className="fa fa-home"></i>
			<strong>{' ' + address.street}</strong>
			{address.location ? <br/> : null}
			{address.location ? address.location : null}
			{address.state ? ', ' + address.state : null}
		</div> 
	)
}