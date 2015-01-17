module.exports = (app) ->
	app.controller 'PageCtrl', ["$scope",
		($scope) ->
			$scope.phrase = 'Some webdev you got there'
			return
	]
