import React, { Component } from 'react';

function Loading(props) {
  return (
    <div className='loading-spinner' />
  )
}

function DatePicker(props) {
  return (
    <div className='container date-picker'>
      <h2>Pick a date</h2>
      <form className='date-picker-form'>
        <select value={props.month} onChange={props.onMonthChange}>
          <option value='1'>January</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </select>
        <select value={props.day} onChange={props.onDayChange}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='13'>13</option>
          <option value='14'>14</option>
          <option value='15'>15</option>
          <option value='16'>16</option>
          <option value='17'>17</option>
          <option value='18'>18</option>
          <option value='19'>19</option>
          <option value='20'>20</option>
          <option value='21'>21</option>
          <option value='22'>22</option>
          <option value='23'>23</option>
          <option value='24'>24</option>
          <option value='25'>25</option>
          <option value='26'>26</option>
          <option value='27'>27</option>
          <option value='28'>28</option>
          <option value='29'>29</option>
          <option value='30'>30</option>
          <option value='31'>31</option>
        </select>
        <br />
        <button className='btn-today' onClick={props.onSetToday}>Today&#39;s Date</button>
      </form>
    </div>
  )
}

function DateFact(props) {
  return (
    <div className='container'>
      <h2>Facts for this date</h2>
      <p>
        {props.fact}
      </p>
      <button className='btn-another' onClick={props.onFetchFact}>Another Fact</button>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    const nowDate = new Date();
    this.state = {
      month: nowDate.getMonth()+1,
      day: nowDate.getDate(),
      fact: '',
      loading: true,
      colour: 212,
    }
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleFetchFact = this.handleFetchFact.bind(this);
    this.handleSetToday = this.handleSetToday.bind(this);
    this.changeBackgrounds = this.changeBackgrounds.bind(this);
  }

  componentDidMount() {
    this.handleFetchFact();
  }

  handleMonthChange(e) {
    this.setState({ month: e.target.value }, () => this.handleFetchFact());
  }

  handleDayChange(e) {
    this.setState({ day: e.target.value }, () => this.handleFetchFact());
  }
  
  handleFetchFact() {
    if (!this.state.loading) this.setState({ loading: true });
    fetch(`http://numbersapi.com/${this.state.month}/${this.state.day}/date`)
      .then(res => res.text())
      .then(data => {
        if (this.state.fact !== data) {
          this.setState({ 
            fact: data,
            loading: false
          })
        } else {
          this.handleFetchFact();
        }
      });
  }

  handleSetToday(e) {
    e.preventDefault();
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth()+1;
    const nowDay = nowDate.getDate();
    this.setState({
      month: nowMonth,
      day: nowDay,
    });
    this.handleFetchFact();
  }

  changeBackgrounds() {
    let html = document.querySelector('body');
    html.style = `--navy: hsla(${this.state.colour}, 40%, 22%);`;
    let colour = this.state.colour+2;
    this.setState({colour});
  }

  render() {
    return (
      <div className='App' onMouseMove={this.changeBackgrounds}>
        <h1 className='container'>On this date...</h1>
        <DatePicker
          onMonthChange={this.handleMonthChange} 
          onDayChange={this.handleDayChange}
          onSetToday={this.handleSetToday}
          month={this.state.month} 
          day={this.state.day} 
        />
        { this.state.loading === true
          ? <Loading />
          : <DateFact 
            fact={this.state.fact} 
            onFetchFact={this.handleFetchFact}
          />
        }
      </div>
    );
  }
}

export default App;
