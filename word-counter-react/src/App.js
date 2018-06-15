import React, { Component } from 'react';
import ControlBar from './Components/ControlBar';
import Output from './Components/Output';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      wordsToShow: 10,
      numUniqueWords: 0,
      topWords: [],
    }
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleWordsToShowChange = this.handleWordsToShowChange.bind(this);
    this.updateTopWords= this.updateTopWords.bind(this);
  }

  updateTopWords() {

  let numUniqueWords = 0;

  const words = this.state.textInput
    // this is where the magic happens: chained array methods
    .toLowerCase()
    .split(' ')
    // remove all non alpha characters and increment words counter on each pass
    .map(x => x.replace(/[^a-z]/gi, ''))
    // create an array of objects with the word and its frequency
    .reduce((totalWords, singleWord) => {
      if (totalWords.every(element => element['word'] !== singleWord)) {
        const newElement = {word: singleWord, frequency: 1};
        totalWords.push(newElement);
        numUniqueWords++;
      } else {
        totalWords.forEach(element => {if (element.word === singleWord) element.frequency++});
        numUniqueWords++;
      }
      return totalWords;
    }, [])
    // sort the array from highest to lowest frequency
    .sort((a,b) => b.frequency-a.frequency);

  this.setState({ topWords: words, numUniqueWords }, () => console.table(this.state.topWords));
  }

  handleTextInput(e) {
    this.setState({ textInput: e.target.value }, () => this.updateTopWords());
  }

  handleWordsToShowChange(e) {
    this.setState({ wordsToShow: e.target.value }, () => this.updateTopWords());
  }

  render() {
    return (
      <div className="container">
        <h1>Word Counter</h1>
        <h3>Type or paste some text below and list the frequency of each word!</h3>
        <textarea 
        className='text-input' 
        value={this.state.textInput} 
        onChange={this.handleTextInput}
        />
        <ControlBar 
        onWordsToShowChange={this.handleWordsToShowChange}
        wordsToShowValue={this.state.wordsToShow}
        onSubmit={this.handleSubmit}
        />
        <Output 
          wordsToShow={this.state.wordsToShow}
          numUniqueWords={this.state.numUniqueWords}
          topWords={this.state.topWords}s
        />
      </div>
    );
  }
}

export default App;