import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ls from 'localstorage-ttl';

import Card from '../components/Card';

export const data = [
  {id:1, name: 'Aaditya Paliwal', team: 'Mobile', isSelected:false},
  {id:2, name: 'Anjana Singh', team: 'Web UI', isSelected:false},
  {id:3, name: 'Nitesh Thakur', team: 'Web UI', isSelected:false},
  {id:4, name: 'Rahul Kulmi', team: 'Back End', isSelected:false},
  {id:5, name: 'Aaditya Paliwal', team: 'Mobile', isSelected:false},
  {id:6, name: 'Anjana Singh', team: 'Web UI', isSelected:false},
  {id:7, name: 'Nitesh Thakur', team: 'Web UI', isSelected:false},
  {id:8, name: 'Rahul Kulmi', team: 'Back End', isSelected:false}
];


class App extends Component {
  constructor(props){
    super(props);
    ls.set('cardData', data);
  }
  render() {
    return (
      <div className='container-fluid'>
         <h1 className='text-center'>All Trainers</h1>
           <Card data={data}/>
      </div>
    );
  }
}

export default App;
