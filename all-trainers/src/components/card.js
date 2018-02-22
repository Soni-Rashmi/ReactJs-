import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import ls from 'localstorage-ttl';

export default class Card extends Component {
  constructor(props){
    super(props);
    this.renderBox = this.renderBox.bind(this);

    this.state = {
      isClicked: false
    }
  }

  renderBox(each, index) {
    return (
      <Col md={3} sm={4} key={index}>
        <div className={each.isSelected ? 'card text-center clicked' : 'card text-center'} onClick={() => handleClick(index, this)}>
          {each.isSelected ? <span className='checked glyphicon glyphicon-ok'/> : ''}
          <span className='icon glyphicon glyphicon-user'></span>
          <span> {each.name} </span>
          <span> {each.team} </span>
        </div>
      </Col>
    );
  }

  render() {
    return(
      <Row className='card-container'>
        {this.props.data.map(this.renderBox)}
      </Row>
    );
  }
}

function handleClick(index, instance) {
   instance.props.data[index].isSelected = !instance.props.data[index].isSelected;
   console.log(instance.props.data);
   ls.set('cardData', instance.props.data);
  instance.setState({isClicked: true});
}
