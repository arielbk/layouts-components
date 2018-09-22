import React, { Component } from 'react';
import { 
  Container,
  Button, 
  Card } from 'reactstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    listening: false,
    timeStart: null,
    timeBetween: null,
    bpm: 0.0
  }

  onTap = e => {
    e.preventDefault();
    // stuff to do when tapped
    if (!this.state.listening) {
      const timeStart = (new Date()).getTime();
      this.setState({timeStart, timeBetween: 'First beat'})
    } else {
      const now = (new Date()).getTime();
      const timeBetween = now - this.state.timeStart;
      this.setState({timeStart: now, timeBetween});
    }

    this.setState({listening: true});
  }

  render() {
    return (
      <Container>
        <h1 className="my-3">BPM Counter</h1>

        {/* Getting all the pieces down before I split them up into components */}

        <Button onClick={this.onTap} className="my-3">Tap</Button>

        <Card>
          <h3>BPM:</h3> {this.state.bpm}
          <h3>Time between taps:</h3> {this.state.timeBetween}
        </Card>
      </Container>
    );
  }
}

export default App;
