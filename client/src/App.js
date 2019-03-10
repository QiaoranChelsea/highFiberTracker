// client/src/App.js
import React, { Component } from "react";
import "./App.css";
import SearchForm from './components/searchForm'
import SearchTable from './components/searchTable';
import SelectedTable from './components/selectedTable';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// import Table from './components/table';
import {MAIN_THEME_COLOR} from './value';


class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      searchTableData:[],
      SelectedItems:[],
      data:null,
      todaysTotal:0,
      isLogin:false,
      token:''
    }

    this.getSearchTableData = this.getSearchTableData.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);
    this.getTodaysTotal = this.getTodaysTotal.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  componentDidMount(){
    this.setState({selectedItems:[]});
  }

  componentWillReceiveProps(props) {
    const { isLogin ,token} =props;
    console.log("islogin in APp", isLogin);
    // console.log("tableData in searchTable", tableData);

    this.setState({
      isLogin:isLogin,
      token:token});

    // console.log("in componentWillReceiveProps selectedItems ", this.state.selectedItems);
  }


  getSearchTableData(dataFromChild){
    console.log("dataFromChild:",dataFromChild);
    this.setState({
      searchTableData: dataFromChild
    });
  }

  getSelectedItems(SelectedItemsFromChild){
    // console.log("SelectedItemsFromChild:",SelectedItemsFromChild);
    this.setState({
      SelectedItems: SelectedItemsFromChild
    });

    // this.setState({selectedItems:[]});
  }

  getTodaysTotal(totalFiber){
     // console.log('totalFiber changed');
     // console.log("totalfiber", totalFiber);
    this.setState({
      todaysTotal:totalFiber
    });
  }

  handleClick(){
    const {todaysTotal,token} = this.state;
    console.log("todays totle is", todaysTotal);

    // post req to backend 
    fetch('/fiberlog/insert/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        userId:token,
        fiberAmount: todaysTotal
      })})
    .then(res=>res.json())
    .then(json=>{
      console.log(json);
      if(json.success){
        // do somthing to infor user submit successfully
        alert("submit daily summary successfully.")
      }else{
        alert("Error: failed submit daily summary, please try again.")
      }
    })




  }

  render() {
  	return(
  		<div>
  	    <div className="App">
  	    	<header className="App-header" >
            <h1>Today's Total: {this.state.todaysTotal || 0} </h1>

            { (this.state.token) ? 
            (<Button variant="contained" color="secondary" onClick ={this.handleClick}>
              Submit Today's Data
            </Button>) : null
            }
          </header>

          <SearchForm getSearchTableData={this.getSearchTableData}  />

          <Grid container space = {12}>
            <Grid item xs={6}>
                <SearchTable tableData={this.state.searchTableData} getSelectedItems={this.getSelectedItems}/>
            </Grid>

            <Grid item xs={6}>
              <SelectedTable tableData={this.state.SelectedItems} getTodaysTotal={this.getTodaysTotal}  />

            </Grid>

          </Grid>
  	    </div>
	    </div>

    )
  }
}

export default App;