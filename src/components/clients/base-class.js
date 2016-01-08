import React from 'react'

export default class BaseClass extends React.Component {
	constructor(props){
		super(props)
		this.update = this.update.bind(this)
		this.getData = this.getData.bind(this)
		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
		this.label = this.label.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.focusOn = ''
	}

	onKeyDown(e){
		if (e.keyCode !== 13) return
		this.add(e)
	}

	getData(){}

	update(e){
		e.preventDefault(); 
		this.props.onChange(this.getData())
	}

	add(e) {
		e.preventDefault()
		this.props.onAdd(this.getData())
		this.props.onChange()
		this.refs[this.focusOn].focus()
	}

	remove(e){
		e.preventDefault()
		this.props.onRemove()
		this.props.onChange()
	}

	label(label){
		return <label className="control-label col-xs-2">{label || "label"}</label>
	}
}