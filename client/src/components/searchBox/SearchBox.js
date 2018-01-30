import React, { Component } from 'react';

import './SearchBox.css';


export default class Searchbox extends Component {
  constructor(props) {
    super(props)
    this.state = { userInput: '' }
  }

  highlightMatchingString(suggestionName, highlightLength) {
    const highlighted = suggestionName.substring(0, highlightLength)
    const notHighlighted = suggestionName.substring(highlighted.length)

    // console.log(this.refs.userInput.value)
    // console.log(this.props.suggestions)
    return <span><b>{highlighted}</b>{notHighlighted}</span>
  }

  renderASuggestion(suggestion) {
    const userInput = this.refs.userInput.value
    const suggestionNameBeginning = suggestion.name.substring(0, userInput.length)
    const type = suggestion.type.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ').toLowerCase()

    if (userInput.toLowerCase() !== suggestionNameBeginning.toLowerCase()) {
      return ''
    }

    return (
      <a key={suggestion.name}
        className="list-group-item list-group-item-action"
        href={suggestion.url}>
        <div className="row">
          <div className="col">{this.highlightMatchingString(suggestion.name, suggestionNameBeginning.length)}</div>
          <div className="col suggestionType text-info">{type}</div>
        </div>
      </a>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="input-group input-group-lg">
          <input type="text"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onKeyUp={this.props.onUserInput}
            ref="userInput"
            placeholder="search institution name"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">Search</button>
            </div>
        </div>
        <div className="suggestions">
          {this.props.suggestions.map(suggestion => {
            return this.renderASuggestion(suggestion)
          })}
        </div>
      </div>
    )
  }
}
