import React from 'react'
import Rx from 'rx'
import _ from 'lodash'

export default class IndexClass extends React.Component {
	constructor(props){
		super(props)

		this.update        = this.update.bind(this)
		this.forceUpdate   = this.forceUpdate.bind(this)
		
		this.updateSubject = new Rx.BehaviorSubject()
		this.updateTime    = 60000
		this.throttleTime  = 1000

		this.del         = this.del.bind(this)
		this.confirmDel  = this.confirmDel.bind(this)
		this.closeModal  = this.closeModal.bind(this)

    this.state = {showModal: false, clientToBeDelId: null}
	}

	closeModal(e) {
		if (e) e.preventDefault()

		this.setState({ showModal: false, idToBeDel: null })
	}

	del(parseModel){
		this.setState({ showModal: true, idToBeDel: parseModel.id })
	}

	confirmDel(e){
		if (e) e.preventDefault()

		if (!this.state.idToBeDel) return

		this.deleteAction(this.state.idToBeDel)
		this.closeModal()
	}

	update(updateState, updateAction){
		const state = this.props[updateState]
		
		const msSinceLastFetch = () => new Date().getTime() - state.lastFetch.getTime()
		
		this.updateSubject.
			throttle(this.throttleTime).
			map(opts => (opts && opts.forceUpdate) ? opts.forceUpdate : !state.lastFetch).
			filter(forceUpdate => forceUpdate || msSinceLastFetch() > this.updateTime).
			subscribe(
				() => updateAction(),
				(err) => console.error(err)
			)
	}

	componentDidMount(){
		this.update(this.updateState, this.updateAction)
	}

	componentWillUnmount(){
		this.updateSubject.onCompleted()
	}

	forceUpdate(e){
		e.preventDefault()

		this.updateSubject.onNext({ forceUpdate: true })
	}
}