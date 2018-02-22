import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ItemType from '../containers/item-types';
import { assigned_courses, all_courses, reorderedItems } from '../actions/action';
import DraggableListItem from './draggable-list-item';

let reordered_items;
let offsetX, offsetY;

const cardTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    if(itemType === 'card'){
      return true;
    } else {
      return false;
    }
  },

   hover(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    // const initialOffset = monitor.getInitialSourceClientOffset();
    offsetX = clientOffset.x;
    offsetY = clientOffset.y;
    const componentRect = findDOMNode(component);
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }
    if(( offsetY >= 125 && offsetY <= 500) && (offsetX >= 535  && offsetX <= 1240)){
      return { moved: true };
    } else {
      return { moved: false };
    }
  }
 };

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    id: monitor.getItem()
  };
}

class AssignedCoursesDropTarget extends Component {
  constructor(props) {
    super(props);
    this.renderAssignedCourses = this.renderAssignedCourses.bind(this);
    this.updateArray = this.updateArray.bind(this);

    this.state = {
      all_courses_data : []
    }
  }

  updateArray(courses) {
    this.setState({all_courses_data: courses.all_courses, assigned_courses:courses.assigned_courses})
  }

  renderAssignedCourses() {
    if(this.state && this.state.assigned_courses) {
      let data = this.state.assigned_courses;
      reordered_items = data.map(data => {
        return (
          <div key={data.index} id={data.index}>
           <DraggableListItem key={data.index} id={data.index} text={data.text} updateArray={(all_courses) => { this.updateArray(all_courses) }} addItem={this.state.all_courses_data} removeItem={this.state.assigned_courses}/>
        </div>
        )
      });
    }
  }

  componentWillReceiveProps(){
    let courses = reorderedItems();
    this.setState({all_courses_data:courses.all_courses,  assigned_courses: courses.assigned_courses})
  }

  render() {
    this.renderAssignedCourses();
    const { canDrop, connectDropTarget } = this.props;
    return connectDropTarget (
      <div className='text-center col-sm-7'>
        <h3>Assigned Courses</h3>
        <div className='assigned-courses'>
          <ListGroup className='assigned-courses-lists'>
            {reordered_items}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemType.CARD, cardTarget, collectTarget)(AssignedCoursesDropTarget);
