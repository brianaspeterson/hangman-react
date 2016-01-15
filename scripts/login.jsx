'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/styles.css';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';



var EmailForm = React.createClass({
	getInitialState: function() {
    	return {email: '', state: ''};
  		},
  	handleEmailChange: function(e) {
    	this.setState({email: e.target.value, state: 'on'});
  		},
	handleSubmit: function(e){
		e.preventDefault();
		var email = this.state.email; 
		if(!email){
			return; 
		}
		this.props.onEmailSubmit({email: email});
		this.setState({email: '', state: 'on'});
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

module.exports = EmailForm;
