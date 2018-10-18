import React, { Component } from 'react';
import TodoTask from './TodoTask';
import TodoAddTask from './TodoAddTask';
import './TodoList.css';


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskDate: '',
      tasks: [],
      lastPosition: 0
    }
    //this.orderTasks=this.orderTasks(this);
  }
  componentDidMount () {
    var taskSaved = [{
      date: '2018-10-17',
      task: 'Finish React project',
      isDone: false,
      position: 2
    },
    {
      date: '2018-10-17',
      task: 'Wake Up',
      isDone: false,
      position: 1
    },
    {
      date: '2018-10-17',
      task: 'Sleep at 11pm!',
      isDone: false,
      position: 3
    }];

    this.setState({
      taskDate: '2018-10-17',
      tasks: taskSaved
    });

    this.setState({
      tasks: this.orderTasks( taskSaved ),
      lastPosition : this.getLastTask( taskSaved )
    })
    
  }
  addTask = newTask => { 
    console.log ( "newtask", newTask );
    var newTasks = this.state.tasks.slice();    
    newTasks.push( newTask );   
    this.setState({
      tasks: newTasks     
    });
    this.setState({
      tasks: this.orderTasks( newTasks ),
      lastPosition : this.getLastTask( newTasks )
    })
  }
  getLastTask = ( arrayToGetLastTask ) => {
    return arrayToGetLastTask.reduce((max, b) => Math.max(max, b.position), arrayToGetLastTask[0].position);
  }
  orderTasks = ( arrayToOrder ) => {
    var orderedTask = arrayToOrder.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
    return orderedTask;
  }

  render() {
    return( 
      <section>
        <h1>{this.state.taskDate}</h1>
        { this.state.tasks.map( task => <TodoTask key={task.position} task={task} /> )}    
        <TodoAddTask addTask={this.addTask} lastPosition={this.state.lastPosition} taskDate={this.state.taskDate} />
      </section>
    )
  }
}

export default TodoList;
