import React from 'react'

/* Contact */
export const ContactItem = ({contact}) =>	{
	return (
		<div className="text-primary-on-hover">
			{contact.type === 'phone' ?
				<i className="fa fa-phone"></i> :
				<i className="fa fa-envelope"></i>
			}
			<strong>{' ' + contact.description}</strong>
			<br/>
			{contact.value}
		</div>
	)
}