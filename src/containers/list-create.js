import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../actions';

class AddList extends Component {


	constructor(props) {
		super(props);
		this.state = {
			title: '' ,
			type: 'today',
			items: ['do a thing', 'do another thing']
		}
		this.createList = this.createList.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleItemChange = this.handleItemChange.bind(this);
	}

	handleTitleChange = event => {
    	this.setState({ title: event.target.value });
  	};

  	handleTypeChange = event => {
    	this.setState({ type: event.target.value });
  	};

  	handleItemChange(newArr) {
  		this.setState({items: newArr})
  	}


	createList(e) {
		e.preventDefault();
    	const newList = {
    		title: this.state.title,
    		type: this.state.type
    	}
    	this.props.addList(newList);
  	}

  	


	render() {
		return (
			<form onSubmit={(e) => this.createList(e)}>
				<h2>Create a New List</h2>
				<label className="title-label">List Title</label>
				<input 
					value={this.state.title} 
					className="form-control" 
					name="title" 
					type="text"
					onChange={this.handleTitleChange}
					required />
				<label className="title-label">List Priority</label>
				<select className="form-control"  onChange={this.handleTypeChange}>
					<option value="today">Today</option>
					<option value="this-week">This Week</option>
					<option value="this-month">This Month</option>
					<option value="eventually">Eventually</option>
				</select>
				<button type="submit" className="btn btn-primary">Create</button>
			</form>
		);
	}
}



export default connect(null, { addList })(AddList);