import {CREATE_DEVICE_SUBCATEGORY_SUCCESS, CREATE_DEVICE_SUBCATEGORY_ERROR, FETCHING_DEVICE_CATEGORY_HELPERS, FETCH_DEVICE_CATEGORY_SUCCESS, FETCH_DEVICE_CATEGORY_ERROR} from '../../state/action-types.js'

const defaultState = {
	categories: [],
	isFetchingCategories: false,
	categoriesError: null,
	subcategoriesError: null,
	categoriesLastFetch: null
}

export default function generalConfigReducer(state=defaultState, action){
	switch(action.type){
		case FETCHING_DEVICE_CATEGORY_HELPERS:
			return Object.assign(
				{},
				state,
				{ isFetchingCategories: true, categoriesError: null }
			)
		case FETCH_DEVICE_CATEGORY_SUCCESS:
			return Object.assign(
				{},
				state,
				{ isFetchingCategories: false, categoriesError: null },
				{ categories: action.categories, categoriesLastFetch: new Date() }
			)
		case FETCH_DEVICE_CATEGORY_ERROR:
			return Object.assign(
				{},
				state,
				{ isFetchingCategories: false, categoriesError: action.error }
			)
		case CREATE_DEVICE_SUBCATEGORY_SUCCESS:
			return Object.assign(
				{},
				state,
				{categories: action.categories, subcategoriesError: null}
			)
		case CREATE_DEVICE_SUBCATEGORY_ERROR:
			return Object.assign(
				{},
				state,
				{subcategoriesError: null}
			)
		default:
			return state
	}
}