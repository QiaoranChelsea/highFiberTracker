const express = require('express');
const app = express();
const mongoose = require('mongoose');
const accountRoutes = require('./api/routes/account');
const logRoutes = require('./api/routes/fiberlog');
// mongoose.connect("mongodb://mongo-cloud:" + 
// 					process.env.MONGO_ATLAS_PW + 
// 					"@high-fiber-cluster-shard-00-00-k77ji.mongodb.net:27017,high-fiber-cluster-shard-00-01-k77ji.mongodb.net:27017,high-fiber-cluster-shard-00-02-k77ji.mongodb.net:27017/test?ssl=true&replicaSet=high-fiber-cluster-shard-0&authSource=admin&retryWrites=true");
MONGO_ATLAS_PW = "mongo-cloud";
mongoose.connect("mongodb://mongo-cloud:" + 
					MONGO_ATLAS_PW + 
					"@high-fiber-cluster-shard-00-00-k77ji.mongodb.net:27017,high-fiber-cluster-shard-00-01-k77ji.mongodb.net:27017,high-fiber-cluster-shard-00-02-k77ji.mongodb.net:27017/test?ssl=true&replicaSet=high-fiber-cluster-shard-0&authSource=admin&retryWrites=true",
					{ useNewUrlParser: true });


app.use('/account', accountRoutes);
app.use('/fiberlog',logRoutes);

module.exports = app;