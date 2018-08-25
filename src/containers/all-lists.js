import React,  { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchToDos, removeList } from '../actions';
import ListItem from '../components/list-item';
import AddList from './list-create.js';

class AllLists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:true,
			list:'',
			listKey: ''
		}
		this.renderLists = this.renderLists.bind(this);
		this.edit = this.edit.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
	}

	//run action to fetch data from Firebase
	componentDidMount() {
    	this.props.fetchToDos(); 
  	}

  	//toggles between showing all lists and editing a particular list
  	toggleShow() {
  		this.setState({show: !(this.state.show)});
  	}

  	toggleComplete(index,key) {

  	}

  	/*when edit button is clicked, a copy of the list is set to state, we switch to edit mode, 
  	and pass the current list to the edit form*/
  	edit(listKey) {
  		this.setState({ listKey });
  		this.setState({ list: this.props.lists[listKey] });
  		this.setState({ show:false });
  	}

  	//map over the todo lists returned from fetch action to display
  	/* details to note:
		- list type styles list's div (future upgrade to include user control of these types & styles)
		- upgrade to include warning after clicking delete list
  	*/
	renderLists() {
		return _.map(this.props.lists, (list,listKey) => {      
			return (
	        <div className={`todo-list ${list.type}`} key={listKey}>
	        	
	        	<div className="todo-list-header">
	        		<button 
	        			className="btn btn-graphic" 
	        			title="Delete List" 
	        			onClick={() => this.props.removeList(listKey)}>
	        			<p>X</p>
	        		</button>
		        	<button 
			        	className="btn btn-graphic" 
			        	title="Edit" 
			        	onClick={() => this.edit(listKey)}>
			        	{<p>&#x270E;</p>}
		        	</button>
		          	<h2>{list.title}</h2>
	          	</div>

	          	<ul className="list-group list-group-flush">
	          	{(list.items).map((item,index) => (
					<ListItem
						key={index}
						item={item[0]}
						complete={item[1]}
						index={index}
						listName={listKey}
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
		else if (!this.state.show) {
			//the edit button has been clicked for a particular list
			return <AddList list={this.state.list} listKey={this.state.listKey} close={this.toggleShow} />
		}
		else { 
			//good to go, show all the lists
			return (
				<div id="all-lists">
				    {this.renderLists()}
				</div>
			);
		}
	}
} 

function mapStateToProps(state) {
	return {
		lists: state.lists
	};
}

export default connect(mapStateToProps, { fetchToDos, removeList })(AllLists);