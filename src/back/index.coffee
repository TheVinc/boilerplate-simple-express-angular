express = require "express"

bodyParser = require "body-parser"
cookieParser = require "cookie-parser"
session = require "express-session"

fs = require "fs"
request = require "request"
qs = require "querystring"
Path = require 'path'

module.exports = () ->
	config = require __dirname + '/../../config'
	app = express()
	app.use(cookieParser())
	app.use(session({ secret: 'boilerplate-hello-world-bla199000911', resave: false, saveUninitialized: false }))
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())
	app.use(express.static(Path.resolve(__dirname + '/../front')));

	#ssl support
	try
		options = 
			key: fs.readFileSync config.keys.key
			cert: fs.readFileSync config.keys.cert	
	catch e
		options = undefined

	if options?
		console.log 'SSL support enabled'
		server = https.createServer options, app
	else
		console.log 'SSL support disabled. Generate keys/cert.pem and keys/key.pem to enable it.'
		server = app


	# Front webservice. Must be called last
	app.get /.*/, (req, res, next) ->
		res.sendFile Path.resolve __dirname + '/../front/index.html'

	port = config.port || 4000
	server = server.listen port, () ->
		host = server.address().host || 'localhost'
		port = server.address().port
		console.log 'Server listening on ' + (if options then 'https' else 'http') +  '://' + host + ':' + port


