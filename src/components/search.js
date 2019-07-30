import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import  {Link} from 'react-router-dom'
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom'



class Search extends Component {

constructor() {
    super();
  this.state = {selectedMonth:'Jan', selectedYear: 2016, data:[],ds:'a',redirect:false,file: null,post:[],logedinemail:'',chatemail:'h',userlist:[]};
    this.getData = this.getData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.creategroup = this.creategroup.bind(this);
     this.setgroup = this.setgroup.bind(this);
    
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
      if(response.data.ds!="done"){
      ev.setState({redirect:true});
 

    };

         ev.setState({data:[...ev.state.data,...response.data.chat]});
         ev.setState({userlist:[...ev.state.userlist,...response.data.w]});
          ev.setState({post:[...ev.state.post,...response.data.post]});
          ev.setState({logedinemail:response.data.email});
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

creategroup(e){
  this.setState({chatemail:e.target.value});
}

setgroup(e){
  
  let rs={
     conversationname:"single",
     members:[this.state.logedinemail,this.state.chatemail],
  }

    axios.post('/creategroup',rs)
      .then(function(response) {
        console.log(response.data);
  
        
      }); 
}     
    
render() {
    let button;
   
    if(this.state.redirect==true)
      {
       button=  <Redirect to="app">a</Redirect>;
      }
     
      
    return (
    
      <div className="App">
    
     
    
      {this.file}
        <header >
         <Link to="all">All</Link><br/>
        <Link to="home">Home</Link><br/>
      <Link to="app">App</Link><br/>
      <Link to="search">Search</Link>
      {button}<br/>
         
    
       
       <select onChange={this.creategroup}> 
        <option value="select email">select email</option>
       {this.state.userlist.map(({email})=>{
        if(email!=this.state.logedinemail){
         return <option value={email}>{email}</option>
        }

        })}</select>
       <button onClick={this.setgroup}>select an email to start chat</button>
        {this.state.data.map(({id,conversationname,members})=>{
          let lk='j';
           if(conversationname=="single"){
            if(this.state.logedinemail==members[0]){
              lk=members[1];
            }else{
              lk=members[0];
            }
           }
           let chatlink="chat?id="+id;
          return  <p ><Link to={chatlink}> {lk}</Link></p>})}<br/>

          
       
        </header>
      </div>
    );
  }
}

export default Search;
