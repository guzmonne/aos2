import React from 'react'
import Table from './table.js'

const IndexTable = ({thead, tr, collection, onDelete}) => {
	const Tr = tr
	const tbody = collection.map((model, index) => {
		return <Tr key={model.id} model={model} onDelete={onDelete}/>
	})

	return (
		<Table thead={thead} tbody={tbody}/>
	)
}

export default IndexTable