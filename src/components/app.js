import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import  {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import axios from 'axios';
import '../App.css';
import querystring from 'querystring';


class App extends Component {

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
       axios.post('/issignedin')
      .then(function(response) {
        console.log(response.data.ds);
      if(response.data.ds=="done"){
      ev.setState({redirect:true});
 

    };
        
      });

    }

      log(){
        this.userlogin(this);
      };
  
  userlogin(ev){

    axios.post('/login', querystring.stringify(
      {
     
          username:document.getElementsByName("username")[0].value,
          password:document.getElementsByName("password")[0].value,
         }),
     {headers:{"Content-Type": "application/x-www-form-urlencoded"}})
    .then(function(response){
      if(response.data.ds=="done"){
      ev.setState({redirect:true});
       

    }
      
    });
  }     


  render() {let button;
    if(this.state.redirect==true)
      {
       button=  <Redirect to="home">a</Redirect>;
      }
      else{
       
      }

    return (
      <div >
      
        <header >
        <Link to="home">Home</Link><br/>
      <Link to="app">App</Link><br/>
      <Link to="register">Register</Link><br/>

{button}
<p>{this.state.redirect}</p>
        
          <input type="text" placeholder="username" name="username" /><br/>
          <input type="text" placeholder="password" name="password" /><br/>
          <button onClick={this.log}>Sign in</button>
          <a>{this.state.ds}</a>
        </header>
      </div>
    );
  }
}

export default App;
