import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col)
  }

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 16;
    var rowsArr = [];

    var boxClass = '';
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.rows; j++) {
        let boxId = i + '-' + j;

        boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }

    return(
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    );
  }
}

class Buttons extends React.Component {

  handleSelect = e => {
    this.props.gridSize(e);
  }

  render() {
    return(
      <div className='center'>
        <button className='btn' onClick={this.props.playButton}>
          Play
        </button>
        <button className='btn' onClick={this.props.pauseButton}>
          Pause
        </button>
        <button className='btn' onClick={this.props.clear}>
          Clear
        </button>
        <button className='btn' onClick={this.props.fast}>
          Fast
        </button>
        <button className='btn' onClick={this.props.slow}>
          Slow
        </button>
        <button className='btn' onClick={this.props.seed}>
          Seed
        </button>
        <select
          className='dropdown'
          title='Grid Size'
          id='size-menu'
          onChange={this.handleSelect}
        >
          <option value='1' >20x10</option>
          <option value='2'>50x30</option>
          <option value='3'>70x50</option>
        </select>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 200;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      // gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false));
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
    }
  }

  selectBox = (row,col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) { // 1/4 chance of square being 'on'
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  }

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
    var grid = Array(this.rows).fill(Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
    });
    this.pauseButton();
  }

  gridSize = (e) => {
    let size = e.target.value;
    switch(size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  }

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}

    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    })
  }

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));