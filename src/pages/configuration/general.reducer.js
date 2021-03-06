import {TOGGLE_DEVICE_CATEGORY_SELECTION, DELETE_DEVICE_CATEGORY_OPTIMISTICALLY, DELETE_DEVICE_CATEGORY_SUCCESS, DELETE_DEVICE_CATEGORY_ERROR, CREATING_DEVICE_CATEGORY, TOGGLE_DEVICE_CATEGORY_SUCCESS, TOGGLE_DEVICE_CATEGORY_ERROR, CREATE_DEVICE_CATEGORY_SUCCESS, CREATE_DEVICE_CATEGORY_ERROR, CREATE_DEVICE_SUBCATEGORY_SUCCESS, CREATE_DEVICE_SUBCATEGORY_ERROR, FETCHING_DEVICE_CATEGORY, FETCH_DEVICE_CATEGORY_SUCCESS, FETCH_DEVICE_CATEGORY_ERROR} from '../../state/action-types.js'

const defaultState = {
	categories           : [],
	storedCategories     : [],
	isFetchingCategories : false,
	isCreatingCategory   : false,
	categoriesError      : null,
	subcategoriesError   : null,
	categoriesLastFetch  : null
}

export default function generalConfigReducer(state=defaultState, action){
	switch(action.type){
		case FETCHING_DEVICE_CATEGORY:
			return Object.assign(
				{},
				state,
				{ isFetchingCategories: true, categoriesError: null }
			)
		case CREATING_DEVICE_CATEGORY:
			return Object.assign(
				{},
				state,
				{ isCreatingCategory: true, categoriesError: null }
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
		case CREATE_DEVICE_CATEGORY_SUCCESS:
			return Object.assign(
				{},
				state,
				{categories: action.categories, categoriesError: null, isCreatingCategory: false}
			)
		case CREATE_DEVICE_CATEGORY_ERROR:
			return Object.assign(
				{},
				state,
				{categoriesError: null, isCreatingCategory: false}
			)
		case TOGGLE_DEVICE_CATEGORY_SUCCESS:
			return Object.assign(
				{},
				state,
				{categories: action.categories, categoriesError: null}
			)
		case TOGGLE_DEVICE_CATEGORY_ERROR:
			return Object.assign(
				{},
				state,
				{categoriesError: null}
			)
		case DELETE_DEVICE_CATEGORY_OPTIMISTICALLY:
			return Object.assign(
				{},
				state,
				{storedCategories: [...state.categories], categoriesError: null},
				{categories: [...action.categories]}
			)
		case DELETE_DEVICE_CATEGORY_SUCCESS:
			return Object.assign(
				{},
				state,
				{storedCategories: [], categoriesError: null}
			)
		case DELETE_DEVICE_CATEGORY_ERROR:
			return Object.assign(
				{},
				state,
				{categories: [...state.storedCategories]},
				{storedCategories: [], categoriesError: action.error}
			)
		case TOGGLE_DEVICE_CATEGORY_SELECTION:
			return Object.assign(
				{},
				state,
				{ categories: action.categories }
			)
		default:
			return state
	}
}