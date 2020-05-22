import React from 'react'
import Board from './Board'
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                colors: Array(9).fill({color: 'limegreen'})
            }],
            xIsNext: true,
            lastUpdated: 0, 
            stepnumber: 0,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepnumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const colors = current.colors.slice();
        if(calculateWinner(squares) || squares[i])
        {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        colors[i] = this.state.xIsNext ? {color: 'limegreen'} : {color: 'yellow'}
        this.setState({
            history: history.concat([{
                squares: squares,
                colors: colors,
            }]),
            stepnumber: history.length,
            xIsNext: (!this.state.xIsNext),    
            lastUpdated: i,
                       
        });
    }
    jumpTo(step)
    {
        this.setState({
            stepnumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepnumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return(
                <li key={move}>
                    <button className = "moveButton" onClick={() => this.jumpTo(move)}> {desc} </button>
                </li>
            );
            
        });
        let status;
        let styles;
        if(winner) {
            status = 'WINNER: ' + winner; 
            if(winner === 'X')
            {
                styles = {                                                            
                      color: 'white',
                      backgroundColor: 'limegreen'
                };
            }
            else{
                styles = {                                                            
                    color: 'black',
                    backgroundColor: 'yellow'
                  }
              };   
        } else {
            if(gameEnd(current.squares))
            {
                status = 'DRAW!';
                styles = {                                                            
                    color: 'white',
                    backgroundColor: 'red'
                  }
            }
            else{
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
                styles = {                                                            
                    color: 'white',
                    backgroundColor: 'black'
              }
            };
        }
        return (
            <div className = "game">
                <div className = "apptitle">MP'S TIC-TAC-TOE</div>
                <div className = "game-board">
                    <Board
                     squares={current.squares}
                     colors={current.colors}
                     onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className = "game-info">
                    <div className = "status" style = {styles}>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}
function calculateWinner(squares) {
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
    for(let i = 0; i < lines.length; i++) {
        const[a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
function gameEnd(squares) {
    let gameEnded = false;
   for(let i = 0; i < squares.length; i++) {
       if(squares[i] !== null)
       {
           gameEnded = true;
       }
       else{
           gameEnded = false;
           return gameEnded;
       }
   }
   return gameEnded;
}
export default Game;