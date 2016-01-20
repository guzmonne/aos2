import Rx from 'rx'
import Parse from 'parse'

/* FUNCTIONS */
const msSinceLastFetch = (date) => new Date().getTime() - date.getTime()

/* OBSERVABLES */
const fetchDeviceCategories = () => Rx.Observable.
	fromPromise(Parse.Cloud.run('categories')).
	map(results => {
		return results.map(result => Object.assign(
			{},
			{id: result.category.id},
			result.category.attributes,
			{subcategories: result.subcategories.
				map( s => Object.assign(
					{},
					s.attributes,
					{id: s.id}
				))
			}
		))
	})

const createDeviceCategory = category => Rx.Observable.
	fromPromise(category.save()).
	map(category => Object.assign(
		{},
		category.attributes,
		{
			id: category.id,
			subcategories: []
		})
	)

const createDeviceSubcategory = subcategory => Rx.Observable.
	fromPromise(subcategory.save())

const toggleHelper = helper => Rx.Observable.
	fromPromise( (new Parse.Object('Helper', {id: helper.id})).save('enabled', !helper.enabled) )

const deleteHelper = helper => Rx.Observable.
	fromPromise( (new Parse.Object('Helper', {id: helper.id})).destroy() )

const deleteHelpers = helpers => Rx.Observable.
	fromArray(helpers).
	map(helper => new Parse.Object('Helper', {id: helper.id})).
	reduce((acc, helper) => [...acc, helper], []).
	flatMap(helpers => Rx.Observable.
		fromPromise(Parse.Object.destroyAll(helpers))
	)



export default {

	helpers: {
		msSinceLastFetch
	},
	observables: {
		fetchDeviceCategories,
		createDeviceCategory,
		createDeviceSubcategory,
		toggleHelper,
		deleteHelper,
		deleteHelpers
	}

}
