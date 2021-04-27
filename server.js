

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const server = http.createServer(app)

const MongoClient = require('mongodb').MongoClient 

const url = "mongodb+srv://root:1a2b3c4d@victor.dtil8.mongodb.net/victor?retryWrites=true&w=majority"


MongoClient.connect(url, (err, client) => {
 	if(err) return console.log(err)
	db = client.db('victor')

	server.listen(3000, () => {
    	console.log('The server is running on port ',  server.address().port)
	});
})


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs')

app.get('/', (request, response) => {
    response.render('index.ejs')
})


app.post('/form', (request, response) =>{
	db.collection('data').save(request.body, (err, result) => {
	if(err) return console.log(err)

	console.log('The data has been saved in the database.')
	response.redirect('/')

	})
})

