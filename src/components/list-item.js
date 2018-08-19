import React, { Component } from 'react';

export default class ListItem extends Component {

	render() {
		return(
			<li className="list-group-item" key={this.props.index}>
				{this.props.item}
				<button className="btn btn-graphic" title="Complete">{<p>&#x2713;</p>}</button>
			</li>
		)
	};
}