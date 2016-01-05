import React from 'react'

const loading = "fa fa-spinner fa-spin"

export function EditButton(props){
	return 	<button {...props} className={"button button-warning " + props.className}>
						<i className={props.loading ? loading : "fa fa-pencil"}></i>&nbsp;Editar
					</button>
}

export function CancelButton(props){
	return 	<button {...props} className={"button button-neutral " + props.className}>
						<i className={props.loading ? loading : "fa fa-times"}></i>&nbsp;Cancelar
					</button>
}

export function SaveButton(props){
	return 	<button {...props} className={"button " + props.className}>
						<i className={props.loading ? loading : "fa fa-floppy-o"}></i>&nbsp;Guardar
					</button>
}

export function UpdateButton (props){
	return	<button {...props} className={"button " + props.className}>
						<i className={props.loading ? loading : "fa fa-refresh"}></i>&nbsp;Actualizar
					</button>
}

export function CreateButton (props){
	return 	<button {...props} className={"button button-approve " + props.className}>
						<i className="fa fa-plus"></i>&nbsp;{props.children || 'Nuevo'}
					</button>
}