import React, { Component } from 'react';

//if this is a presentation component and not a container the toggleComplete should be passed from all-lists (the parent container)
import { connect } from 'react-redux';
import { toggleComplete } from '../actions/';

class ListItem extends Component {
	constructor(props){
		super(props);
		this.completed = this.completed.bind(this);
	}

	completed() {
		let itemPath = `${this.props.listName}/items/${this.props.index}/1`;
		this.props.toggleComplete(this.props.user.uid,itemPath, !this.props.complete);
	}

	render() {
		return(
			<li onClick={this.completed} className={(this.props.complete) ? "list-group-item true":"list-group-item"} key={this.props.index} title="Click to toggle strikethrough.">
				{this.props.item}
			</li>
		)
	};
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { toggleComplete })(ListItem);
