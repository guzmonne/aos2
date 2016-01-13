import React from 'react'
import Rx from 'rx'
import Parse from 'parse'
import Helper from '../../models/helper.model.js'
import { connect } from 'react-redux'
import Table from '../../components/table.js'
import {thead} from './general-device-categories-thead.js'
import { BtnRowToolbar, AddRowButton } from '../../components/buttons.js'
import Tr from './general-device-categories-row.js'
import _ from 'lodash'

class GeneralConfig extends React.Component {
	constructor(props){
		super(props)

		this.displayName = 'GeneralConfig'

		this.del = this.del.bind(this)
		this.deviceCategories = []
		this.state = {
			families: []
		}

	}

	componentWillMount(){
		const query = new Parse.Query(Helper);
		const self = this

		Rx.Observable.
		  fromPromise( (new Parse.Query(Helper)).equalTo('key', 'family').find() ).
		  flatMap(families => families.map( family => {
		  	return Rx.Observable.fromPromise( (new Parse.Query(Helper)).equalTo('parent', family.id).find() ).
          map( subfamilies => {
            return {
              value: family.get('value'),
              subfamilies: subfamilies
            } 
          })}
        )
		  ).
		  mergeAll().
		  reduce((families, family) => [...families, family] , []).
		  subscribe(
		    (results) => { self.setState({ families: results }) },
		    (error) => console.error('error ' + error),
		    () => console.log('onCompleted')
		  )
	}

	del(e){
		console.log(e)
	}

	render(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-6">

						<h4 style={ {marginBottom: '10px'} }>
							<strong>
								Categorias de Equipos
							</strong>
						</h4>

						{this.state.families.length === 0 ? 
							<h2><i className="fa fa-spinner fa-spin"></i>{' Loading...'}</h2> :
							<table className="table table-hover table-striped">
								<thead>
									{thead}
								</thead>
								<tbody>
									{this.state.families.map( (family, i) => {
										return (
											<Tr key={i} family={family.value} subfamilies={family.subfamilies} />
										)
									} )}
								</tbody>
							</table>
						}


					</div>
				</div>
			</div>
		)
	}
}

export default GeneralConfig