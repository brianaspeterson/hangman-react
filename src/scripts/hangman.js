'use strict'
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
  	handleLetterSubmit: function(comment) { //TODO come up with a better name than comment
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: comment,
	      success: function(data) {
	        this.setState({data: data});
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
				<NewGameDetails onLetterSubmit={this.handleLetterSubmit} data={this.state.data} url="http://hangman.coursera.org/hangman/game">
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
				<input type="text" name="email" placeholder="example@example.com" value={this.state.email} onChange={this.handleEmailChange}/>
				<input type="submit" value="Post" />
			</form>
			);
	}


});

var NewGameDetails = React.createClass({
	getInitialState: function() {
    	return {guess: ''};
  		},
  	handleSubmit: function(e){
		e.preventDefault();
		var guess = this.state.guess; //TODO: sanitize email to make sure its valid format
		if(!guess){
			return; //TODO :make something come up when no email
		}
		this.props.onLetterSubmit({guess: guess});
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
		<p>{gameData.game_key}</p>
		<p>{gameData.phrase}</p>
		<p>{gameData.num_tries_left}</p>
		<p>{gameData.state}</p>
		</div>
		<form className="letterForm" onSubmit={this.handleSubmit}>
				<input type="text" name="guess" placeholder="letter(a-z)" value={this.state.guess} onChange={this.handleLetterChange}/>
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

ReactDOM.render(
  <TitleBox url="http://hangman.coursera.org/hangman/game" />,
  document.getElementById('content')
);