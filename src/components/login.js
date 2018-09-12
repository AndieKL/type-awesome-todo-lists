import React from 'react';
import { signIn, signOut } from '../actions';



const Login = () =>
	(
		<div className="login">
			<h2>Log in to view your lists</h2>
			<button className="github btn" onClick={() => signIn('Github')}>
				Log in with GitHub
			</button>
			<button className="facebook btn" onClick={() => signIn('Facebook')}>
				Log in with Facebook
			</button>
			<button className="twitter btn" onClick={() => signIn('Twitter')}>
				Log in with Twitter
			</button>
			<button className="logout btn" onClick={signOut}>Log Out</button>
		</div>
  	);



export default Login;