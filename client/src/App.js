// client/src/App.js
import React, { Component } from "react";
import axios from 'axios';
import "./App.css";
import SearchForm from './components/searchForm'

//  https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY 


class App extends Component {
  state ={
  	items:null,
  	searchFlag:false,
  }

  // get Food from user and perfrom search API in Composition Database
  getFood=(e)=>{
 	e.preventDefault();
 	const food = e.target.elements.foodName.value;
 	const APIKey = "eb121QN3xOm3Uw9O94P21n1MaWFIDxNXdTgifYR3";
 	if(food){
 		 axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${food}&sort=n&max=5&offset=0&api_key=${APIKey}`)
 		.then((res)=>{
			const items = res.data.list.item;
			this.setState({items:items});
			this.setState({searchFlag:true});
			console.log(items);
 		})
 		.catch(function (error) {
    		console.log(error);
    		this.setState({searchFlag:false});

  		});
 	}
 	else return;

  }

  // get Fiber amount based on food's ndbno

  render() {
  	return(
	    <div className="App">
	    	<header className="App-header">
	    		<h1 className="App-title"> High Fiber Tracker</h1>
	    	</header>
	    	<SearchForm getFood={this.getFood}/>
	    	{this.state.searchFlag && this.state.items ? <div>{this.state.items.map((item,index) => (
							        <li key={index}>{item.group}, {item.ndbno}, {item.name}</li>
							    ))} </div>: <p>Nothing found, please enter a food name</p>
	    	}	

	  </div>

	  
    )
  }
}

export default App;