import React, { Component } from 'react';

function Loading(props) {
  return (
    <h3>Loading...</h3>
  )
}

function DatePicker(props) {
  return (
    <div className='container date-picker'>
      <h2>Pick a date:</h2>
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
        <input value={props.day} onChange={props.onDayChange} type='Number' min='1' max='31' />
        <h2> or use </h2>
        <button onClick={props.onSetToday}>Today's date</button>
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
    this.setState({ month: Number(e.target.value) });
    this.handleDateChange();
  }

  handleDayChange(e) {
    this.setState({ day: e.target.value });
    this.handleDateChange();
  }
  
  handleDateChange() {
    console.groupCollapsed('fetching');
    console.count('fetch');
    console.time('fetch data');
    if (!this.state.loading) this.setState({ loading: true });
    fetch(`http://numbersapi.com/${this.state.month}/${this.state.day}/date`)
      .then(res => res.text())
      .then(data => {
        this.setState({ 
          fact: data,
          loading: false,
        });
      });
    console.timeEnd('fetch data');
    console.groupEnd('fetching');
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
    this.handleDateChange();
  }

  render() {
    return (
      <div className='App'>
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
          : <DateFact fact={this.state.fact} />
        }
      </div>
    );
  }
}

export default App;
