import React from 'react'

class Address extends React.Component {
	constructor(props) {
		super(props)
		this.displayName = 'Address'
		this.update = this.update.bind(this)
		this.getData = this.getData.bind(this)
		this.cleanData = this.cleanData.bind(this)
		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
		this.state = Object.assign({}, props.address)
	}

	componentWillReceiveProps(newProps){
		this.setState(newProps.contact)
	}

	getData() {}
}