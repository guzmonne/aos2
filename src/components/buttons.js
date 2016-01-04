import React from 'react'

const loading = <i className="fa fa-spinner fa-spin"></i>

export function EditButton(props){
	return 	<button {...props} className="button button-warning">
						{props.loading ? loading : <span><i className="fa fa-pencil"></i>&nbsp;Editar</span>}
					</button>
}

export function CancelButton(props){
	return 	<button {...props} className="button button-neutral">
						{props.loading ? loading : <span><i className="fa fa-times"></i>&nbsp;Cancelar</span>}
					</button>
}

export function SaveButton(props){
	return 	<button {...props} className="button">
						{props.loading ? loading : <span><i className="fa fa-floppy-o"></i>&nbsp;Guardar</span>}
					</button>
}

export function UpdateButton (props){
	return	<button {...props} className="button">
						{props.loading ?  loading : 'Actualizar'}
					</button>
}