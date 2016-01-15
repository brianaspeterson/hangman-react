'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/styles.css';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

var iconStyles = {
  marginRight: 24,
};
var TitleBox = React.createClass({


	//have a state in here, determines if start game was clicked, once its clicked it dissapears, will have to add the ability to start a game(b
		//button) somewhere else
	
	handleEmailSubmit: function(comment) { //TODO come up with a better name than comment
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: JSON.stringify(comment),
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

var EmailForm = React.createClass({
	getInitialState: function() {
    	return {email: '', state: ''};
  		},
  	handleEmailChange: function(e) {
    	this.setState({email: e.target.value, state: "on"});
  		},
	handleSubmit: function(e){
		e.preventDefault();
		var email = this.state.email; //TODO: sanitize email to make sure its valid format
		if(!email){
			return; //TODO :make something come up when no email
		}
		this.props.onEmailSubmit({email: email});
		this.setState({email: '', state: "on"});
	},

	render: function(){
		return (
			
			<form className="emailForm" onSubmit={this.handleSubmit}>
				<TextField type="email" name="email" hintText="Enter your email to start!" value={this.state.email} onChange={this.handleEmailChange} required/>
				<RaisedButton type="submit" value="Post" label="Start Game" />
			</form>
			);
	}
	


});

var NewGameDetails = React.createClass({
	getInitialState: function() {
    	return {guess: ''};
  		},
  	handleSubmit: function(e){
  		var gameData = this.props.data;

		e.preventDefault();
		var guess = this.state.guess; 
		if(!guess){
			return; 
		}
		this.props.onLetterSubmit({guess: guess}, gameData);
		this.setState({guess: ''});
	},	
  	handleLetterChange: function(e) {
    	this.setState({guess: e.target.value});
  		},
	render: function(){
		var gameData = this.props.data;
		var letterData = this.props.letterData;
		if(letterData){
			var curData = letterData;
		}
		else{
			curData = gameData;
		}
		if (curData.state === 'alive'){
		return(
			<div>
				<div className="newGameDetails">
				</div>

				<RaisedButton linkButton={true} href="." label="Start Over" />
				<br />
				<br />
				<form className="letterForm" onSubmit={this.handleSubmit}>
						<TextField type="text" name="guess" hintText="Enter a letter(A-Z)" value={this.state.guess} onChange={this.handleLetterChange} required pattern="[A-Za-z]" />
						<RaisedButton type="submit" value="Post" label="Submit"/>
					</form>
			</div>
			);
	}
	else{
		return(
			<div />
			);
	}
	}
});

var DisplayPhrase = React.createClass({
	
	render: function(){
	var letterData = this.props.data;

	
	if (letterData && letterData.num_tries_left !== "-1" && letterData.state !== "won"){
		var numTries = parseInt(letterData.num_tries_left,10) +1;
		return(
			<div className="displayPhrase">
			<p>Phrase: {letterData.phrase} Guesses Left: {numTries}</p>
			<DisplayHangman data={letterData} />
			</div>
			);
		}
	else if (letterData && letterData.num_tries_left === "-1"){
		return(
			<div className="displayPhrase">
			You Lost!
			</div>
			);
	}
	else if (letterData && letterData.state === "won"){
		return(
			<div className="displayPhrase">
			<p>Phrase: {letterData.phrase} Guesses Left: {numTries}</p>
			<p>You won!</p>
			</div>
			);
	}
	else {
		return(
			<div className="displayPhrase">
			</div>
			);
		}
	}

});

var DisplayHangman = React.createClass({
	render: function(){
		var letterData = this.props.data;
		var numTries = letterData.num_tries_left;
		switch(numTries){
			case "-1":
				return(
					<div>
					<div className="gallowOverhead">
					<div className="gallowHang" />
					<div className="gallowTorso" />
					<div className="head" />
					<div className="torso" />
					<div className="leftArm" />
					<div className="rightArm" />
					<div className="leftLeg" />
					<div className="rightLeg" /> 
					</div>
					
					</div>
					);
				case "0":
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowHang" />
					<div className="gallowTorso" />
					<div className="head" />
					<div className="torso" />
					<div className="leftArm" />
					<div className="rightArm" />
					<div className="leftLeg" />
					<div className="rightLeg" /> 

					</div>
					);
				case "1":
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowHang" />
					<div className="gallowTorso" />
					<div className="head" />
					<div className="torso" />
					<div className="leftArm" />
					<div className="rightArm" />
					</div>
					);
				case "2":
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowHang" />
					<div className="gallowTorso" />
					<div className="head" />
					<div className="torso" />
					<div className="leftArm" />
					</div>
					);

				case "3":
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowHang" />
					<div className="gallowTorso" />
					<div className="head" />
					<div className="torso" />
					</div>
					);
				case "4":
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowHang" />
					<div className="gallowTorso" />
					<div className="head" />
					</div>
					);
				case "5":
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowHang" />
					<div className="gallowTorso" />
					</div>
					);
				default:
				return(
					<div>
					<div className="gallowOverhead" />
					<div className="gallowTorso"> 
					<div className="gallowHang" />

					</div>
					</div>
			);



	}

}

});

//TODO: hamburger menu with start over
//TODO: show letters that have been guessed
//TODO: css!!!!



ReactDOM.render(
  <TitleBox url="http://hangman.coursera.org/hangman/game" />,
  document.getElementById('content')
);