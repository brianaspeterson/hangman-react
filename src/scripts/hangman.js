var TitleBox = React.createClass({
	handleEmailSubmit: function(comment) {
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
  	getInitialState: function() {
    return {data: []};
  },
	render: function(){
		return (
			<div className="titleBox">
				<h2>Hangman</h2>
				<h3>Enter Your Email Below</h3>
				<EmailForm onEmailSubmit={this.handleEmailSubmit}/>
				<NewGameDetails data={this.state.data}/>
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

	render: function(){
		var gameData = this.props.data;
		if (gameData.state === 'alive'){
		return(
		<div className="newGameDetails">
		<h2>New Game Below</h2>
		<p>{gameData.game_key}</p>
		<p>{gameData.phrase}</p>
		<p>{gameData.num_tries_left}</p>
		<p>{gameData.state}</p>
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