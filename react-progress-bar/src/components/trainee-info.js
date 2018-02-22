import React, { Component } from 'react';
import ls from 'localstorage-ttl';

const trainee_data = {
  name: 'Rashmi Soni',
  team: 'Web UI',
  course_assigned: ['HTML', 'CSS'],
  assign_more: ['HTML', 'CSS', 'Bootstrap', 'LESS', 'SASS', 'Javascript', 'JQuery']
};

export default class TraineeInfo extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    ls.set('trainee_data', trainee_data);
    this.state= {
      value:''
    }
  }

  handleChange (event) {
    if(event.target.value){
      let data = ls.get('trainee_data');
      if(data.course_assigned.indexOf(event.target.value) === -1){
        data.course_assigned.push(event.target.value);
      }
      ls.set('trainee_data', data);
    }
    this.setState({value: event.target.value});
    this.props.allAssignedCourses();
  }

  render(){
    let trainee = ls.get('trainee_data');
    return (
      <div className='row trainee-data'>
        <div className='col-sm-6 data-part'>
          <span>Name:</span>&nbsp;&nbsp;
          <span>{trainee.name}</span>
        </div>
        <div className='col-sm-6 data-part'>
          <span>Team:</span>&nbsp;&nbsp;
          <span>{trainee.team}</span>
        </div>
        <div className='col-sm-6 data-part'>
          <span>Course assigned:</span>&nbsp;&nbsp;
          <span>{trainee.course_assigned.join(', ')}</span>
        </div>
        <div className='col-sm-6 data-part'>
          <span>Assign more:</span>&nbsp;&nbsp;
          <select onChange={this.handleChange} value={this.state.value} >
            <option value=''>Select</option>
            {trainee.assign_more.map(selectOption)}
          </select>
        </div>
      </div>
    );
  }
}

function selectOption(data) {
  return (
    <option key={data} value={data}>{data}</option>
  );
}
