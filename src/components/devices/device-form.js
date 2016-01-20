import React from 'react'
import Rx from 'rx'
import _ from 'lodash'

class DeviceForm extends React.Component {
  constructor(props){
    super(props)

    this.formSubject = new Rx.Subject()

    this.categoriesOptions    = this.categoriesOptions.bind(this)
    this.subcategoriesOptions = this.subcategoriesOptions.bind(this)
    this.update               = this.update.bind(this)

    this.state = {
      subcategoriesOptions: [],
      device: Object.assign({}, this.props.device)
    }
  }

  componentWillMount(){
    this.formSubject.
      filter(update => !_.isUndefined(update)).
      do(update => console.log(update)).
      flatMap(update => {
        if (update.key === 'category')
          return Rx.Observable.just(update.value).
            map(categoryValue => (update.categories || this.props.categories).find(c => c.value === categoryValue) || []).
            map(category => category.subcategories || []).
            map(subcategories => ({
                subcategoriesOptions: this.subcategoriesOptions(subcategories),
                device: Object.assign({}, this.state.device, {
                  category: update.value,
                  subcategory: this.state.device.subcategory
                })
              })
            )
        else
          return Rx.Observable.just({
            device: Object.assign({}, this.state.device, {[update.key]: update.value})
          })
      }).
      do(stateFragment => console.log(stateFragment)).
      subscribe(
        stateFragment => this.setState(stateFragment),
        error => console.log(error)
      )
  }

  componentWillReceiveProps(newProps){
    this.formSubject.onNext({
      key: 'category',
      value: newProps.device.category,
      categories: newProps.categories
    })

  }

  componentWillUnmount(){
    this.formSubject.dispose()
  }

  categoriesOptions(categories){
    return [...categories].
      sort( (c1, c2) => c1.value.localeCompare(c2.value) ).
      map(c => <option key={c.id} value={c.value}>{c.value}</option>)
  }

  subcategoriesOptions(subcategories){
    return [...subcategories].
      sort( (s1, s2) => s1.value.localeCompare(s2.value) ).
      map(s => <option key={s.id} value={s.value}>{s.value}</option>)
  }

  update(key){
    this.formSubject.onNext({key, value: this.refs[key].value})
    //if (key === 'category')
    //  this.formSubject.onNext(this.refs.category.value)
    //this.setState({
    //  device: Object.assign({}, this.state.device, {[key]: this.refs[key].value}) 
    //})
  }

  render(){

    return (
      <form className="form-horizontal">

        <div className="form-group">
          <label className="control-label col-xs-2">Marca</label>
          <div className="col-xs-10">
            <input 
              placeholder="Marca"
              type="text"
              ref="brand"
              className="form-control"
              value={this.state.device.brand}
              onChange={() => this.update('brand')}/>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-xs-2">Categoría</label>
          <div className="col-xs-10">
            <select 
              onChange={() => this.update('category')}
              type="text"
              ref="category"
              className="form-control"
              value={this.state.device.category}
            >
              <option>--Seleccione una categoría--</option>
              {this.categoriesOptions(this.props.categories)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-xs-2">Subcategoría</label>
          <div className="col-xs-10">
            <select
              onChange={() => this.update('subcategory')}
              type="text"
              ref="subcategory"
              className="form-control"
              value={this.state.device.subcategory}
            >
              <option>--Seleccione una subcategoría--</option>
              {this.state.subcategoriesOptions}
            </select>
          </div>
        </div>
      </form>
    )
  }
}

export default DeviceForm