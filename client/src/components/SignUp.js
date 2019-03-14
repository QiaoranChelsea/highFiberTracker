import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage,
        setInStorage } from './utils/storage';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';


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
  },
});


@withStyles(styles)
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token:'',
      signUpError: '',
      signInError: '',
      masterError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:''
    };


    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onSignUp = this.onSignUp.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.logout = this.logout.bind(this)

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
         } = this.state ;

    this.setState({
      isLoading: true,
    });
    // post req to backend 
    fetch('/account/signup', { 
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

    fetch('/account/signin', { 
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
          setInStorage('the_main_app', {token: json.token});
          if(json.success){

            this.setState({
              signInError: json.message,
              isLoading:false,
              signInEmail:'',
              signUpPassword:'',
              token:json.token,
            });
          }else{

            this.setState({
              signUpError: json.message,
              isLoading:false
            });
          } 

      });
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
      /*
    fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
    */

    /*
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
      */
  

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
      signUpFirstName
    } = this.state;
    console.log(signUpError);
    if (isLoading){
      return (<div> <p> loading ... </p></div>)
    }

    if(!token){
      return (
        <div>
          <Paper className={this.props.classes.paper}> 
            {
              (signInError) ? (<p> {signInError}</p>) : (null) 
            }

            <p>sign in</p>
            <input 
              type = "email" 
              placeholder = "Email" 
              value = {signInEmail}
              onChange = {this.onTextBoxChangeSignInEmail} />  
              <br/>
            <input 
              type = "password" 
              placeholder = "Password" 
              value = {signInPassword}
              onChange = {this.onTextBoxChangeSignInPassword}/>
          </div>

          <button onClick ={this.onSignIn}> Sign In</button>

          <br/>
          <br/>

          <Paper>
            {
              (signUpError) ? (<p> {signUpError}</p>) : (null) 
            }
            <p>Sign Up !!!!!</p>
            <MyInputBase 
              type = "text" 
              placeholder = "First Name"
              value = {this.state.signUpFirstName}
              onChange = {this.onTextBoxChangeSignUpFirstName}
            />  <br/>
            <MyInputBase 
              type = "text" 
              placeholder = "Last Name"
              value = {signUpLastName}
              onChange = {this.onTextBoxChangeSignUpLastName} 
            /> <br/>
            <MyInputBase 
              type = "email" 
              placeholder = "Email"
              value = {signUpEmail}
              onChange = {this.onTextBoxChangeSignUpEmail}
             />  <br/>
            <MyInputBase 
              type = "password" 
              placeholder = "Password"
              value = {signUpPassword}
              onChange = {this.onTextBoxChangeSignUpPassword}
            /> <br/>
            <button onClick ={this.onSignUp}> Sign Up</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Account </p>
        <button onClick ={this.logout}> Log Out</button>

      </div>

    );
  }
}

export default SignUp;

