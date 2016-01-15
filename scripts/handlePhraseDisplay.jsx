'use strict';
import '../css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';
import DisplayHangman from './handleHangmanDisplay';


var DisplayPhrase = React.createClass({
	
	render: function(){
	var letterData = this.props.data;

	
	if (letterData && letterData.num_tries_left !== '-1' && letterData.state !== 'won'){
		var numTries = parseInt(letterData.num_tries_left,10) +1;
		return(
			<div className="displayPhrase">
			Phrase: {letterData.phrase} Guesses Left: {numTries}
			<DisplayHangman data={letterData} />
			</div>
			);
		}
	else if (letterData && letterData.num_tries_left === "-1"){
		return(
			<div>
				<div className="displayPhrase">
					<p>You Lost!</p>
				</div>
				<RaisedButton linkButton={true} href="." label="Start Over" />
			</div>
			);
	}
	else if (letterData && letterData.state === "won"){
		return(
			<div>
				<div className="displayPhrase">
					<p>Phrase: {letterData.phrase}</p>
					<p>You won!!!!</p>
				</div>
		   	 	<RaisedButton linkButton={true} href="." label="Start Over" />
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

module.exports =DisplayPhrase;