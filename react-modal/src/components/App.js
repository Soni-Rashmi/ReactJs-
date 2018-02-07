import React, { Component } from 'react';
import { Grid, Row, Col, Button, Modal, Glyphicon } from 'react-bootstrap';
import  ls from 'localstorage-ttl';

import FormInstance from '../containers/ShowForm';

 let data = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.handleModalDisplay = this.handleModalDisplay.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormDisplay = this.handleFormDisplay.bind(this);
    this.formData = this.formData.bind(this);
    this.renderBox = this.renderBox.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);

    this.state = {
      showModal: false,
      showForm: false,
      isActive: true,
      isEditting: false
    }
  }

  handleFormEdit(e) {
    let data = {
      gender: e.currentTarget.getAttribute('data-gender'),
      name: e.currentTarget.getAttribute('data-name'),
      select: e.currentTarget.getAttribute('data-select'),
      key : e.currentTarget.getAttribute('data-key')
    }

    this.setState({showForm: true, isEditting: true, isActive: false, data});
  }

  handleClose() {
    this.setState({ showModal: false, showForm: false });
  }

  handleModalDisplay() {
    this.setState({ showModal: true, isActive: true });
  }

  handleFormDisplay() {
    this.setState({showForm: true, isActive: false});
  }


  formData() {
    this.setState({showForm: false, isActive: true, isEditting:false});
  }

  renderBox(each, index){
    return (
      <Col sm={3} key={index}>
        <div className={this.state.isActive ? 'active form-data text-center' : 'hidden form-data text-center' }>
          <span> {each.name} </span>
          <span> {each.gender} </span>
          <span> {each.select} </span>
          <span> <a onClick={this.handleFormEdit} data-name={each.name} data-gender={each.gender} data-select={each.select} data-key={index}> Edit </a> </span>
        </div>
      </Col>
    );
  }

 render() {
   return (
     <Grid fluid>
      <Row>
        <Col>
          <Button bsStyle='primary' bsSize='large' onClick={this.handleModalDisplay} >Click to open modal</Button>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Welcome</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={3}>
                  <div className={this.state.isActive ? 'active card text-center ':'hidden card text-center'}>
                    <a onClick={this.handleFormDisplay}><span className='icon glyphicon glyphicon-user'></span>Add new</a>
                  </div>
                </Col>
                {(this.state && ls.get('formData')) ?
                  ls.get('formData').map(this.renderBox)
                : ''}
              </Row>
              <Row>
                <Col sm={12}>
                  <FormInstance formData={this.formData} showForm={this.state.showForm} isEditting={this.state.isEditting} data={this.state.data}/>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
            {!this.state.showForm ?
              <Button bsStyle='primary' onClick={this.handleClose}> OK </Button> :
              <Button bsStyle='primary' type='submit' form='my-form'> Save </Button>
            }
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
     </Grid>
   );
 }
}

export default App;
