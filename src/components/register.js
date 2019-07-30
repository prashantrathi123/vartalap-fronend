import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import  {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import querystring from 'querystring';

import axios from 'axios';
import '../App.css';

class Register extends Component {

constructor() {
    super();
  this.state = {selectedMonth:'Jan', selectedYear: 2016, data: [],ds:'a',redirect:false};
    this.getData = this.getData.bind(this);
    this.userlogin = this.userlogin.bind(this);
     this.log = this.log.bind(this);
  }
  componentDidMount() {
    this.getData(this, '2016');
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, '2016');
  }
  getData(ev, year){
    axios.post('/main')
      .then(function(response) {
     
        
        ev.setState({ds: response.data.ds});

        
      });}

      log(){
        this.userlogin(this);
      };
  
  userlogin(ev){

    axios.post('/register', querystring.stringify(
      {name: document.getElementsByName("name")[0].value,
      email: document.getElementsByName("email")[0].value,
          username:document.getElementsByName("username")[0].value,
          password:document.getElementsByName("password")[0].value,
          password2:document.getElementsByName("password2")[0].value}),
     {headers:{"Content-Type": "application/x-www-form-urlencoded"}})
      .then(function(response){
      ev.setState({redirect:true})
    })
     }    


  render() {let button;
    if(this.state.redirect==true)
      {
       button=  <Redirect to="/app"/>;
      }
      else{
       
      }

    return (
      <div >
      
        <header >
        <Link to="home">Home</Link><br/>
      <Link to="app">App</Link><br/>

{button}
<p>{this.state.redirect}</p>
        <div className="login-container register-screen">
       
        
        <div className="form-group">
            <input type="text" placeholder="Full Name" name="name" required/>
        </div>

        <div className="form-group">
            <input type="email" placeholder="Email Id"  name="email"  id="indexMail" required/>
        </div>
        <div className="form-group">
            <input type="tel" placeholder="Mobile Number"  name="username" id="pno"  required/>
        </div>

        <div className="form-group">
            <input type="password" name="password" id="indexPass" required placeholder="Password"/>
        </div>
        <div className="form-group">
            <input type="text" placeholder="Confirm Password" name="password2"/>
        </div>

        
       
        <div className="form-group"><button onClick={this.log}>Sign up</button></div>


       
        <div className="dont-have-account"></div>
        <div className="copy-right-text">Copywright@ vartalap 2019 All rights reserved </div>
    </div>
          <a>{this.state.ds}</a>
        </header>
      </div>
    );
  }
}

export default Register;
