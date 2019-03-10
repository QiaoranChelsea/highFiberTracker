import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

// import GetFiberAmount from './getFiberAmount';
// import SearchTable from './searchTable';

// import Grid from '@material-ui/core/Grid';
import axios from 'axios';


const APIKey= "eb121QN3xOm3Uw9O94P21n1MaWFIDxNXdTgifYR3";
const APIKey2 ="RHljFAKu5qSS9IdDEWw5zRo8oEgQmTN3HAQhTa4m";

function styled(Component) {
  return (style, options) => {
    function StyledComponent(props) {
      const { classes, className, ...other } = props;
      return <Component className={classNames(classes.root, className)} {...other} />;
    }
    StyledComponent.propTypes = {
      classes: PropTypes.object.isRequired,
      className: PropTypes.string,
    };
    const styles =
      typeof style === 'function' ? theme => ({ root: style(theme) }) : { root: style };
    return withStyles(styles, options)(StyledComponent);
  };
}


const MyInputBase = styled(InputBase)({
  // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: "solid",
  padding: '0 30px',
});

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      items:null,
      searchFlag:false,
      foodName:'',
      servingSize:'',
      nameFiberList:[],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFiberValue = this.getFiberValue.bind(this);
  }

  componentWillMount() {
    // this.doAThing = this.doAThing.bind(this);

    this.state = {
      loading: false
    };
  }

    // get Food from user and perfrom search API in Composition Database
  getFiberValue(foodName,servingSize = 1 ){
    this.setState({loading:true});
    console.log(foodName);
    const fiberID = "291"
    if(foodName){
       // get ndbno based on food name 
       axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${foodName}&sort=n&max=50&offset=0&api_key=${APIKey2}`)
      .then((res)=>{
        const items = res.data.list.item;
        const numbers = items.map((item) => item.ndbno );
        return numbers;
      })
      .then((numbers) =>{
        const promises = numbers.map((ndbno) => {
            let url = `https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=b&format=json&api_key=${APIKey2}`
            return axios.get(url)
            .then((res)=>{
              // console.log(res);
              const name = res.data.report.food.name;
              const nutrients = res.data.report.food.nutrients;
              var fibers= nutrients.filter(function (elem) {
                return elem.nutrient_id === fiberID;
              });
              if (fibers === undefined || fibers.length === 0 || name === undefined) {
                this.setState({
                  nameFiberList: [...this.state.nameFiberList, {foodName: name.split(","),fiberUnit: 0, fiberTotal: 0}]
                });
              }
              else{
                this.setState({
                  nameFiberList: [...this.state.nameFiberList, {foodName: name.split(","),fiberUnit: fibers[0].value, fiberTotal: fibers[0].value * servingSize}]
                });

                
              }
            })
        })
        return Promise.all(promises)
    })
      .then(()=>{
        if(this.state.nameFiberList.length){
          this.setState({loading:false});
          return this.props.getSearchTableData(this.state.nameFiberList);
        }
          })
      .catch(function (error) {
          console.log(error);
      });
    }
   }

  handleSubmit(event) {
    console.log('click==> Food name: ' + this.state.foodName + ' servingSize:' + this.state.servingSize);
    this.setState({nameFiberList:[]});
    this.getFiberValue(this.state.foodName, this.state.servingSize);
    event.preventDefault();
  }
  
  // get Fiber amount based on food's ndbno to do 
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    return(
      <div>
        {this.state.loading ? <CircularProgress/> : null }

       <form style={{marginTop:"20px" }} onSubmit={this.handleSubmit} >
         <MyInputBase type="text" name="foodName" placeholder="food name/UPC number" value={this.state.foodName || ""} onChange={this.handleChange('foodName')}/>
         <MyInputBase type="text" name="servingSize" placeholder="serving size(g)" value={this.state.servingSize} onChange={this.handleChange('servingSize')} />
         <Button type= "submit" value="Submit">Search</Button>
       </form>
      </div>

    
    )
  }
}


export default SearchForm;
