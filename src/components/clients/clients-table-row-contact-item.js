import React from 'react'

/* Contact */
export const ContactItem = ({contact}) =>	{
	return (
		<tr className="text-primary-on-hover">
			<td style={{width: '20px'}}>
				{contact.type === 'phone' ?
					<i className="fa fa-phone"></i> :
					<i className="fa fa-envelope"></i>
				}
				&nbsp;&nbsp;
			</td>
			<td style={{width: '20%'}}>
				<strong>{' ' + contact.description + ':'}</strong>
			</td>
			<td>
				&nbsp;&nbsp;
				{contact.value}
			</td>
		</tr>
	)
}