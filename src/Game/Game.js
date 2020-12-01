import React, { Component } from "react"
import Board from '../Board/Board'

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }

  handleClick = (i) => {
    const history = this.state.history
    const current = history[history.length -1]
    const squares = [...current.squares]
    // = const squares = this.state.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history
    const current = history[history.length -1]
    const winner = this.calculateWinner(current.squares)
    let status = ''
    let button = <button className='refresh' onClick={() => window.location.reload()}>Refresh</button>
    if(winner) {
      status = 'Выиграл игрок - ' + winner
    } else if(current.squares.includes(null)) {
      status = 'Следующий ход игрока - ' + (this.state.xIsNext ? 'X' : 'O')
      button = null
    } else {
      status = 'Ничья...'
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ current.squares }
            xIsNext={ this.state.xIsNext }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>

        <div className="game-info">
          <div>{ status }</div>
          { button }
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

export default Game