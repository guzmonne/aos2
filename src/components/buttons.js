import React from 'react'

const loading = <i className="fa fa-spinner fa-spin"></i>
const buildHtml = (html, isLoading) => (!!isLoading) ? loading : html;

export function EditButton(props){
	const html = buildHtml(<span><i className="fa fa-pencil"></i>&nbsp;Editar</span>, props.loading)
	
	return 	<button {...props} className="button button-warning">
						{html}
					</button>
}

export function CancelButton(props){
	const html = buildHtml(<span><i className="fa fa-times"></i>&nbsp;Cancelar</span>, props.loading)
	
	return 	<button {...props} className="button button-neutral">
						{html}
					</button>
}

export function SaveButton(props){
	const html = buildHtml(<span><i className="fa fa-floppy-o"></i>&nbsp;Guardar</span>, props.loading)

	return 	<button {...props} className="button">
						{html}
					</button>
}
