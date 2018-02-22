import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import ls from 'localstorage-ttl';

import { Assignments } from '../components/assignments';
import TraineeInfo from '../components/trainee-info';

const all_courses = [
  {title:'HTML', content:['HTML Elements', 'HTML Attributes', 'HTML Form']},
  {title:'CSS', content:['Border', 'Positioning', 'Disply']},
  {title:'Bootstrap', content:['Grid system', 'Typography' ]},
  {title:'LESS', content:['Syntax', 'Mixins' ]},
  {title:'SASS', content:['Syntax', 'Mixins' ]},
  {title:'Javascript', content:['Variables', 'Object', 'Functions', 'DOM', 'Form Validations']},
  {title:'JQuery', content:['Variables', 'Object', 'Functions', 'DOM']}
];

const assigned_courses = [
  {title:'HTML', content:['HTML Elements', 'HTML Attributes', 'HTML Form']},
  {title:'CSS', content:['Border', 'Positioning', 'Disply']},
];

ls.set('all_courses', all_courses);
ls.set('assigned_courses', assigned_courses);


class App extends Component {
  constructor(props){
    super(props);
    this.increase = this.increase.bind(this);
    this.allAssignedCourses = this.allAssignedCourses.bind(this);

    this.state ={
      status: 0.0,
      data : [
        {title:'HTML5', content:['HTML Elements', 'HTML Attributes', 'HTML Form']},
        {title:'CSS3', content:['Border', 'Positioning', 'Disply']},
      ]
    };
  }

  increase(event) {
    let delta = 100/ls.get('assigned_courses').length;
    if(event.target.checked){
      this.setState({ status: this.state.status + delta });
    } else {
      this.setState({ status: this.state.status - delta });
    }
  }

  allAssignedCourses () {
    let trainee_data = ls.get('trainee_data').course_assigned;
    let assigned = [];
    ls.get('all_courses').map(data => {
        if(trainee_data.indexOf(data.title) !== -1){
          assigned.push(data);
          ls.set('assigned_courses', assigned);
        }
    })
    this.setState({data: ls.get('assigned_courses')});
  }

  render() {
    return (
      <div className='container-fluid'>
        <h1 className='text-center'>All Assignments</h1>
        <TraineeInfo allAssignedCourses={this.allAssignedCourses}/>
        <div className='row'>
          <div className='col-sm-12'>
            <ProgressBar now={this.state.status} label={`${this.state.status.toFixed(2)}%`} />
          </div>
        </div>
        <Assignments all_assigned_courses={this.state.data} resetProgressBar={this.increase} />
      </div>
    );
  }
}

export default App;
