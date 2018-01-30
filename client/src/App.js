import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';

import SearchBox from './components/searchBox/SearchBox.js'

// import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';


export default class App extends Component {
  state = { suggestions: [] }
  // componentDidMount() {
  //   fetch('/users')
  //   .then(res => res.json())
  //   .then(users => this.setState({ users }))
  // }

  callServerSetResult(userInput) {
    axios.get('/api/autocomplete/' + userInput)
    .then((response) => {
      console.log(response.data); // ex.: { user: 'Your User'}
      console.log(response.status); // ex.: 200
      this.setState({
        suggestions: response.data.products
      })
    });
  }

  onUserInput(e) {
    const userInput = e.target.value
    if (userInput === '') { return; }

    this.callServerSetResult(userInput)

    // const that = this
    // debounce(that.callServerSetResult(), 0)
  }

  render() {
    return (
      <div className="App container">
        <SearchBox
          className="col"
          onUserInput={e => this.onUserInput(e)}
          suggestions={this.state.suggestions}
        />
      </div>
    );
  }
}
