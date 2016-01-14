import React from 'react'
import { editTooltip, newServiceRequestTooltip, deleteTooltip } from './tooltips.js'
import { OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router'

const loading = "fa fa-spinner fa-spin"

export function EyeRowButton() {
	return (
		<button className="btn btn-primary btn-with-sup btn-outline">
			<i className="fa fa-eye"></i>
		</button>
	)
}


export function AddRowButton(props) {
	return (
		<button {...props} className="btn btn-success btn-with-sup btn-outline">
			<i className="fa fa-plus"></i>
		</button>
	)
}

export function EditRowButton({id, to}) {
	return (
		<OverlayTrigger placement="top" overlay={editTooltip}>
			<Link to={to} className="btn btn-warning btn-with-sup btn-outline">
				<i className="fa fa-pencil"></i>
			</Link>
		</OverlayTrigger>
	)
}

export function NewServiceRequestRowButton (){
	return (
		<OverlayTrigger placement="top" overlay={newServiceRequestTooltip}>
			<button className="btn btn-success btn-with-sup btn-outline">
				<i className="fa fa-clipboard"></i>
				<sup><i className="fa fa-plus"></i></sup>
			</button>
		</OverlayTrigger>
	)
}

export function DeleteRowButton({onDelete}){
	return (
		<OverlayTrigger placement="top" overlay={deleteTooltip}>
			<button onClick={onDelete} className="btn btn-danger btn-with-sup btn-outline">
				<i className="fa fa-trash"></i>
			</button>
		</OverlayTrigger>
	)
}

export function EditButton(props){
	return 	<button {...props} className={"btn btn-warning " + props.className} disabled={props.loading}>
						<i className={props.loading ? loading : "fa fa-pencil"}></i>&nbsp;Editar
					</button>
}

export function CancelButton(props){
	return 	<button {...props} className={"btn btn-default " + props.className} disabled={props.loading}>
						<i className={props.loading ? loading : "fa fa-times"}></i>&nbsp;Cancelar
					</button>
}

export function SaveButton(props){
	return 	<button {...props} className={"btn btn-primary " + props.className} disabled={props.loading}>
						<i className={props.loading ? loading : "fa fa-floppy-o"}></i>&nbsp;Guardar
					</button>
}

export function UpdateButton (props){
	return	<button {...props} className={"btn btn-primary " + props.className} disabled={props.loading}>
						<i className={props.loading ? loading : "fa fa-refresh"}></i>&nbsp;Actualizar
					</button>
}

export function CreateButton (props){
	return 	<button {...props} className={"btn btn-success " + props.className} disabled={props.loading}>
						<i className="fa fa-plus"></i>&nbsp;{props.children || 'Nuevo'}
					</button>
}

export function AddButton (props) {
	return 	<div className="col-xs-1">
						<button {...props} tabIndex="-1" className="btn btn-success btn-outline btn-sm btn-block" disabled={props.loading}>
							<i className="fa fa-plus"></i>
						</button>
					</div>
}

export function RemoveButton(props){
	return	<div className="col-xs-1">
						<button {...props} tabIndex="-1" className="btn btn-danger btn-outline btn-sm btn-block" disabled={props.loading}>
							<i className="fa fa-minus"></i>
						</button>
					</div>
}

export function BtnRowToolbar({buttons}){
	return (
		<div style={{display: 'inline-block'}} className="btn-toolbar btn-center">
			{buttons.map((b, i) => {
				return (
					<div key={i} className="btn-group btn-group-xs">
						{b}
					</div>
				)
			})}
		</div>
	)
}

BtnRowToolbar.propTypes = {
	buttons: React.PropTypes.array.isRequired
}