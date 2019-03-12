import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';


import {
  setInStorage,
  getFromStorage
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      currentFirstName: 'Current User First Name!'
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);


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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword
    } = this.state;

    this.setState({
      isLoading: true,
    })

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    }).then(res => res.json())
    .then(json => {

      if (json.success) {
        this.setState({
          signUpError: json.message,
          isLoading: false,
          signUpEmail: '',
          signUpPassword: '',
          signUpFirstName: '',
          signUpLastName: ''
        });
      } else {
        this.setState({
          signUpError: json.message,
          isLoading: false
        });
      }
    });

  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword
  } = this.state;

  this.setState({
    isLoading: true,
  })

  // Post request to backend
  fetch('/api/account/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword
    }),
  }).then(res => res.json())
  .then(json => {

    if (json.success) {
      setInStorage('umpireTracker', { token: json.token });
      this.setState({
        signInError: "",
        isLoading: false,
        signInEmail: '',
        signInPassword: '',
        token: json.token
      });
    } else {
      this.setState({
        signInError: json.message,
        isLoading: false
      });
    }
  });

  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('umpireTracker');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }


  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
      currentFirstName
    } = this.state;

    if (isLoading) {
      return (<div align="center">
                <p>Loading...</p>
              </div>);
    }

    if (!token) {
      return (
        <div align="center">
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
                
              ) : (null)
            }
              <h3>Sign In</h3>
              <input 
              type="email" 
              placeholder="Email" 
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail} />
              <br />
              <br />

              <input 
              type="password" 
              placeholder="Password" 
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword} />
              <br />
              <br />
              <br></br>

              <button onClick={this.onSignIn}>Sign In</button>
          </div>
        <br/>
        <br/>
        <div>

        {
              (signUpError) ? (
                <p>{signUpError}</p>
                
              ) : (null)
            }

              <h3>Sign Up</h3>

              <input 
              type="text" 
              placeholder="First Name" 
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}/>
              <br />
              <br />

              <input 
              type="text" 
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}/>
              <br />
              <br />

              <input 
              type="email" 
              placeholder="Email" 
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}/>
              <br />
              <br />

              <input 
              type="password"
              placeholder="Password" 
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}/>
              <br />
              <br />
              <br></br>

              <button onClick={this.onSignUp}>Sign Up</button>
              <br></br>
          </div>
        </div>
      )
    }
    
    return (
      <div align="center">
      <br></br>
      
        <h3>Hello, {currentFirstName}</h3>

        <br></br>

        
        <form method="get" action="/your-games">
    <button type="submit">View Your Games</button>
    </form>
    
    <br />

    <form method="get" action="/new-game">
    <button type="submit">Create New Game</button>
    </form>
    <br />

    <form method="get" action="/new-assinger">
    <button type="submit">Create New Assinger</button>
    </form>
    <br />

    <form method="get" action="/new-partner">
    <button type="submit">Create New Partner</button>
    </form>
    <br />

    <br>
    </br>
    <br></br>
    <br></br>

        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;

