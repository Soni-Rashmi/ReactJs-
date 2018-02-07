import React, { Component } from 'react';
import { Checkbox, Button, Radio, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import  ls from 'localstorage-ttl';

export default class FormInstance extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      name: '',
      select: ''
    }
  }

  handleSubmit(event) {

    let data;
    event.preventDefault();
    if(ls.get('formData')){
      data = ls.get('formData');
    } else {
      data=[];
    }

    if(this.props.isEditting) {
        data.splice(this.state.index, 1, this.state);
    } else {
      data.push(this.state);
    }
    ls.set('formData', data);

    this.props.formData();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isEditting){
      if(nextProps.data){
        this.setState({
          name: nextProps.data.name,
          gender: nextProps.data.gender,
          select: nextProps.data.select,
          index: nextProps.data.key
        });
      }
    } else {
      this.setState({
        name: '',
        gender: '',
        select: '',
        index: ''
      });
    }

  }

  render() {
    return (
      <form id='my-form' onSubmit={this.handleSubmit} className={this.props.showForm ? 'active-form' : 'hidden'}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl name='name'value ={this.state.name} placeholder='Name' onChange={this.handleInputChange} required></FormControl>
        </FormGroup>
        <FormGroup>
          <Radio name='gender' value='Male' inline onChange={this.handleInputChange} checked={this.state.gender === 'Male'}>
            Male &nbsp;
          </Radio>
          <Radio name='gender' value='Female' inline onChange={this.handleInputChange} checked={this.state.gender === 'Female'}>
            Female
          </Radio>
        </FormGroup>

        <FormGroup controlId='formControlsSelect'>
          <ControlLabel>Select</ControlLabel>
          <FormControl name='select' componentClass='select' placeholder='select' onChange={this.handleInputChange} value={this.state.select}>
            <option value='Select'>Select</option>
            <option value='One'>One</option>
            <option value='Two'>Two</option>
            <option value='Three'>Three</option>
            <option value='Four'>Four</option>
            <option value='Five'>Five</option>
          </FormControl>
        </FormGroup>
      </form>
    );
  }
}
