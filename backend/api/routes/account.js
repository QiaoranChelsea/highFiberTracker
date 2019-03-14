const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json()); // for parsing application/json



const User = require('../models/User');
const UserSession = require('../models/UserSession');

/*
*  Test account router
*/
router.get('/',(req,res,next)=>{
	res.status(200).json({
		message:"connected to account router!"
	})
});

/*
* sign up 
*/

router.post('/signup',(req,res,next)=>{
	// console.log(req);
	const {body}  = req;
	// console.log("body", body);
	const {
	  password } = body 
	let{
	  firstName,
	  lastName,
	  email
	} = body;


	// if(!firstName){
	//   return res.send({
	//     success: false,
	//     message:'Error: First name cannot be blank'
	//   });
	// }  

	// if(!lastName){
	//   return res.send({
	//     success: false,
	//     message:'Error: Last name cannot be blank'
	//   });
	// } 

	if(!email ){
	  return res.send({
	    success: false,
	    message:'Error in Sign Up: User Name cannot be blank'
	  }) ;
	} 

	if(!password ){
	  return res.send({
	    success: false,
	    message:'Error in Sign Up: Password cannot be blank'
	  });
	}

	email = email.toLowerCase();


	// steps:
	// 1. verify email doens't exist 
	// 2 . save 
	User.find({
	  email: email
	}, (err,previousUsers) => {
	  if(err){
	    return res.send({
	      success: false,
	      message:'Error: Server error'
	    });    
	  }else if(previousUsers.length > 0){
	    return res.send({
	      success: false,
	      message:'Error: account already exist'
	    });     
	  }

	  const newUser = new User();
	  newUser.email = email;
	  newUser.firstName = firstName;
	  newUser.lastName = lastName;
	  newUser.password = newUser.generateHash(password);
	  newUser.save((err, user)=>{
	    if(err){
	      return res.send({
	        success: false,
	        message:'Error: Server error'
	      }); 
	    }

	    return res.send({
	      success: true,
	      message:'sign up successfully!'
	    });

	  })
	})
});


/*
*    sign in 
*/ 


router.post('/signin',(req,res,next)=>{
	const {body}  = req;
	const {
	  password } = body 
	let{
	  firstName,
	  lastName,
	  email
	} = body;    

	if(!email ){
	  return res.send({
	    success: false,
	    message:'Error in Sign In: Email cannot be blank'
	  }) ;
	} 

	if(!password ){
	  return res.send({
	    success: false,
	    message:'Error in Sign In: Password cannot be blank'
	  });
	}

	email = email.toLowerCase();
	User.find({
	  email: email
	}, (err, users)=>{
	  if(err){
	    return res.send({
	      success: false,
	      message: 'Error:server error'
	    });
	  }
	  if(users.length != 1){
	    return res.send({
	      success: false,
	      message: 'Error:invalid'
	    });
	  }

	  const user = users[0]
	  if(! user.validPassword(password)){
	    return res.send({
	      success: false,
	      message: 'Error:invalid'
	    });
	  }


	  const userSession = new UserSession();
	  userSession.userId = user._id;
	  userSession.save((err,doc)=> {
	    if(err){
	      return res.send({
	        success: false,
	        message:'Error: Server error'
	      }); 
	    }

	    return res.send({
	      success: true,
	      message:'valid sign in!',
	      token: doc._id,
	      userId:doc.userId

	    });
	  })

	})

});

/*
*    Verify 
*/ 

router.get('/verify',(req,res,next)=>{
	// get the token 
	const{ query } = req;
	const {token} = query;
	// ? token = test 


	// verify the token is one of a kind and it's not deleted 
	UserSession.find({
	  _id: token,
	  isDeleted:false
	}, (err, sessions)=>{
	      if(err){
	        return res.send({
	          success: false,
	          message:'Error: Server error'
	        }); 
	      }

	      if(sessions.length != 1){
	        return res.send({
	          success: false,
	          message:'Error: Invaliud '
	        }); 
	      }
	      else{
	        return res.send({
	          success: true,
	          message:'good',
	        });
	      }

	});
});

/*
*   log out 
*/

router.get('/logout',(req,res,next)=>{
	// get the token 
	const{ query } = req;
	const {token} = query;
	// ? token = test 


	// verify the token is one of a kind and it's not deleted 
	UserSession.findOneAndUpdate({
	  _id: token,
	  isDeleted:false
	}, {$set : {isDeleted: true}}, null, (err, sessions)=>{
	      if(err){
	        return res.send({
	          success: false,
	          message:'Error: Server error'
	        }); 
	      }

	      return res.send({
	        success: true,
	        message:'good',
	      });

	});
});

module.exports = router;