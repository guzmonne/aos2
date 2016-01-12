import React from 'react'

import { thead } from './clients-table-thead.js'
import { Tr } from './clients-table-row.js'
import IndexTable from '../index-table.js'

export default ({clients, onDelete}) => {
	return (
		<IndexTable thead={thead} tr={Tr} collection={clients} onDelete={onDelete} />
	)
}