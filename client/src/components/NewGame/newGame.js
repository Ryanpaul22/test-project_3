import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';


import {
  setInStorage,
  getFromStorage
} from '../../utils/storage';

class NewGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      
      submitError: 'Make sure all fields are filled out',
      date:'',
      time:'',
      assinger:'',
      town:'',
      site:'',
      level:'',
      partner:'',
      position:'',
      paymentType:'',
      paymentStatus:'',
      fee:'',
      notes:''

      
    };


    this.onTextboxChangeDate = this.onTextboxChangeDate.bind(this);
    this.onTextboxChangeTime = this.onTextboxChangeTime.bind(this);
    this.onTextboxChangeAssinger = this.onTextboxChangeAssinger.bind(this);
    this.onTextboxChangePartner = this.onTextboxChangePartner.bind(this);
    this.onTextboxChangePosition = this.onTextboxChangePosition.bind(this);this.onTextboxChangePaymentStatus = this.onTextboxChangePaymentStatus.bind(this);this.onTextboxChangeFee = this.onTextboxChangeFee.bind(this);
    this.onTextboxChangeTown = this.onTextboxChangeTown.bind(this);this.onTextboxChangeSite = this.onTextboxChangeSite.bind(this);this.onTextboxChangeLevel = this.onTextboxChangeLevel.bind(this);this.onTextboxChangePaymentType = this.onTextboxChangePaymentType.bind(this);
    this.onTextboxChangeNotes = this.onTextboxChangeNotes.bind(this);

    
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



  onTextboxChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  onTextboxChangeTime(event) {
    this.setState({
      time: event.target.value
    });
  }

  onTextboxChangeAssinger(event) {
    this.setState({
      assinger: event.target.value
    });
  }

  onTextboxChangePartner(event) {
    this.setState({
      partner: event.target.value
    });
  }
  
  onTextboxChangePosition(event) {
    this.setState({
      position: event.target.value
    });
  }
  
  onTextboxChangePaymentStatus(event) {
    this.setState({
      paymentStatus: event.target.value
    });
  }

  onTextboxChangeFee(event) {
    this.setState({
      fee: event.target.value
    });
  }

  onTextboxChangeTown(event) {
    this.setState({
      town: event.target.value
    });
  }

  onTextboxChangeSite(event) {
    this.setState({
      site: event.target.value
    });
  }

  onTextboxChangeLevel(event) {
    this.setState({
      level: event.target.value
    });
  }

  onTextboxChangePaymentType(event) {
    this.setState({
      paymentType: event.target.value
    });
  }

  onTextboxChangeNotes(event) {
    this.setState({
      notes: event.target.value
    });
  }

  onSubmit() {
    // Grab state
    const {
        assinger,
        partner,
        date,
        time,
        position,
        paymentStatus,
        fee,
        town,
        site,
        level,
        paymentType,
        notes
    } = this.state;

    this.setState({
      isLoading: true,
    })

    // Post request to backend
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        date: date,
        time: time,
        assinger: assinger,
        partner: partner,
        position: position,
        paymentStatus: paymentStatus,
        fee: fee,
        town: town,
        site: site,
        paymentType: paymentType,
        level: level,
        notes: notes

      }),
    })
    .then(json => {

      if (json.success) {
        this.setState({
          submitError: json.message,
          isLoading: false,
          assinger: '',
          partner: '',
          date: '',
          time: '',
          position: '',
          paymentStatus: '',
          fee: '',
          town: '',
          site: '',
          level: '',
          paymentType: '',
          notes: ''
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
     
      assinger,
      partner,
      date,
      time,
      position,
      paymentStatus,
      fee,
      town,
      site,
      level,
      paymentType,
      notes
    } = this.state;


return (
  <div align='center'>
  <br></br>
    <h3>New Game</h3>
              <input 
              type="date" 
              placeholder="Date"
              value={date}
              onChange={this.onTextboxChangeDate}/>
              <br />
              <br />

              <input 
              type="time" 
              placeholder="Time"
              value={time}
              onChange={this.onTextboxChangeTime}/>
              <br />
              <br />

              <input 
              type="text" 
              placeholder="Assinger"
              value={assinger}
              onChange={this.onTextboxChangeAssinger}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Partner"
              value={partner}
              onChange={this.onTextboxChangePartner}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Town"
              value={town}
              onChange={this.onTextboxChangeTown}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Site"
              value={site}
              onChange={this.onTextboxChangeSite}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Level"
              value={level}
              onChange={this.onTextboxChangeLevel}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Position"
              value={position}
              onChange={this.onTextboxChangePosition}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Payment Type"
              value={paymentType}
              onChange={this.onTextboxChangePaymentType}/>
              <br />
              <br />

              <input 
              type="text" 
              placeholder="Payment Status"
              value={paymentStatus}
              onChange={this.onTextboxChangePaymentStatus}/>
              <br />
              <br />

              <input 
              type="number" 
              placeholder="Fee"
              value={fee}
              onChange={this.onTextboxChangeFee}/>
              <br />
              <br />

              <input 
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={this.onTextboxChangeNotes}/>
              <br />
              <br />
              <br></br>
              
              <button>Add New</button>
              <button onClick={this.onSubmit}>Submit</button>
              
  </div>
);
  }}
export default NewGame;