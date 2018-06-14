import React, { Component } from 'react';
import './App.css';
import Output from './Components/Output';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: true,
      text: '',
    }

    this.getText = this.getText.bind(this);
  }

  componentWillMount() {
    this.getText();
  }

  getText() {
    fetch(`http://hipsterjesus.com/api/?paras=${this.state.paras}&html=${this.state.html}`)
      .then(res => res.json())
      .then(data => this.setState({ text: data.text }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App container my-4'>
        <h1 className='my-4'>Millenial Text Generator</h1>
        <hr />
        <Output value={this.state.text} onRegenerate={this.getText} />
      </div>
    );
  }
}

export default App;
