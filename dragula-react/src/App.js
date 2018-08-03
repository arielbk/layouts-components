import React, { Component } from 'react';
import Dragula from 'react-dragula';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOne: [
        'first item in the first list',
        'another item in the first list'
      ],
      listTwo: [
        'heres\' an item in the second list',
        'so I want to be able to move these around',
        'but for that to be totally synced with state...',
        'hmmm...'
      ]
    }
  }

  dragulaDecorator = () => {
      const containers = [this.refs.listOne, this.refs.listTwo];
      if (containers.length > 0) {
        let options = { containers };
        Dragula(options)
          .on('drag', (el) => {
            console.log(`moving item: ${el.innerHTML} \nfrom: ${el.parentNode.dataset.id}`);
          })
          .on('drop', (el, target, source, sibling) => {
            if (el.parentNode) {
              console.log(target, source);
              const sourceList = [...this.state[source.dataset.id]];
              const targetList = [...this.state[target.dataset.id]];
              
              // remove from source
              const sourceIndex = sourceList.indexOf(el.innerHTML);
              sourceList.splice(sourceIndex, 1);

              // add to target
              targetList.push(el.innerHTML);

              // still need to get this working........
              // this.setState({[source.dataset.id]: sourceList, [target.dataset.id]: targetList})
            }
          });
      }
  };

  render() {
    
    return (
      <div className="App" ref={this.dragulaDecorator}>
  
      <h1>Dragula Demo</h1>
      <h2>This really is beautifully easy <span role="img" aria-label='okay hand sign'>👌</span></h2>
      <h3>First List</h3>
      <ul className='list-one' data-id='listOne' ref='listOne'>
        { this.state.listOne.map(item =>
          <li key={item}>{item}</li>
        ) }
      </ul>

      <h3>Second List</h3>
      <ul className='list-two' data-id='listTwo' ref='listTwo'>
        { this.state.listTwo.map(item =>
          <li key={item}>{item}</li>
        ) }
        </ul>
      </div>
    )
  };
}

export default App;
