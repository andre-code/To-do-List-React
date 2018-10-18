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
      lastPosition: 0,
      lastId: 0
    }
    //this.orderTasks=this.orderTasks(this);
  }
  componentDidMount () {
    var taskSaved = [{
      id: 1,
      date: '2018-10-17',
      task: 'Finish React project',
      isDone: false,
      position: 2
    },
    {
      id: 2,
      date: '2018-10-17',
      task: 'Wake Up',
      isDone: false,
      position: 1
    },
    {
      id: 3,
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
      lastPosition : this.getLastTaskPosition( taskSaved ),
      lastId : this.getLastTaskId( taskSaved )
    })
    
  }
  addTask = newTask => { 
    var newTasks = this.state.tasks.slice();    
    newTasks.push( newTask );   
    this.setState({tasks: newTasks});
    this.setState({
      tasks: this.orderTasks( newTasks ),
      lastPosition : this.getLastTaskPosition( newTasks ),
      lastId : this.getLastTaskId( newTasks )
    })
  }
  removeTask = taskToRemove => { 
    var newTaskArray = this.state.tasks.filter(function(taskItem){
      return taskItem !== taskToRemove
    });
    this.setState({
      tasks: newTaskArray
    });
    this.setState({
      tasks: this.orderTasks( newTaskArray ),
      lastPosition : this.getLastTaskPosition( newTaskArray ),
      lastId : this.getLastTaskId( newTaskArray )
    })
  }

  updateTask = task => { 
    const objIndex = this.state.tasks.findIndex(obj => obj.id === task.id); 
    var newarray =  this.state.tasks;
    newarray[objIndex]= task;
    this.setState({
      tasks: newarray
    });
    this.setState({
      tasks: this.orderTasks( newarray ),
      lastPosition : this.getLastTaskPosition( newarray ),
      lastId : this.getLastTaskId( newarray )
    });
  }

  getLastTaskPosition = ( arrayToGetLastTask ) => {
    return arrayToGetLastTask.reduce((max, b) => Math.max(max, b.position), arrayToGetLastTask[0].position);
  }
  getLastTaskId = ( arrayToGetLastTask ) => {
    return arrayToGetLastTask.reduce((max, b) => Math.max(max, b.id), arrayToGetLastTask[0].id);
  }
  orderTasks = ( arrayToOrder ) => {
    var orderedTask = arrayToOrder.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
    return orderedTask;
  }

  render() {
    return( 
      <section>
        <h1>{this.state.taskDate}</h1>
        { this.state.tasks.map( task => <TodoTask key={task.position} task={task} deleteFunction={this.removeTask} updateFunction={this.updateTask} /> )}    
        <TodoAddTask addTask={this.addTask} lastPosition={this.state.lastPosition} lastId={this.state.lastId} taskDate={this.state.taskDate} />
      </section>
    )
  }
}

export default TodoList;
