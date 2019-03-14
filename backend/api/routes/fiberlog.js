const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json()); // for parsing application/json


const FiberLog = require('../models/FiberLog');


/*
*  Test account router
*/
router.get('/',(req,res,next)=>{
	res.status(200).json({
		message:"connected to fiberlog router!"
	})
});

// insert new log into table 
router.post('/insert', (req, res,next)=>{
	const {body} = req;
	const {userId,
		   fiberAmount} = body;
	// console.log("filber log inser", req);

	if(!fiberAmount){
		return res.send({
		    success: false,
		    message:'Error: fiber amount cannot be nothing'
	  });		
	}

	const newFiberLog = new FiberLog();
	newFiberLog.userId = userId;
	newFiberLog.fiberAmount = fiberAmount;
	newFiberLog.save((err, user)=>{
		if(err){
			return res.send({
				success: false,
				message:'Error: server error when insertation'
			});
		}

		return res.send({
			success:true,
			message:'done with insertation!'
		});
	})
})

// insert new log into table 
router.get('/getlog', (req, res,next)=>{
	// console.log(req);
	const {query} = req;
	const {userId} = query;

	// console.log(userId);
	if(!userId){
		return res.send({
		    success: false,
		    fiberAmount:null,
		    message:'Error: userId cannot be nothing'
	  });		
	}

	FiberLog.find(({
		userId:userId
	}),(err, fiberlog)=>{
		if(err){
			return res.send({
				success: false,
				fiberAmountArray: null,
				message:'Error: server error when get user log'
			});
		}

		if(fiberlog.length < 1){
		    return res.send({
		      success: false,
		      fiberAmountArray: null,
		      message: 'no record founded in our system, please try to submit your daily fiber consumption'
		    });
		}

		return res.send({
			success:true,
			fiberAmountArray: fiberlog,
			message:'done with get log!!'
		})
	})
})



module.exports = router;