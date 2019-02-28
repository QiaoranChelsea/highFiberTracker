const express =  require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const request = require('request');
var bodyParser = require('body-parser')

app.use(cors());

// const SELECT_ALL_USER_QUERY = 'SELECT * FROM usertable';

// const connection = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'passpass',
// 	database:'test-db'
// });

// const connection = mysql.createConnection({
// 	host:'oniddb.cws.oregonstate.edu',
// 	user:'liqiao-db',
// 	password:'P7RT6td21WbTHuPo',
// 	database:'liqiao-db'
// });

// connection.connect(err =>{
// 	if(err){
// 		throw err;
// 	}
// 	else{
// 		console.log("DB Connected!");
// 	}
// });


// const usa = "https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY"
// app.get('/', (req,res)=>{
// 	request(usa, { json: true }, (err, res, body) => {
// 	  if (err) { return console.log(err); }
// 	  // let info = JSON.parse(body);
// 	  // var num = body[0].food_code;
// 	  console.log(body);
// 	  // res.send("get something" + num);
// 	});
// });

// app.get('/user',(req,res)=>{
// 	connection.query(SELECT_ALL_USER_QUERY,(err, results)=>{
// 		if(err){
// 			return res.send(err);
// 		}
// 		else{
// 			return res.json({
// 				data:results
// 			})
// 		}
// 	}); 
// });

app.listen(4000, ()=>{
	console.log('server listening on port 4000')
});

