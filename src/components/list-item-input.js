import React, { Component } from 'react'; 

export default class ListItemInput extends Component {
	constructor(props){
		super(props);
		this.itemChange = this.itemChange.bind(this);
		this.remove = this.remove.bind(this);
		this.hitEnterToAdd = this.hitEnterToAdd.bind(this);
	}

	itemChange(e) {
		this.props.changeHandler(e.target.value,this.props.index);
	};

	remove(e) {
		e.preventDefault();
		this.props.removeItem(this.props.index);
	};

	hitEnterToAdd(e) {
		if (e.keyCode === 13)
			this.props.add(e);
	};

	render() {
		return(
			<div className="list-input">
				<button onClick={this.remove} title="Remove this item" className="btn custom-button">x</button>
				<input 
					type="text"
					onKeyDown={this.hitEnterToAdd}
					name={`item${this.props.index}`}
					className="form-control" 
					value={this.props.item} 
					key={`item${this.props.index}`}
					onChange={this.itemChange}
					autoFocus
				/>
			</div>
		)
	};
}
