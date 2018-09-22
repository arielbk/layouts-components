import React, { Component } from 'react';
import { 
  Container,
  Button, 
  Card } from 'reactstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: null,
      timeBetween: null,
      bpm: 0.0,
      count: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', e => {
      this.onTap();
    })
  }

  onTap = e => {
    if (e) e.preventDefault();
    // stuff to do when tapped
    const now = (new Date()).getTime();
    let count = this.state.count;
    if (!count) {
      const timeStart = now;
      this.setState({timeStart, timeBetween: 'First beat'})
      count = 1;
    } else {
      const timeStart = now;
      const timeBetween = now - this.state.timeStart;
      const latestBpm = 60000 / timeBetween;
      const bpm = Math.round(((this.state.bpm * (count - 1) + latestBpm) / count)*100)/100;
      this.setState({timeStart, timeBetween, bpm});
      count++;
    }

    this.setState({count});
  }

  onReset = () => {
    this.setState({bpm: 0.0, timeBetween: null, count: 0})
  }

  render() {
    return (
      <Container>
        <h1 className="my-3">BPM Counter</h1>

        {/* Getting all the pieces down before I split them up into components */}

        <Button onClick={this.onTap} className="my-3">Tap</Button>
        <Button onClick={this.onReset} className="btn-danger mx-3">Reset</Button>

        <Card>
          <h3>Number of taps:</h3> {this.state.count}
          <h3>Time between taps:</h3> {this.state.timeBetween}
          <h3>BPM:</h3> {this.state.bpm}
        </Card>
      </Container>
    );
  }
}

export default App;
