import React, { Component } from 'react';
import './TodoTask.css';

class TodoTask extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  deleteFunction( tasktoDelete ) {

  }
  upFunction( tasktoUP ) {
    
  }
  downFunction( tasktoDown ) {
        
  }
  render() {
    return (
      <div className="task">
        <div> <input type="checkbox" name="isDone" checked={this.props.task.isdone} /></div>
        <div>{this.props.task.task}</div>
        <div>
          <button>Delete</button>
          <button>Up</button>
          <button>Down</button>
        </div>
      </div>
    );
  }
}

export default TodoTask;