// client/src/App.js
import React, { Component } from "react";
// import axios from 'axios';
import "./App.css";
import SearchForm from './components/searchForm'
// import SearchTable from './components/searchTable'
// import Grid from '@material-ui/core/Grid';




class App extends Component {
  state ={
  	items:null,
  	searchFlag:false,
  }

  // // get Food from user and perfrom search API in Composition Database
  // getFood=(e)=>{
 	// e.preventDefault();
  // console.log("e:::::",e.target.elements);
 	// const food = e.target.elements.foodName.value;
  // // const servingsize = e.target.elements.servingSize.value;
  // // console("servingsize", servingsize);
 	// // const APIKey = "eb121QN3xOm3Uw9O94P21n1MaWFIDxNXdTgifYR3";
 	// if(food){
  //    // get ndbno based on food name 
 	// 	 axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${food}&sort=n&max=5&offset=0&api_key=${APIKey}`)
 	// 	.then((res)=>{
		// 	const items = res.data.list.item;
		// 	this.setState({items:items});
		// 	this.setState({searchFlag:true});
  //     // getFiber(items[0].ndbno,servingsize);
		// 	// console.log(items);
  //     // console.log("...data");
  //     // console.log(items[0].name,items[0].manu, items[0].ndbno);


 	// 	})
 	// 	.catch(function (error) {
  //   		console.log(error);
  //   		this.setState({searchFlag:false});
  // 		});
 	// }
 	// else return;
  // }





  // get Fiber amount based on food's ndbno to do 

  render() {
  	return(
  		<div>
	    <div className="App">
	    	<header className="App-header">
	    		<h1 className="App-title"> High Fiber Tracker</h1>
	    	</header>
      <SearchForm/>

	  </div>

    	

{/*
	  	<Grid container >
  	    <Grid item xs={6}  >
  	    	<SearchTable/>
    
      	</Grid>
        <Grid item xs={6} >
         	<SearchTable/>
        </Grid>
			</Grid>
*/}
	  </div>

	  
    )
  }
}

export default App;