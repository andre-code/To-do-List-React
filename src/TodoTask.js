import React, { Component } from 'react';
import './TodoTask.css';

class TodoTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  callRemoveFunction = () => {
    this.props.deleteFunction( this.props.task );
  }
  callTaskDone = ( e ) => {
    this.props.task.isDone = e.target.checked;
    this.props.updateFunction( this.props.task );
  }
  render() {
    return (
      <div className="task">
        <div> <input type="checkbox" name="isDone" checked={this.props.task.isdone} onChange={this.callTaskDone} /></div>
        <div>{this.props.task.task}</div>
        <div>
          <button onClick={this.callRemoveFunction}>Delete</button>
        </div>
      </div>
    );
  }
}

export default TodoTask;