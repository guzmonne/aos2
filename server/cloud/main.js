var _ = require('underscore')

var Kefir = require('cloud/kefir.js')

Parse.Cloud.define('kefir', function(req, res){
	res.success(_.isUndefined(Kefir))
})

Parse.Cloud.define('categories', function(req, res){
	Kefir.
		fromPromise( (new Parse.Query('Helper')).equalTo('key', 'category').find() ).
		flatMap(function(categories){
			return Kefir.
				stream(function(e){ _.forEach(categories, function(category){ e.emit(category) }); e.end() }).
				flatMap(function(category){
					return Kefir.
						fromPromise( (new Parse.Query('Helper')).equalTo('parent', category.id).find() ).
						map(function(subcategories){
							return {
								category: category,
								subcategories: subcategories
							}
						})
				}).
				scan(function(acc, result){ acc.push(result); return acc }, []).
				last()
		}).
		onValue(function(results){ res.success(results) }).
		onError(function(error){ console.log(error); res.error(error) }).
		onEnd(function(){console.log('Parse Cloud Call "categories" completed successfuly')})
})