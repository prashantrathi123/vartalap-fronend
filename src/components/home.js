import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import  {Link} from 'react-router-dom'
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom'



class Home extends Component {

constructor() {
    super();
  this.state = {selectedMonth:'Jan', selectedYear: 2016, data:[],ds:'a',redirect:false,file: null,post:[]};
    this.getData = this.getData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    
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
        
         ev.setState({data:[...ev.state.data,...response.data.w]});
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
   
    
  render() {
    let button;
   let bt= this.state.post.map(({email,posts})=>{
    return <p > {
         posts.map(({likes,posts,caption,time})=>{
                 return <p>{email}<br/> {posts.map(({filename,mimetype})=>{
                     if(mimetype=="image/jpeg")
                      {
                          let fs="uploads/"+filename;

                         return<p><img src= {fs}></img></p>
                      }
                    else
                     {
                        let fs="video?path=views/uploads/"+filename;
                        return <p><video id="videoPlayer" controls muted="muted" autoPlay> 
                        <source src={fs} type="video/mp4" />
                        </video> </p>
                     }

                  })
           } time- {time} <br/> caption- {caption} </p>
       })
    }
     
     </p>

  });
    if(this.state.redirect==true)
      {
       button=  <Redirect to="app">a</Redirect>;
      }

      
    return (
    
      <div className="App">
      
       <p>welcome to vartalap by prashant rathi</p>
      <form onSubmit={this.onFormSubmit}>
        <h1>Post Upload</h1>
          <input type="file" name="myFile" class="ed" onChange={this.onChange} id="myFile" required />
        <button type="submit">Upload</button>
      </form>
      {this.file}
        <header >
        <Link to="all">All</Link><br/>
        <Link to="home">Home</Link><br/>
      <Link to="app">App</Link><br/>
      <Link to="search">Search</Link>
      {button}
         
   
        

          {bt}
         
      
        </header>
      </div>
    );
  }
}

export default Home;
