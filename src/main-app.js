import React from 'react';
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './counter.actions.js'


class MainApp extends React.Component {
	render() {
		return (
			<div>
				<h1>Counter Example:</h1>
				<h3>{this.props.counter}</h3>
				<button className="button" onClick={() => this.props.incrementCounter(1)}>Increment</button>
				{' '}
				<button className="button" onClick={() => this.props.decrementCounter(1)}>Decrement</button>
			</div>
		);
	}
}

MainApp.propTypes = {
	counter: React.PropTypes.number
}

function select(state){
	return {
		counter: state.counter
	}
}

export default connect(
	select, 
	{
		decrementCounter,
		incrementCounter
	}
)(MainApp);