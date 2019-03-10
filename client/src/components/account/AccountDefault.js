import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage,
        setInStorage } from '../utils/storage';
import { Redirect } from 'react-router-dom'


class AccountDefault extends Component {
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
      signUpPassword:'',
      showSignIn:true
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
            this.props.getToken(json.token);
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
    // if (isLoading){
    //   return (<div> <p> loading ... </p></div>)
    // }

    if(!token){
      return (
        <div>
          <div> 
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

          <div>
            {
              (signUpError) ? (<p> {signUpError}</p>) : (null) 
            }
            <p>sign up</p>
            <input 
              type = "text" 
              placeholder = "First Name"
              value = {this.state.signUpFirstName}
              onChange = {this.onTextBoxChangeSignUpFirstName}
            />  <br/>
            <input 
              type = "text" 
              placeholder = "Last Name"
              value = {signUpLastName}
              onChange = {this.onTextBoxChangeSignUpLastName} 
            /> <br/>
            <input 
              type = "email" 
              placeholder = "Email"
              value = {signUpEmail}
              onChange = {this.onTextBoxChangeSignUpEmail}
             />  <br/>
            <input 
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
        <p>Sign In Successfully! </p>
        <Redirect to="/" />
      </div>

    );
  }
}

export default AccountDefault;

