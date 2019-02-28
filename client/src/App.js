// client/src/App.js
import React, { Component } from "react";
import "./App.css";
import SearchForm from './components/searchForm'
import SearchTable from './components/searchTable';
import SelectedTable from './components/selectedTable';
import Grid from '@material-ui/core/Grid';
// import Table from './components/table';




class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      searchTableData:[],
      SelectedItems:[],
    }

    this.getSearchTableData = this.getSearchTableData.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);

  }
  componentDidMount(){
    this.setState({selectedItems:[]});
  
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


  render() {
  	return(
  		<div>
	    <div className="App">
	    	<header className="App-header">
	    		<h1 className="App-title"> High Fiber Tracker</h1>
	    	</header>

      <SearchForm getSearchTableData={this.getSearchTableData}  />



      <Grid container space = {12}>
        <Grid item xs={6}>
            <SearchTable tableData={this.state.searchTableData} getSelectedItems={this.getSelectedItems}/>
        </Grid>

        <Grid item xs={6}>
          <SelectedTable tableData={this.state.SelectedItems} />

        </Grid>



      </Grid>



	  </div>

	  </div>

	  
    )
  }
}

export default App;