import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {MAIN_THEME_COLOR} from '../value';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};




function NavBar(props) {
  const { classes, isLogin } = props;
  return (
    <div className={classes.root} >
      <AppBar position="static"  style={{ background: "#649c42" }}>
        <Toolbar>
          {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>*/}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" style={{ textDecoration: 'none' ,color: 'white'}}>High Fiber Tracker</Link> 

          </Typography>
          (isLogin) ? (<Link to="/" style={{ textDecoration: 'none' ,color: 'white'}}> <Button color="inherit"> logout</Button></Link> )
           : (<div>
             <Link to="/signup/" style={{ textDecoration: 'none' ,color: 'white'}}> <Button color="inherit"> Sign In</Button></Link> 
             <Link  to="/signup/" style={{ textDecoration: 'none',color: 'white' }}><Button color="inherit"> Sign Up</Button></Link>
           </div>)
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);