import Rx from 'rx'
import Parse from 'parse'

/* FUNCTIONS */
const msSinceLastFetch = (date) => new Date().getTime() - date.getTime()

/* OBSERVABLES */
const fetchCategoriesObserver = Rx.Observable.
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


export default {

	fetchCategoriesObserver: fetchCategoriesObserver,
	msSinceLastFetch: msSinceLastFetch

}
