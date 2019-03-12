import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';


import {
  setInStorage,
  getFromStorage
} from '../../utils/storage';

class NewPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      submitError: 'Make sure all fields are filled out',
     
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      
    };


    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.onTextboxChangePhone = this.onTextboxChangePhone.bind(this);
    this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
    this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);

    
    this.onSubmit = this.onSubmit.bind(this);
    


  }

  componentDidMount() {
    const obj = getFromStorage('umpireTracker');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });

    } else {
      this.setState({
        isLoading: false,
      });
    }
  }





  onTextboxChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onTextboxChangePhone(event) {
    this.setState({
      phone: event.target.value
    });
  }

  onTextboxChangeFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  onTextboxChangeLastName(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  onSubmit() {
    // Grab state
    const {
        firstName,
        lastName,
        email,
        phone
    } = this.state;

    this.setState({
      isLoading: true,
    })

    // Post request to backend
    fetch('/api/partners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
      }),
    }).then(res => res.json())
    .then(json => {

      if (json.success) {
        this.setState({
          submitError: json.message,
          isLoading: false,
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
      } else {
        this.setState({
          submitError: json.message,
          isLoading: false
        });
      }
    });

  }

 
  render() {
    const {
     
      firstName,
      lastName,
      email,
      phone,
    } = this.state;


return (
  <div align='center'>
  <br></br>
    <h3>New Partner</h3>
              <input 
              type="text" 
              placeholder="First Name"
              value={firstName}
              onChange={this.onTextboxChangeFirstName}/>
              <br />
              <br />

              <input 
              type="text" 
              placeholder="Last Name"
              value={lastName}
              onChange={this.onTextboxChangeLastName}/>
              <br />
              <br />

              <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={this.onTextboxChangeEmail}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Phone #"
              value={phone}
              onChange={this.onTextboxChangePhone}/>
              <br />
              <br></br>
              
              <button>Add New</button>
              <button onClick={this.onSubmit}>Submit</button>
              
  </div>
);
  }}
export default NewPartner;