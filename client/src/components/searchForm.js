import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import GetFiberAmount from './getFiberAmount'


import Grid from '@material-ui/core/Grid';


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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    alert('Food name: ' + this.state.foodName + ' servingSize:' + this.state.servingSize);
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
        <Grid item xs={6}  >
        {/*
              {this.state.searchFlag && this.state.items ? <div>{this.state.items.map((item,index) => (
                      <li key={index}>{item.group}, {item.ndbno}, {item.name}</li>
                  ))} </div>: <p>Nothing found, please enter a food name</p>
              } 
        */}
          <GetFiberAmount foodName = {this.state.foodName} servingSize = {this.state.servingSize}/>      
        </Grid>
        
       <form onSubmit={this.handleSubmit}>
         <MyInputBase type="text" name="foodName" placeholder="food name" onChange={this.handleChange('foodName')}/>
         <MyInputBase type="text" name="servingSize" placeholder="serving size(g)" onChange={this.handleChange('servingSize')} />
         <Button type= "submit" value="Submit">Submit</Button>
       </form>

      </div>

    
    )
  }
}
// const SearchForm = (props)=> {
// 	return (
// 		<form >
// 			<MyInputBase type="text" name="foodName" placeholder="food name" onChange={props.getFood}/>
//       <MyInputBase type="text" name="servingSize" placeholder="serving size(g)"/>
// 			<Button>Submit</Button>
// 		</form>
// 	)


// }

export default SearchForm;
