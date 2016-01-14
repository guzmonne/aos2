import {CREATING_DEVICE_CATEGORY, CREATE_DEVICE_CATEGORY_SUCCESS, CREATE_DEVICE_CATEGORY_ERROR, CREATE_DEVICE_SUBCATEGORY_SUCCESS, CREATE_DEVICE_SUBCATEGORY_ERROR, FETCHING_DEVICE_CATEGORY_HELPERS, FETCH_DEVICE_CATEGORY_SUCCESS, FETCH_DEVICE_CATEGORY_ERROR} from '../../state/action-types.js'
import Rx from 'rx'
import Parse from 'parse'
import Helper from '../../models/helper.model.js'

export function createDeviceSubcategoryHelper(categoryId, value){
	return (dispatch, getState) => {
		const subcategory = Helper.subcategory(categoryId, value)
		let categories = [...getState().general.categories]
		const category = categories.find(c => c.id === categoryId)

		category.subcategories = [...category.subcategories, subcategory.attributes]

		dispatch(createDeviceSubcategorySuccess(categories))

		Rx.Observable.
			fromPromise(subcategory.save()).
			subscribe(
				(subcategory) => console.log(subcategory),
				(error)       => dispatch(createDeviceSubcategoryError(error)),
				()            => console.log('Subcategory save completed')
			)
	}
}

export function createDeviceCategoryHelper(value){
	return (dispatch, getState) => {
		const category = Helper.category(value) 

		dispatch(creatingDeviceCategory())

		Rx.Observable.
			fromPromise(category.save()).
			map(category => ({
				id: category.id,
				value: category.get('value'),
				subcategories: []
			})).
			subscribe(
				category => dispatch(createDeviceCategorySuccess( [...getState().general.categories, category] )),
				error => dispatch(createDeviceCategoryError(error)),
				() => console.log('Catergory save completed')
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
				map(subcategories => ({
					id: category.id,
					value: category.get('value'),
					subcategories: subcategories.map(s => s.attributes)
				}))
			)).
			mergeAll().
			reduce( (categories, category) => [...categories, category], [] ).
			subscribe(
				categories => dispatch(fetchDeviceCategorySuccess(categories)),
				error    => dispatch(fetchDeviceCategoryError(error)),
				()       => console.log('Fetch Device Category Helpers completed.')
			)
	}
}

export function fetchingDeviceCategoryHelpers(){
	return {
		type: FETCHING_DEVICE_CATEGORY_HELPERS
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