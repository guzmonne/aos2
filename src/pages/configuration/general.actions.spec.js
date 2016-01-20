import sinon from 'sinon/pkg/sinon'
import {store} from '../../state/store.js'
import * as actions from './general.actions.js'
import Parse from 'parse'
import Helper from '../../models/helper.model.js'

describe('General - Actions', () => {

	describe('fetchDeviceCategoryHelpers:', function(){
		const run = Parse.Cloud.run

		const categoriesFakeResponse = [1, 2].map(i => ({
			category: new Helper({key: 'category', enabled: true, value: `Cat ${i}`, id: i}),
			subcategories: [1, 2, 3].map(v => Helper.subcategory(i, `Sub ${i}-${v}`))
		}))

		beforeEach(() => {
			Parse.Cloud.run = () => Parse.Promise.as([...categoriesFakeResponse])
		})

		afterEach(() => {
			Parse.Cloud.run = run
		})

		it('should dispatch fetchingDeviceCategoryHelpers()', () => {
			const spy     = sinon.spy()
			const restore = actions.fetchingDeviceCategoryHelpers
			const action  = actions.fetchDeviceCategoryHelpers()

			actions.fetchingDeviceCategoryHelpers = spy
			store.dispatch(action)

			expect(spy.called).to.be.ok

			actions.fetchingDeviceCategoryHelpers = restore
		})

		it('should return all the Subcategory Helpers inside every Category Helper')
		it('should call fetchingDeviceCategoryHelpers()')
		it('should call fetchDeviceCategoryHelpersSuccess() on success')
		it('should call fetchDeviceCategoryHelpersError() on error')
		it('should not run if it was called 60000 ms ago and force === false')
		it('should always run if force === false')

	})

})