import React, { Component } from 'react';
import { connect } from "react-redux";
import { signIn, signOut } from '../actions';


class Login extends Component {

	componentWillUpdate(reduxProps) {
		if (reduxProps.user) {
			this.props.history.push("/yourlists");
		}
	}

	render() {
		return (
			<div className="login">
				<h2>Log in to view your lists</h2>
				<button className="github btn" onClick={() => this.props.signIn('Github')}>
					Log in with GitHub
				</button>
				<button className="facebook btn" onClick={() => this.props.signIn('Facebook')}>
					Log in with Facebook
				</button>
				<button className="twitter btn" onClick={() => this.props.signIn('Twitter')}>
					Log in with Twitter
				</button>
			</div>
  		);
	};
}

function mapStateToProps({ user }) {
	return { user };
}

export default connect(mapStateToProps, {signIn, signOut})(Login);