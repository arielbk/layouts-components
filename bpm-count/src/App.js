import React, { Component } from 'react';
import { 
  Container,
  Button, 
  Card } from 'reactstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    bpm: 0.0
  }

  onTap = e => {
    e.preventDefault();
    // stuff to do when tapped
  }

  render() {
    return (
      <Container>
        <h1 className="my-3">BPM Counter</h1>

        {/* Getting all the pieces down before I split them up into components */}

        <Button onClick={this.onTap} className="my-3">Tap</Button>

        <Card>
          <h3>BPM:</h3> {this.state.bpm}
        </Card>
      </Container>
    );
  }
}

export default App;
