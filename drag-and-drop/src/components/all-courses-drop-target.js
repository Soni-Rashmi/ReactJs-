import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';

import ItemType from '../containers/item-types';
import { reorderedItems, all_courses, assigned_courses } from '../actions/action';

import DraggableListItem from './draggable-list-item';

let listGroupItems, offsetX, offsetY;

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

    if(( offsetY >= 125 && offsetY <= 500) && (offsetX <= 310 && offsetX >= 60 )){
      return { moved: true };
    }else {
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

class AllCoursesDropTarget extends Component {
  constructor(props) {
    super(props);

    this.updateArray = this.updateArray.bind(this);
    this.renderListGroupItems = this.renderListGroupItems.bind(this);

  }

  updateArray(courses) {
    this.setState({all_courses_data: courses.all_courses, assigned_courses:courses.assigned_courses})
  }

  renderListGroupItems() {
    if(this.state && this.state.all_courses_data){
      listGroupItems = this.state.all_courses_data.map(data => {
        return (
          <DraggableListItem key={data.index} id={data.index} text={data.text} updateArray={ (courses) => { this.updateArray(courses) }} addItem={this.state.assigned_courses} removeItem={this.state.all_courses_data}/>
        );
      })
    }
  }

  componentDidMount() {
    this.setState({all_courses_data: all_courses, assigned_courses: assigned_courses})
  }

  componentWillReceiveProps(){
    let courses = reorderedItems();
    this.setState({all_courses_data:courses.all_courses,  assigned_courses: courses.assigned_courses})
  }
  render() {
    this.renderListGroupItems();
    const { canDrop, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='text-center col-sm-3 '>
        <h3>All Courses</h3>
        <div className='all-courses'>
          <ListGroup className='all-courses-lists'>
            {listGroupItems}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemType.CARD, cardTarget, collectTarget)(AllCoursesDropTarget);
