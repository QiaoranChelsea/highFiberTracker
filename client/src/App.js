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
      data:null
    }

    this.getSearchTableData = this.getSearchTableData.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);

  }
  componentDidMount(){
    this.setState({selectedItems:[]});

          // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  
  }

      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

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
      <p className="App-intro">{this.state.data}</p>

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