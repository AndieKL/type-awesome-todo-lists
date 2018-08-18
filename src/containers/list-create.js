import React, { Component } from 'react';
import { connect } from 'react-redux';

import { noBlanks } from '../helpers'; //used to filter array of to-do items
import { addList } from '../actions';  //add the new list of items to the Application state
import ListItemInput from '../components/list-item-input'; //render and manage individual to-do items

class AddList extends Component {

 
	constructor(props) {
		super(props);
		//local state collects user information to be passed as complete object 
		//to application state on form submit
		this.state = {
			title: '' ,
			type: 'today',
			//currently hard coded, need to be able to add, remove, edit, individual items
			items: ['']
		}
		this.createList = this.createList.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleItemChange = this.handleItemChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	handleTitleChange = event => {
    	this.setState({ title: event.target.value });
  	};

  	handleTypeChange = event => {
    	this.setState({ type: event.target.value });
  	};

  	handleItemChange = (item,index) => {
  		let newArr = this.state.items;
  		newArr[index] = item;
  		this.setState({items:newArr});
  	};

  	addItem = (e) => {
  		e.preventDefault();
  		let newArr = this.state.items;
  		newArr.push('');
  		this.setState({items:newArr});
  	};

  	removeItem = (index) => {
  		//if we are removing the last item, we still want one empty string in the array for rendering purposes
  		if ((this.state.items).length === 1) this.setState({items:[""]});
  		else {
	  		let newArr = this.state.items;
	  		newArr.splice(index,1);
	  		this.setState({items:newArr});
  		}
  	};
  	
  	//take the local state object and pass it to the application state via action addList
	createList(e) {
		e.preventDefault();

		//don't send any empty items to the database
		let newArr = this.state.items;
		this.setState({items: (newArr.filter(noBlanks))});

    	const newList = {
    		title: this.state.title,
    		type: this.state.type,
    		items: this.state.items
    	}
    	//pass new list to the addList action
    	this.props.addList(newList).then(this.props.close());

  	}

  	
	render() {
		return (
			<form className="create-list-form" onSubmit={(e) => this.createList(e)}>
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
				<label className="title-label">Things To Do</label>
				{(this.state.items).map((item,index) => (
					<ListItemInput
						key={index}
						changeHandler={this.handleItemChange}
						removeItem={this.removeItem}
						item={item} 
						index={index}
					/>))}
				<button className="btn btn-secondary btn-block btn-sm" onClick={this.addItem}>Add Item</button>
				<button type="submit" className="btn btn-primary">Create</button>
				<button className="btn btn-primary" onClick={this.props.close}>Cancel</button>
			</form>
		);
	}
}


export default connect(null, { addList })(AddList);