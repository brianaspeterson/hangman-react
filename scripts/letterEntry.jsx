'use strict';
import '../css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import AlreadyUsedLetters from './lettersUsed';

var NewGameDetails = React.createClass({
	getInitialState: function() {
    	return {guess: '', realLetter: ''};
  		},
  	handleSubmit: function(e){
  		var gameData = this.props.data,
  		    guess = this.state.guess; 
		e.preventDefault();
		if(!guess){
			return; 
		}
		this.props.onLetterSubmit({guess: guess}, gameData);
		this.setState({guess: '', realLetter: guess});

	},	
  	handleLetterChange: function(e) {
    	this.setState({guess: e.target.value, realLetter: ''});
  		},
	render: function(){
		var gameData = this.props.data,
		    letterData = this.props.letterData,
		    curData;
		if(letterData){
			 curData = letterData;
			}
		else{
		     curData = gameData;
			}
		if (curData.state === 'alive'){
			return(
				<div className="newGameDetails" >
					<AlreadyUsedLetters  letter={this.state.realLetter} />
					<br />
					<RaisedButton linkButton={true} href="." label="Start Over" /><br /><br />
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

module.exports = NewGameDetails;