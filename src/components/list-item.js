import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleComplete } from '../actions/';

class ListItem extends Component {
	constructor(props){
		super(props);
		this.completed = this.completed.bind(this);
	}

	completed() {
		let itemPath = `${this.props.listName}/items/${this.props.index}/1`;
		this.props.toggleComplete(itemPath, !this.props.complete);
	}

	render() {
		return(
			<li onClick={this.completed} className={(this.props.complete) ? "list-group-item true":"list-group-item"} key={this.props.index} title="Click to toggle strikethrough.">
				{this.props.item}
			</li>
		)
	};
}

export default connect(null, { toggleComplete })(ListItem);
