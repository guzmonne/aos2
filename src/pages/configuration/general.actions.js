import {TOGGLE_DEVICE_CATEGORY_SELECTION, DELETE_DEVICE_CATEGORY_OPTIMISTICALLY, DELETE_DEVICE_CATEGORY_SUCCESS, DELETE_DEVICE_CATEGORY_ERROR, CREATING_DEVICE_CATEGORY, TOGGLE_DEVICE_CATEGORY_SUCCESS, TOGGLE_DEVICE_CATEGORY_ERROR, CREATE_DEVICE_CATEGORY_SUCCESS, CREATE_DEVICE_CATEGORY_ERROR, CREATE_DEVICE_SUBCATEGORY_SUCCESS, CREATE_DEVICE_SUBCATEGORY_ERROR, FETCHING_DEVICE_CATEGORY, FETCH_DEVICE_CATEGORY_SUCCESS, FETCH_DEVICE_CATEGORY_ERROR} from '../../state/action-types.js'
import Rx from 'rx'
import Parse from 'parse'
import _ from 'lodash'
import Helper from '../../models/helper.model.js'

export function deleteDeviceCategoryHelpers(){
	return (dispatch, getState) => {
		const categories = getState().general.categories.filter(c => c.selected)
		const subcategories = [].concat(...categories.map(c => c.subcategories))

		console.log([...categories, ...subcategories])

		dispatch(deleteDeviceCategoryHelpersOptimistically(getState().general.categories.
			filter(c => !c.selected)))

		Rx.Observable.
			fromArray( [...categories, ...subcategories] ).
			map(category => Rx.Observable.fromPromise( (new Helper({id: category.id})).destroy() ) ).
			mergeAll().
			subscribe(
				result => dispatch(deleteDeviceCategoryHelpersSuccess(result)),
				error  => dispatch(deleteDeviceCategoryHelpersError(error))
			)
	} 
}

export function toggleDeviceSubcategoryHelper(subcategory){
	return (dispatch, getState) => {
		const categories = [...getState().general.categories]

		Rx.Observable.
			fromPromise( (new Helper({id: subcategory.id})).save('enabled', !subcategory.enabled) ).
			subscribe(
				subcategory => null,
				error => dispatch(toggleDeviceCategoryError(error))
			)

		let sub = categories.
			find(c => c.id === subcategory.parent).
			subcategories.
			find(s => s.id === subcategory.id).
			enabled = !subcategory.enabled

		dispatch(toggleDeviceCategorySuccess(categories))
	}
}

export function toggleDeviceCategoryHelper(category){
	return (dispatch, getState) => {
		const categories = [...getState().general.categories]
		const cat = categories.find(c => c.id === category.id)

		Rx.Observable.
			fromPromise( (new Helper({id: category.id})).save('enabled', !category.enabled) ).
			subscribe(
				category => null,
				error => dispatch(toggleDeviceCategoryError(error))
			)

		cat.enabled = !cat.enabled
		dispatch(toggleDeviceCategorySuccess(categories))
	}
}

export function createDeviceSubcategoryHelper(categoryId, value){
	return (dispatch, getState) => {
		const subcategory = Helper.subcategory(categoryId, value)
		const _id         = _.uniqueId('subcategory')
		let categories    = [...getState().general.categories]
		const category    = categories.find(c => c.id === categoryId)

		console.log(_id)

		category.subcategories = [...category.subcategories, Object.assign({}, subcategory.attributes, {_id: _id})]

		dispatch(createDeviceSubcategorySuccess(categories))

		Rx.Observable.
			fromPromise(subcategory.save()).
			subscribe(
				(subcategory) => {
					const categories = [...getState().general.categories]

					categories.find(c => c.id === subcategory.get('parent')).
						subcategories.
						find(s => s._id === _id).
						id = subcategory.id

					console.log(categories);

					dispatch(createDeviceSubcategorySuccess(categories))

				},
				(error)       => dispatch(createDeviceSubcategoryError(error))
			)
	}
}

export function createDeviceCategoryHelper(value){
	return (dispatch, getState) => {
		const category = Helper.category(value) 

		dispatch(creatingDeviceCategory())

		Rx.Observable.
			fromPromise(category.save()).
			map(category => Object.assign({}, category.attributes, {id: category.id, subcategories: []})).
			subscribe(
				category => dispatch(createDeviceCategorySuccess( [...getState().general.categories, category] )),
				error => dispatch(createDeviceCategoryError(error))
			)

	}
}

export function fetchDeviceCategoryHelpers(force=false){
	return (dispatch, getState) => {
		dispatch(fetchingDeviceCategoryHelpers())
		const categoriesLastFetch = getState().general.categoriesLastFetch
		const msSinceLastFetch = (date) => new Date().getTime() - date.getTime()
		
		if (!force && categoriesLastFetch && msSinceLastFetch(categoriesLastFetch) < 60000)
			return

		Rx.Observable.
			fromPromise( (new Parse.Query(Helper)).equalTo('key', 'category').find() ).
			flatMap(categories => categories.map(category => Rx.Observable.
				fromPromise( (new Parse.Query(Helper)).equalTo('parent', category.id).find() ).
				map(subcategories => Object.assign(
					{},
					category.attributes,
					{id: category.id, subcategories: subcategories.map(s => Object.assign(
						{},
						s.attributes,
						{id: s.id}
					))}
				))
			)).
			mergeAll().
			reduce( (categories, category) => [...categories, category], [] ).
			subscribe(
				categories => dispatch(fetchDeviceCategorySuccess(categories)),
				error    => dispatch(fetchDeviceCategoryError(error))
			)
	}
}

export function toggleDeviceCategorySelectionHelper(category){
	return (dispatch, getState) => {
		const categories = [...getState().general.categories]

		categories.find(c => c.id === category.id).selected = !category.selected

		dispatch({
			type: TOGGLE_DEVICE_CATEGORY_SELECTION,
			categories
		})
	}
}

export function deleteDeviceCategoryHelpersOptimistically(categories){
	return {
		type: DELETE_DEVICE_CATEGORY_OPTIMISTICALLY,
		categories
	}
}

export function deleteDeviceCategoryHelpersSuccess(result){
	return {
		type: DELETE_DEVICE_CATEGORY_SUCCESS
	}
}

export function deleteDeviceCategoryHelpersError(error){
	return {
		type: DELETE_DEVICE_CATEGORY_ERROR,
		error
	}
}

export function fetchingDeviceCategoryHelpers(){
	return {
		type: FETCHING_DEVICE_CATEGORY
	}
}

export function creatingDeviceCategory(){
	return {
		type: CREATING_DEVICE_CATEGORY
	}
}

export function createDeviceCategorySuccess(categories){
	return {
		type: CREATE_DEVICE_CATEGORY_SUCCESS,
		categories
	}
}

export function createDeviceCategoryError(error){
	return {
		type: CREATE_DEVICE_CATEGORY_ERROR,
		error
	}
}

export function toggleDeviceCategorySuccess(categories){
	return {
		type: TOGGLE_DEVICE_CATEGORY_SUCCESS,
		categories
	}
}

export function toggleDeviceCategoryError(error){
	return {
		type: TOGGLE_DEVICE_CATEGORY_ERROR,
		error
	}
}

export function createDeviceSubcategorySuccess(categories){
	return {
		type: CREATE_DEVICE_SUBCATEGORY_SUCCESS,
		categories
	}
}

export function createDeviceSubcategoryError(error){
	return {
		type: CREATE_DEVICE_SUBCATEGORY_ERROR,
		error
	}
}

export function fetchDeviceCategorySuccess(categories){
	return {
		type: FETCH_DEVICE_CATEGORY_SUCCESS,
		categories
	}
}

export function fetchDeviceCategoryError(error){
	return {
		type: FETCH_DEVICE_CATEGORY_ERROR,
		error
	}
}