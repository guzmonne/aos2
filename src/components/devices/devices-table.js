import React from 'react'

import { thead } from './devices-table-thead.js'
import { Tr } from './devices-table-row.js'
import IndexTable from '../index-table.js'

export default ({devices, onDelete}) => {
	return (
		<IndexTable thead={thead} tr={Tr} collection={devices} onDelete={onDelete} />
	)
}