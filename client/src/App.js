import React, { Component } from 'react';
import _, {debounce} from 'lodash';
import axios from 'axios';

import SearchBox from './components/searchBox/SearchBox.js'

// import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';


export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = { products: {} }
  }

  callServerSetResult(userInput) {
    axios.get('/api/autocomplete/' + userInput)
    .then((response) => {
      // console.log(response.data); // ex.: { user: 'Your User'}
      // console.log(response.status); // ex.: 200
      this.setState({
        products: response.data
      })
    })
  }

  onUserInput(e) {
    const userInput = e.target.value
    if (userInput === '') {
      this.setState({ products: {} })
      return;
    }

    this.delayedOnUserInput(userInput)
  }

  delayedOnUserInput = debounce(userInput => {
    this.callServerSetResult(userInput)
  }, 200)

  render() {
    return (
      <div className="App container">
        <h1>Personal Capital</h1>
        <SearchBox
          className="col"
          onUserInput={ e => this.onUserInput(e) }
          products={this.state.products}
        />
      </div>
    );
  }
}
