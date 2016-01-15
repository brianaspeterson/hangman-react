'use strict';
import '../css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';

var letterArray = [];

var AlreadyUsedLetters = React.createClass({
	render: function(){
		var letter = this.props.letter;
		if(letterArray.indexOf(letter) === -1){
			letterArray.push(letter);
			letterArray.push('   ');
		}
		return(
			<div className="lettersDisplay">
				Letters Already Guessed: {letterArray}
			</div>

			);
	}


});

module.exports = AlreadyUsedLetters;