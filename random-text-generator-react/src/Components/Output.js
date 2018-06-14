import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  render() {
    return (
      <div className="output">
        {this.props.value}
        <br />
        <button onClick={this.props.onRegenerate} className='btn btn-primary my-5'>Regenerate!</button>
      </div>
    )
  }
}

export default Output;