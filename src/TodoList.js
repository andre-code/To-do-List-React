import React, { Component } from 'react';
import TodoTask from './TodoTask';
import TodoAddTask from './TodoAddTask';
import firebase from './firebase.js';
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
    const taskRefFirebase = firebase.database().ref('tasks'); 
    let newStateTask = [];
    taskRefFirebase.on('value', (snapshot) => {
      let fTasks = snapshot.val();    
      for (let ftask in fTasks) {
        newStateTask.push({
          id: ftask,
          date: fTasks[ftask].date,
          task: fTasks[ftask].task,
          isDone: fTasks[ftask].isDone,
          position: fTasks[ftask].position
        });
      }
      this.setState({
        tasks: newStateTask
      });
    });

    this.setState({
      taskDate: '2018-10-17'
    });
    
    if(newStateTask.length > 0)
      this.reloadTask(newStateTask); 
  }
  reloadTask =  newTask => {
    this.setState({ tasks: newTask });
    this.setState({
      tasks: this.orderTasks( newTask ),
      lastPosition : this.getLastTaskPosition( newTask ),
      lastId : this.getLastTaskId( newTask )
    })
  }
  addTask = newTask => { 
    var newTasks = this.state.tasks.slice();
    const taskRefFirebase = firebase.database().ref('tasks'); 
    const taskFirebase = {
      date: newTask.date,
      task: newTask.task,
      isDone: newTask.isDone,
      position: newTask.position
    }
    taskRefFirebase.push(taskFirebase);
    newTasks.push( newTask ); 
    if(newTasks.length > 0)
      this.reloadTask(newTasks);
  }
  removeTask = taskToRemove => { 
    const taskRefFirebase = firebase.database().ref(`/tasks/${taskToRemove.id}`);
    taskRefFirebase.remove();
    var newTaskArray = this.state.tasks.filter(function(taskItem){
      return taskItem !== taskToRemove
    });
    if(newTaskArray.length > 0)
      this.reloadTask(newTaskArray);
  }

  updateTask = task => { 
    const objIndex = this.state.tasks.findIndex(obj => obj.id === task.id); 
    var newArray =  this.state.tasks;
    newArray[objIndex]= task;
    if(newArray.length > 0)
      this.reloadTask(newArray);
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