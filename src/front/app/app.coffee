app = angular.module("myAngularApp", ["ui.router"])

app.config [
	"$stateProvider"
	"$urlRouterProvider"
	"$locationProvider"
	"$controllerProvider"
	"$compileProvider"
	"$filterProvider"
	"$provide"
	($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) ->
		$stateProvider.state 'page',
			url: '/',
			templateUrl: '/templates/index.html'
			controller: 'PageCtrl'

		$urlRouterProvider.otherwise('/404');
		$locationProvider.html5Mode true
]

#controllers
require('./controllers/page/PageCtrl') app

app.run(["$rootScope", 
	($rootScope) ->
		initApp = () ->
			console.log "Hello App."

		initApp()
])