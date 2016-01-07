import React from 'react'

export default class BaseClass extends React.Component {
	constructor(props){
		super(props)
		this.update = this.update.bind(this)
		this.getData = this.getData.bind(this)
		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
		this.focusOn = props.focusOn
		this.propToState = props.propToState
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
}