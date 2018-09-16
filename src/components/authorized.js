import React, { Component } from 'react';
import { connect } from 'react-redux';

/* 
A higher order component that ensures the only accessible route 
when there is no signed in user is the login component 
ie. if a user types the route directly into their browser, they are still redirected to login
thanks to Bernard Bado for this component:
https://medium.com/quick-code/adding-authentication-to-react-redux-firebase-app-f0efcb1c519a
*/

export default function(AppComponent) {
	class Authorized extends Component {

		//authenticated = state.user
		//if null, directed to login component (route '/')
		componentWillMount() {
			if (this.props.authenticated === null) {
				this.props.history.push("/");
			}
		};

		componentWillUpdate(reduxProps) {
			if(!reduxProps.authenticated) {
				this.props.history.push("/");
			}
		};

		//if authenticated is not null, the requested component will render
		render() {
			if (this.props.authenticated) {
				return <AppComponent {...this.props} />;
			}
			return null;
		}
	}


	function mapStateToProps(state) {
		return { authenticated: state.user };
	}

	return connect(mapStateToProps)(Authorized);
}