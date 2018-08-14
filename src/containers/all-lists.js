import React,  { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchToDos } from '../actions';

class AllLists extends Component {
	constructor(props) {
		super(props);
		this.renderLists = this.renderLists.bind(this);
	}

	componentDidMount() {
    	this.props.fetchToDos(); 
  	}

	renderLists() {
		return _.map(this.props.lists, (list,index) => {
	      return (
	        <div className={list.type} key={index}>
	          <h2>{list.title}</h2>
	        </div>
	      );
    	});
	}

	render() {
		if (!this.props.lists) {
			console.log('There is no list');
			return (
				<div>
					<h2>Create a new list to get started.</h2>
				</div>
			);
		}
		return this.renderLists();
	}
} 

function mapStateToProps(state) {
	//whatever is returned will show up as props
	return {
		lists: state.lists
	};
}

export default connect(mapStateToProps, { fetchToDos })(AllLists);