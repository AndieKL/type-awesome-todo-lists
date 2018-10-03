import React,  { Component } from 'react'; 
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchToDos, removeList, addList, signOut, activeList } from '../actions';
import ListItem from '../components/list-item';
import todoLists from '../demo-lists';

class AllLists extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			list:'',
			listKey: ''
		}
		this.renderLists = this.renderLists.bind(this);
		this.edit = this.edit.bind(this);
		this.addDemoLists = this.addDemoLists.bind(this);
	}

	//run action to fetch data from Firebase
	componentDidMount() {
    	this.props.fetchToDos(this.props.user.uid);
  	}

  	/*when edit button is clicked, a copy of the list is set to state, we switch to edit mode, 
  	and pass the current list to the edit form*/
  	edit(listKey=null) {
  		this.props.activeList(listKey);
  		this.props.history.push("/editlist");
  	}

  	//load a dummy array of lists
  	addDemoLists() {
  		todoLists.map(item => {
  			let name = "list" + Date.now();
  			this.props.addList(this.props.user.uid,item,name);
  			return true;
  		});
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
	        			onClick={() => this.props.removeList(this.props.user.uid,listKey)}>
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
					<button
			            id="new-list-btn"
			            className="btn btn-primary btn-lg"
			            title="Add New List"
			            onClick={this.edit}
			            >
			            +
          			</button>
					<h2>Create a new list to get started.</h2>
					<button onClick={this.addDemoLists} className="btn btn-secondary">Load Demo</button>
					<button className="logout btn" onClick={this.props.signOut}>Log Out</button>
				</div>
			);
		}
		else { 
			//good to go, show all the lists
			return (
				<div>
					<button
			            id="new-list-btn"
			            className="btn btn-primary btn-lg"
			            title="Add New List"
			            onClick={this.edit}
			            >
			            +
          			</button>
					<div id="all-lists">
				    	{this.renderLists()}
					</div>
					<button className="logout btn" onClick={this.props.signOut}>Log Out</button>
				</div>

			);
		}
	}
} 

function mapStateToProps(state) {
	return {
		lists: state.lists,
		user: state.user
	};
}

export default connect(mapStateToProps, { fetchToDos, removeList, addList, signOut, activeList })(AllLists);