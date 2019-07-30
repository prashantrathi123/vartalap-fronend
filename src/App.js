import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import axios from 'axios';
import '../App.css';

class App extends Component {

constructor() {
    super();
  this.state = {selectedMonth:'Jan', selectedYear: 2016, data: [],ds:'a'};
    this.getData = this.getData.bind(this);
    
  }
  componentDidMount() {
    this.getData(this, '2016');
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, '2016');
  }
  getData(ev, year){
    axios.get('http://localhost:8000/main?year="b"')
      .then(function(response) {
        this.setState({ds: 'response'});
        
      });}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a>{this.state.ds}</a>
        </header>
      </div>
    );
  }
}

export default App;
