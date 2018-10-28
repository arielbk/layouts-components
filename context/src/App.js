import React, { Component, Fragment } from 'react';

// first we make a new context

const MyContext = React.createContext();

// then create a provider component
class MyProvider extends Component {
  state = {
    name: 'ariel',
    age: 27,
    alive: true
  }
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        growAYearOlder: () => this.setState({
          age: this.state.age +1
        })
      }}>
        { this.props.children }
      </MyContext.Provider>
    )
  }
}

const Family = (props) => (
  <div className="family">
    <Person />
  </div>
)

class Person extends Component {
  render() {
    return (
      <div className="Person">
        <MyContext.Consumer>
          {(context) => (
            <Fragment>
              <p>Age: {context.state.age}</p>
              <button onClick={context.growAYearOlder}>Grow!</button>
              <p>Name: {context.state.name}</p>
            </Fragment>
          )}
        </MyContext.Consumer>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <MyProvider>
        <div>
          I am the app!
          <Family />
        </div>
      </MyProvider>
    )
  }
}
