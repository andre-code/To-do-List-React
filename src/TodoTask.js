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
  callUpFunction = () => {
    this.props.upFunction(this.props.task.position);
  }
  callTaskDone = ( e ) => {
    var values = {
      id: this.props.task.id,
      var: "isDone",
      val: e.target.checked
    }
    this.props.updateFunction( values );
  }
  render() {
    return (
      <div className="task">
        <div> <input type="checkbox" name="isDone" checked={this.props.task.isDone} onChange={this.callTaskDone} /></div>
        <div>{this.props.task.task}</div>
        <div>
          <button onClick={this.callRemoveFunction}>Delete</button>
          <button onClick={this.callUpFunction}>UP</button>
        </div>
      </div>
    );
  }
}

export default TodoTask;