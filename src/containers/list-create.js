import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { noBlanks } from '../helpers'; //used to filter array of to-do items
import { addList, activeList } from '../actions';  //add the new list of items to the Application state
import ListItemInput from '../components/list-item-input'; //render and manage individual to-do items

class AddList extends Component {
	constructor(props) {
		super(props);
		//local state collects user information to be passed as complete object 
		//to application state on form submit
		this.state = {
			title: '' ,
			type: 'priority1', 
			items: [['', false]], //boolean represents if to-do item is complete
			heading: 'Create a New List'
		}
		this.createList = this.createList.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleItemChange = this.handleItemChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
	}

	//if this form was called by an edit button, the component state has been passed as props
	//check for those props and assign values as appropriate
	//will populate the form with the existing information
	componentDidMount() {
		if (this.props.lists) {
			let list = this.props.lists[this.props.active];
			if (list !== undefined) {
				this.setState({title: list.title});
				this.setState({type: list.type});
				this.setState({items: list.items});
				this.setState({heading: 'Edit List'});
			}
		}
	}

/*CHANGE HANDLERS & IN-FORM BUTTONS*/
	handleTitleChange = event => {
    	this.setState({ title: event.target.value });
  	};

  	handleTypeChange = event => {
    	this.setState({ type: event.target.value });
  	};

  	/*note on item change:
  		if editing an existing item, the complete boolean doesn't maintain true if item was struck. 
  		Just a design choice, if you're editing a crossed off item, surely it's not actually complete?
  	*/
  	handleItemChange = (item,index) => {
  		let newArr = this.state.items;
  		newArr[index] = [item,false];
  		this.setState({items:newArr});
  	};

  	addItem = (e) => {
  		e.preventDefault();
  		let newArr = this.state.items;
  		newArr.push(['', false]);
  		this.setState({items:newArr});
  	};

  	removeItem = (index) => {
  		//if we are removing the last item, we still want one empty string in the array for rendering purposes
  		if ((this.state.items).length === 1) this.setState({ items: [['',false]] });
  		else {
	  		let newArr = this.state.items;
	  		newArr.splice(index,1);
	  		this.setState({items:newArr});
  		}
  	};

  	//change the active list to null then return to the display lists screen
  	closeWindow = () => {
  		this.props.activeList(null);
  		this.props.history.push("/yourlists");
  	}
  /*END OF HANDLERS & BUTTONS*/

  	//Submit Form: take the local state object and pass it to the application state via action addList
  	createList(e) {
  		e.preventDefault();

  		if (this.state.items[0][0] === '') {
  			alert("You must have at least one item in your to-do list. Please add an item or press cancel.")
  		}

  		else {

  		//don't send any empty items to the database 
  		let newArr = this.state.items;
  		newArr = newArr.filter(noBlanks);

  		//create the new list from the component state pieces
    	const newList = {
    		title: this.state.title,
    		type: this.state.type,
    		items: newArr
    	}
    	
    	//the name is the database key for this particular list
    	//if we're editing the active List will be a string, else it'll be null or a default redux proxy object
    	let name = this.props.active;
    	if ((typeof name) !== "string") 
    		{ name = "list" + Date.now(); }

    	//finally, run the action addList and redirect to the display lists screen
    	this.props.addList(this.props.user.uid,newList,name).then(this.closeWindow);
    	}
  	}



  	
	render() {
		return (
			<form className="create-list-form" onSubmit={(e) => this.createList(e)}>
				<h2>{this.state.heading}</h2>

				<label className="title-label">List Title</label>
				<input 
					value={this.state.title} 
					className="form-control" 
					name="title" 
					type="text"
					onChange={this.handleTitleChange}
					required />

				<label className="title-label">List Priority</label>
				<select className="form-control"  value={this.state.type} onChange={this.handleTypeChange}>
					<option value="priority1">Today</option>
					<option value="priority2">This Week</option>
					<option value="priority3">This Month</option>
					<option value="priority4">Eventually</option>
				</select>
				<label className="title-label">Things To Do</label>
				{(this.state.items).map((item,index) => (
					<ListItemInput
						key={index}
						changeHandler={this.handleItemChange}
						removeItem={this.removeItem}
						item={item[0]} 
						index={index}
						add={this.addItem}
					/>))}
				<button className="btn btn-secondary btn-block btn-sm" onClick={this.addItem}>Add Item</button>
				<button type="submit" className="btn btn-primary">Save</button>
				<button className="btn btn-primary" onClick={this.closeWindow}>Cancel</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		lists: state.lists,
		user: state.user,
		active: state.activeList
	};
}


export default connect(mapStateToProps, { addList, activeList })(AddList);