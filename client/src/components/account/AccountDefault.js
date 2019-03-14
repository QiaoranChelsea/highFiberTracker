import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage,
        setInStorage } from '../utils/storage';
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';





const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background:"#649b42",
    color:'white'
  },
});




class AccountDefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token:'',
      userId:'',
      signUpError: '',
      signInError: '',
      masterError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:'',
      signUpConfirmPassword:'',
      showSignIn:true
    };

    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onTextBoxChangeSignUpConfirmPassword = this.onTextBoxChangeSignUpConfirmPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onSignUp = this.onSignUp.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    // this.logout = this.logout.bind(this)

  }

  // componentDidMount() {
  //   const obj = getFromStorage('the_main_app');
  //   if(obj && obj.token){
  //     const{token} = obj;

  //     // verify token
  //     fetch('/account/verify?token='+token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if(json.success){
  //           this.setState({
  //             token, 
  //             isLoading: false
  //           });
  //         }else{
  //           this.setState({
  //             isLoading: false 
  //           });
  //         }

  //     });
  //   }else{
  //     this.setState({isLoading: false,});
  //   }

  // }

  onTextBoxChangeSignInEmail(event){
    this.setState({
      signInEmail:event.target.value
    });
  }  

  onTextBoxChangeSignInPassword(event){
    this.setState({
      signInPassword:event.target.value
    });
  }  

  onTextBoxChangeSignUpEmail(event){
    this.setState({
      signUpEmail:event.target.value
    });
  }  

  onTextBoxChangeSignUpPassword(event){
    this.setState({
      signUpPassword:event.target.value
    });
  }  

  onTextBoxChangeSignUpConfirmPassword(event){
    this.setState({
      signUpConfirmPassword:event.target.value
    });
  }  

  onTextBoxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName:event.target.value
    });
  }  

  onTextBoxChangeSignUpLastName(event){
    this.setState({
      signUpLastName:event.target.value
    });
  }

  onSignUp(){
    // grab state
    const{signUpFirstName,
          signUpLastName,
          signUpEmail,
          signUpPassword,
          signUpConfirmPassword
         } = this.state ;

    if(signUpPassword != signUpConfirmPassword){
            this.setState({
              signUpError: "Please comfirm your password",
            });
    }
    else{
    this.setState({
      isLoading: true,
    });
    // post req to backend 
    fetch('/account/signup/', { 
      method: 'POST' ,
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        firstName: signUpFirstName,
        lastName : signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      })
    })
      .then(res => res.json())
      .then(json => {
          console.log(json);
          if(json.success){

            this.setState({
              signUpError: json.message,
              isLoading:false,
              signUpEmail:'',
              signUpPassword:'',
              signUpFirstName:'',
              signUpLastName:''
            });
          }else{

            this.setState({
              signUpError: json.message,
              isLoading:false
            });
          } 

      });
    }
  }

  onSignIn(){
    // grab state
    const{
          signInEmail,
          signInPassword,
         } = this.state ;

    this.setState({
      isLoading: true,
    });

    // post req to backend 

    fetch('/account/signin/', { 
      method: 'POST' ,
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      })
    })
      .then(res => res.json())
      .then(json => {
          setInStorage('the_main_app', {token: json.token, userId:json.userId});
          if(json.success){

            this.setState({
              signInError: json.message,
              isLoading:false,
              signInEmail:'',
              signUpPassword:'',
              token:json.token,
              userId:json.userId
            });
            this.props.getToken(json.token);
          }else{

            this.setState({
              signInError: json.message,
              isLoading:false
            });
          } 

      });
  }

  // logout(){
  //   this.setState({
  //     isLoading: true
  //   });

  //   const obj = getFromStorage('the_main_app');
  //   if(obj && obj.token){
  //     const{token} = obj;

  //     // verify token
  //     fetch('/account/logout?token='+token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if(json.success){
  //           this.setState({
  //             token:'', 
  //             isLoading: false
  //           });
  //         }else{
  //           this.setState({
  //             isLoading: false 
  //           });
  //         }

  //     });
  //   }else{
  //     this.setState({isLoading: false,});
  //   }

  // }

 
  render() {
    const{
      isLoading,
      token,
      signInEmail,
      signInPassword,
      signInError,
      signUpError,
      signUpEmail,
      signUpPassword,
      signUpLastName,
      signUpFirstName,
      signUpConfirmPassword
    } = this.state;

    const { classes } = this.props;

    // console.log(signUpError);
    // if (isLoading){
    //   return (<div> <p> loading ... </p></div>)
    // }
    // console.log("token in account default:", token);

    if(!token){
      return (
        <div>
          <Grid container >
            <Grid item xs = {6}>
              <div className={classes.main}>

                <Paper className={classes.paper}> 
                  
                  {
                    (signInError) ? (<Typography  style= {{color:'red'}}> {signInError}</Typography>) : (null) 
                  }
                  <br/>

                <form className={classes.form}>

                    <Typography component="h1" variant="h5">sign in</Typography>

                    <FormControl margin="normal" required fullWidth>
                      <InputLabel >User Name</InputLabel>
                      <Input 
                        type = "email" 
                        value = {signInEmail}
                        onChange = {this.onTextBoxChangeSignInEmail} />  
                        
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                      <InputLabel >Password</InputLabel>

                      <Input 
                        type = "password" 
                        value = {signInPassword}
                        onChange = {this.onTextBoxChangeSignInPassword}/>
                    </FormControl>
                  
                  <Button onClick ={this.onSignIn}
                          variant="contained"
                          className={classes.submit}>
                          Sign In
                  </Button>
                </form>
                </Paper>
                </div>
              </Grid>

              <Grid item xs = {5}>
                <div className={classes.main}>
                <Paper className={classes.paper}> 

                <form className={classes.form}>
                    {
                      (signUpError) ? (<Typography style= {{color:'red'}}> {signUpError}</Typography>) : (null) 
                    }
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    <FormControl margin="normal"  fullWidth>
                      <InputLabel >First Name</InputLabel>
                      <Input 
                        type = "text" 
                        value = {this.state.signUpFirstName}
                        onChange = {this.onTextBoxChangeSignUpFirstName}
                      />  
                    </FormControl>
                    <FormControl margin="normal"  fullWidth>
                    <InputLabel >Last Name</InputLabel>            
                      <Input 
                        type = "text" 
                        value = {signUpLastName}
                        onChange = {this.onTextBoxChangeSignUpLastName} 
                      /> 
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                    <InputLabel >User Name</InputLabel>            
                      <Input 
                        type = "email" 
                        value = {signUpEmail}
                        onChange = {this.onTextBoxChangeSignUpEmail}
                       />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                    <InputLabel >Password</InputLabel>     
                      <Input 
                        type = "password" 
                        placeholder = "Password"
                        value = {signUpPassword}
                        onChange = {this.onTextBoxChangeSignUpPassword}
                      /> 
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                    <InputLabel >Confirm Password</InputLabel>     
                      <Input 
                        type = "password" 
                        placeholder = "Password"
                        value = {signUpConfirmPassword}
                        onChange = {this.onTextBoxChangeSignUpConfirmPassword}
                      /> 
                    </FormControl>
                    <Button onClick ={this.onSignUp}
                          variant="contained"
                          className={classes.submit}>
                          Sign Up
                  </Button>

                  </form>
                  </Paper>

                </div>
              </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <p>Sign In Successfully! </p>
        <Redirect to= "/"/>
      </div>

    );
  }
}

AccountDefault.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountDefault);

