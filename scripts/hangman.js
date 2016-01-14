import React from 'react';
import ReactDOM from 'react-dom';
import '../css/styles.css';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';


var TitleBox = React.createClass({
	handleEmailSubmit: function(comment) { //TODO come up with a better name than comment
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: JSON.stringify(comment),
	      success: function(data) {
	        this.setState({data: data});
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
    return {data: []};
  },
	render: function(){
		return (
			<div className="titleBox">
				<h2>Hangman</h2>
				<h3>Enter Your Email Below</h3>
				<EmailForm onEmailSubmit={this.handleEmailSubmit} />
				<NewGameDetails onLetterSubmit={this.handleLetterSubmit} data={this.state.data} />
				<DisplayPhrase data={this.state.letterData} />
			</div>


			);
	}
});

var EmailForm = React.createClass({
	getInitialState: function() {
    	return {email: ''};
  		},
  	handleEmailChange: function(e) {
    	this.setState({email: e.target.value});
  		},
	handleSubmit: function(e){
		e.preventDefault();
		var email = this.state.email; //TODO: sanitize email to make sure its valid format
		if(!email){
			return; //TODO :make something come up when no email
		}
		this.props.onEmailSubmit({email: email});
		this.setState({email: ''});
	},

	render: function(){
		return (
			<form className="emailForm" onSubmit={this.handleSubmit}>
				<TextField  type="email" name="email" hintText="example@example.com" value={this.state.email} onChange={this.handleEmailChange} required/>
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
		if (gameData.state === 'alive'){
		return(
			<div>
		<div className="newGameDetails">
		<h2>New Game Below</h2>
		</div>
		<form className="letterForm" onSubmit={this.handleSubmit}>
				<input type="text" name="guess" placeholder="letter(a-z)" value={this.state.guess} onChange={this.handleLetterChange} required pattern="[A-Za-z]" />
				<input type="submit" value="Post" />
			</form>
		</div>

		);
	}
	else{
		return(
			<div className="newGameDetails">
		<h2> Game not started</h2>
		</div>

			)
	}
	}
});

//Display phrase
var DisplayPhrase = React.createClass({
	
	render: function(){
	var letterData = this.props.data;

	if (letterData && letterData.num_tries_left !== "-1" && letterData.state !== "won"){

		return(
			<div className="displayPhrase">
			<p>Phrase: {letterData.phrase}</p>
			<p>Guesses Left: {letterData.num_tries_left}</p>
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
			You won!
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

//TODO: seperate phrase underscores
//TODO: display hangman
//TODO: show letters that have been guessed
//TODO: put logic to make sure you cant guess the same letters over and over again
//TODO: css!!!!




//Display hangman drawing

ReactDOM.render(
  <TitleBox url="http://hangman.coursera.org/hangman/game" />,
  document.getElementById('content')
);