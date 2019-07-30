import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import  {Link} from 'react-router-dom'
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');


class Chat extends Component {

constructor() {
    super();
  this.state = {selectedMonth:'Jan', selectedYear: 2016, data:[],ds:'a',redirect:false,file: null,post:[],mmd:[],message:"hi",connected:false};
    this.getData = this.getData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.message = this.message.bind(this);
    this.sendmessage = this.sendmessage.bind(this);
    this.subscribeToTimer = this.subscribeToTimer.bind(this);
    this.connected = this.connected.bind(this);
    this.connecteddata = this.connecteddata.bind(this);
    this.getmessage = this.getmessage.bind(this);
  }
 async componentDidMount() {
    this.getData(this, '2016');
     const values = queryString.parse(this.props.location.search)
  console.log(values.id);
 /* socket.emit('msg', {message: "msg", sender: values.id,reciever:"room"});*/
/*let msg="k";
 var m=await  socket.on('userSet', function(data) {
   msg = data.username;
  
   console.log(msg);
  });*/
/*
  this.subscribeToTimer((err, timestamp) => this.setState({ 
     mmd:timestamp.username 
  }));*/

this.getmessage(this);
 this.subscribeToTimer((err, timestamp) => this.setState({ 
         mmd:[...this.state.mmd,...timestamp]
         })
 );

this.connected((err, timestamp) => 

  this.connecteddata(this)
 );

  }



  componentWillReceiveProps(nextProps) {
    this.getData(this, '2016');
  }



 subscribeToTimer(cb) {
  socket.on('userSet', timestamp => cb(null, timestamp));
  
}

 connected(cb) {
  socket.on('connected', timestamp => cb(null, timestamp));
  
}

connecteddata(ev){

    axios.post('/issignedin')
      .then(function(response) {
        console.log(response.data.ds);
      if(response.data.ds!="done"){
      ev.setState({redirect:true});
 

    };
      socket.emit('setUsername', {email: response.data.email});
      
        
      });

}

async getData(ev, year){
  await  axios.post('/issignedin')
      .then(function(response) {
        console.log(response.data.ds);
      if(response.data.ds!="done"){
      ev.setState({redirect:true});
 

    };
      socket.emit('setUsername', {email: response.data.email});
         
          ev.setState({post:[...ev.state.post,...response.data.post]});
         console.log(ev.state.data);
        
      });
  
}

onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/videopost", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
        this.getData(this, '2016');
      })
      .catch(error => {
        alert(error);
      });
}


onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

message(e) {
    this.setState({ message: e.target.value });
  }

sendmessage(e) {

      const values = queryString.parse(this.props.location.search)
  console.log(values.id);
      

      axios.post('/message',{message:this.state.message,author:values.id})
      .then(function(response) {
        console.log(response.data);
     

  });


    
  }

  getmessage(e) {
     const values = queryString.parse(this.props.location.search)
  console.log(values.id);

       axios.post('/getmessage',{id:values.id}).then(function(response){
        console.log(response.data);

  e.setState({data:[...e.state.data,...response.data]});

})

    
  }
    
  render() {
    let button;
     let msg;
    if(this.state.redirect==true)
      {
       button=  <Redirect to="app">a</Redirect>;
      }
 
      
    return (
    
      <div className="App">
    
  
    
      {this.file}
        <header >
        <Link to="home">Home</Link><br/>
      <Link to="app">App</Link><br/>
      <Link to="search">Search</Link>
      {button}
         
        <p>Welcome to vartalap by prashant rathi</p>
        {this.state.data.map(({author,message,time})=>{return <p > {author}----{time}<br/>{message}</p>})}
        {this.state.mmd.map(({username,author,time})=>{return <p >{author}----{time}<br/> -{username} </p>})}
    
 
          
         
      
        </header>
        <input type="text" onChange={this.message} />
        <button  onClick={this.sendmessage} >send</button>
      </div>
    );
  }
}

export default Chat;
