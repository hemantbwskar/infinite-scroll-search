import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import './styles.css'
// import searchImages from "../App"



class Autocomplete extends Component {


  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    // if (e.keyCode === 13) {
    //   setQuery(e.target.value);
    //   setData([]);
    // }
    // this.props.searchImages(e)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;
var searchItems=''
    if (e.keyCode === 13) {
      searchItems=(e.currentTarget.innerText)
      
      
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });

      return{
        searchItems
      }
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <table className="table">
          <ul class="suggestions">
            {filteredSuggestions.slice(0,5).map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
                
              );
            })}
          </ul>
          </table>
        );
      } else {
        suggestionsListComponent = (
            <div></div>
        //   <div class="no-suggestions">
        //     {/* <em>No suggestions, you're on your own!</em> */}
        //   </div>
        );
      }
    }

    return (
      <Fragment>
        <input
        id="userInput"
        placeholder="Search For Images"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          // searchItems={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
