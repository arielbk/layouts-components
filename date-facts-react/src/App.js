import React, { Component } from 'react';

function DatePicker(props) {
  return (
    <div>
      <h2>Pick a date:</h2>
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
      <input type='Number' min='1' max='31' value={props.day} onChange={props.onDayChange} />
      <button onClick={props.onSetToday}>Today's date</button>
    </div>
  )
}

function DateFact(props) {
  return (
    <div>
      <h3>Facts for the date</h3>
      <p>
        {props.fact}
      </p>
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
      fact: 'Loading...',
    }
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSetToday = this.handleSetToday.bind(this);
  }

  componentDidMount() {
    this.handleDateChange();
  }

  handleMonthChange(e) {
    const month = e.target.value;
    console.log(month);
    this.setState({month});
    this.handleDateChange();
  }

  handleDayChange(e) {
    const day = e.target.value;
    console.log(day);
    this.setState({day});
    this.handleDateChange();
  }
  
  handleDateChange() {
    fetch(`http://numbersapi.com/${this.state.month}/${this.state.day}/date`)
      .then(res => res.text())
      .then(data => {
        this.setState({ fact: data })
      });
  }

  handleSetToday() {
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth()+1;
    const nowDay = nowDate.getDate();
    this.setState({
      month: nowMonth,
      day: nowDay,
    });
    this.handleDateChange();
  }

  render() {
    return (
      <div className="App">
        <h1>On this date...</h1>
        <DatePicker 
          month={this.state.month} 
          day={this.state.day} 
          onMonthChange={this.handleMonthChange} 
          onDayChange={this.handleDayChange}
          onSetToday={this.handleSetToday}
        />
        <DateFact fact={this.state.fact} />
      </div>
    );
  }
}

export default App;
