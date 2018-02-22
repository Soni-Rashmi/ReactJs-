import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import AllCoursesDropTarget from '../components/all-courses-drop-target';
import { removeItem, all_courses} from '../actions/action';
import DraggableListItem from '../components/draggable-list-item';
import AssignedCoursesDropTarget from '../components/assigned-courses-drop-target';

let listGroupItems;

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row data-container'>
          <AllCoursesDropTarget/>
          <div className='col-sm-2 text-center navigation-arrow'>
            <div>
              <i className='glyphicon glyphicon-chevron-left '></i>
            </div>
            <div>
              <i className='glyphicon glyphicon-chevron-right '></i>
            </div>
          </div>
          <AssignedCoursesDropTarget />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
