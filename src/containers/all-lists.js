import React,  { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchToDos } from '../actions';
import ListItem from '../components/list-item';

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
	        <div className={`todo-list ${list.type}`} key={index}>
	          <h2>{list.title}</h2>
	          <ul className="list-group list-group-flush">
	          {(list.items).map((item,index) => (
					<ListItem
						key={index}
						item={item} 
						index={index}
				/>))}
	          </ul>
	        </div>
	      );
    	});
	}

	render() {
		if (!this.props.lists) {
			//There are no lists in the user's database
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
	return {
		lists: state.lists
	};
}

export default connect(mapStateToProps, { fetchToDos })(AllLists);