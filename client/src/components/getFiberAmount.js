import React, {Component} from 'react'
import axios from 'axios';

const APIKey= "eb121QN3xOm3Uw9O94P21n1MaWFIDxNXdTgifYR3";


class GetFiberValue extends Component{

	constructor(props) {
    super(props);
    this.state = {
    	items:null,
    	nameFiberList:[],
    	numbers:[],
    }
    this.getFiberValue = this.getFiberValue.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
	  const { foodName, servingSize } = this.props;
	  if (props.foodName !== foodName ||  props.servingSize !=  servingSize ) {
	    this.getFiberValue(props.foodName, props.servingSize);
	  }
	}

	// get Food from user and perfrom search API in Composition Database
	getFiberValue(foodName,servingSize = 1 ){
		console.log(foodName);
		const fiberID = "291"
	  if(foodName){
	     // get ndbno based on food name 
	     axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${foodName}&sort=n&max=50&offset=0&api_key=${APIKey}`)
	    .then((res)=>{
	      const items = res.data.list.item;
	      const numbers = items.map((item) => item.ndbno );
				return numbers;
	    })
	   	.then((numbers) =>{
        const promises = numbers.map((ndbno) => {
            let url = `https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=b&format=json&api_key=${APIKey}`
            return axios.get(url)
            .then((res)=>{
            	const name = res.data.report.food.name;
            	const nutrients = res.data.report.food.nutrients;
            	var fibers= nutrients.filter(function (elem) {
							  return elem.nutrient_id === fiberID;
							});
							if (fibers === undefined || fibers.length == 0 || name == undefined) {
									console.log("request name or fiber is undefined");
							    return 0
							}
				     	else{
								this.setState({
								  nameFiberList: [...this.state.nameFiberList, {name: name.split(",")[0],fiberValue: fibers[0].value, fiberTotal: fibers[0].value * servingSize}]
								})
				     		
				     	}
            })
        })
        return Promise.all(promises)
			})
	    .catch(function (error) {
	        console.log(error);
	    });
	  }
	 }

  render(){
  	return (
  		<div>
  		  <h1> name | fiberValue </h1>
				<ul> {this.state.nameFiberList.map((item,index) => (
                      <li key={index}>{item.name}, {item.fiberValue}, {item.fiberTotal}</li>
              ))}  
				</ul>

  		</div>
  	)
  }

}



export default GetFiberValue;