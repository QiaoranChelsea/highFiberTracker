import React , {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App'
import AccountDefault from './components/account/AccountDefault'
import NavBar from './components/NavBar'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {getFromStorage,
        setInStorage } from './components/utils/storage'

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

class AppRouter extends Component {

	constructor(props){
		super(props);

    	this.state = {
    		isLoading:false,
    		isLogin:false,
    		token:''
    	};

    	this.getToken = this.getToken.bind(this);
    	this.logout = this.logout.bind(this);

	}

	componentDidMount() {
	    const obj = getFromStorage('the_main_app');

	    if(obj && obj.token){
	      const{token} = obj;

	      // verify token
	      fetch('/account/verify?token='+token)
	        .then(res => res.json())
	        .then(json => {
	          if(json.success){
	            this.setState({
	              token, 
	              isLoading: false
	            });
	          }else{
	            this.setState({
	              isLoading: false 
	            });
	          }

	      });
	    }else{
	      this.setState({isLoading: false,});
	    }
  	}

  	logout(){
	    this.setState({
	      isLoading: true
	    });
	    const obj = getFromStorage('the_main_app');
	    if(obj && obj.token){
	      const{token} = obj;

	      // verify token
	      fetch('/account/logout?token='+token)
	        .then(res => res.json())
	        .then(json => {
	          if(json.success){
	            this.setState({
	              token:'', 
	              isLoading: false
	            });
	          }else{
	            this.setState({
	              isLoading: false 
	            });
	          }

	      });
	    }else{
	      this.setState({isLoading: false,});
	    }

  	}

  	getToken(mtoken){
  		this.setState({token: mtoken});

  	}

	render(){
	  return (
	    <Router>
	      <div>
	  	    <div  style = {{flexGrow: 1}}>
		      <AppBar position="static"  style={{ background: "#649c42" }}>
		        <Toolbar>
		          {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
		            <MenuIcon />
		          </IconButton>*/}
		          <Typography variant="h6" color="inherit" style = {{flexGrow: 1}}>
		            <Link to="/" style={{ textDecoration: 'none' ,color: 'white'}}>High Fiber Tracker</Link> 

		          </Typography>
		          {(this.state.token) ? ( <Link to="/" style={{ textDecoration: 'none' ,color: 'white'}}> <Button onClick ={this.logout} color="inherit"> logout</Button></Link>)
		           : (<div>
		             <Link to="/signup/" style={{ textDecoration: 'none' ,color: 'white'}}> <Button color="inherit"> Sign In</Button></Link> 
		             <Link  to="/signup/" style={{ textDecoration: 'none',color: 'white' }}><Button color="inherit"> Sign Up</Button></Link>
		             </div>)}
		        </Toolbar>
		      </AppBar>
		    </div>

	        <Route path="/" exact component={App} />
	        <Route path="/signup/" render={()=><AccountDefault  getToken={this.getToken}/>} />
	      </div>
	    </Router>
	  );
	}
}

export default AppRouter;