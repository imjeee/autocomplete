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
    return <span>{highlighted}<b>{notHighlighted}</b></span>
  }

  renderACategory(categoryName, productsInThisCategory, index) {

    var prettyCategoryName = categoryName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ').toLowerCase()

    return (
      <div key={categoryName + '-' + index} className="category">
        <div className="categoryName text-primary">{prettyCategoryName}</div>
        <ul className="list-group list-group-flush">
          {productsInThisCategory.map((product, index) => {
            return this.renderASuggestion(product, index)
          })}
        </ul>
      </div>
    )
  }

  renderASuggestion(suggestion, index) {
    const userInput = this.refs.userInput.value
    const suggestionNameBeginning = suggestion.name.substring(0, userInput.length)
    const type = suggestion.type.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ').toLowerCase()

    if (userInput.toLowerCase() !== suggestionNameBeginning.toLowerCase()) {
      return ''
    }

    return (
      <a key={suggestion.name + '-' + suggestion.type + '-' + index}
        className="list-group-item list-group-item-action list-group-no-border"
        href={suggestion.url}>
        <div className="row">
          <div className="col">{this.highlightMatchingString(suggestion.name, suggestionNameBeginning.length)}</div>
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
        <div className="suggestions card">
            {Object.keys(this.props.products).map((categoryName, index) => {
              return this.renderACategory(categoryName, this.props.products[categoryName], index)
            })}
        </div>
      </div>
    )
  }
}

// {this.props.products.map((suggestion, index) => {
//   return this.renderASuggestion(suggestion, index)
// })}
