'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/styles.css';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import EmailForm from './login';
import NewGameDetails from './letterEntry';
import DisplayPhrase from './handlePhraseDisplay';


var letterArray = [];
var TitleBox = React.createClass({
	
	handleEmailSubmit: function(email) { //TODO come up with a better name than comment
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: JSON.stringify(email),
	      success: function(data) {
	        this.setState({data: data, showResults:false});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
  	},
  	handleLetterSubmit: function(comment, data) { //TODO come up with a better name than comment
	    $.ajax({
	      url: this.props.url + '/' + data.game_key,
	      dataType: 'json',
	      type: 'POST',
	      data: JSON.stringify(comment),
	      success: function(data) {
	        this.setState({letterData: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
  	},
  	getInitialState: function() {
    return {data: [], showResults: true};
  },
	render: function(){
		return (
			<div className="titleBox">
				<h1>Welcome to Hangman</h1>
			    { this.state.showResults ? <EmailForm onEmailSubmit={this.handleEmailSubmit}  /> : null }
				<NewGameDetails onLetterSubmit={this.handleLetterSubmit} letterData={this.state.letterData} data={this.state.data} />
				<DisplayPhrase data={this.state.letterData} />
			</div>
		);
	}
});


//TODO: show letters that have been guessed
//TODO: css!!!!



ReactDOM.render(
  <TitleBox url="http://hangman.coursera.org/hangman/game" />,
  document.getElementById('content')
);