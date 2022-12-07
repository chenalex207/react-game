import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  
      render() {
         const loopCount = Array(9).fill(null);
    
const e = loopCount.map((step,move) => {
                      let j = move % 3;
                   
                        if (j === 0) { 
                       
                         return (<span>{this.renderSquare(move)}</span>);
                        }

                        if (j === 1) { 
                         return (<span>{this.renderSquare(move)}</span>);
                        }

                        if (j === 2) { 
                         return (<span>{this.renderSquare(move)}</span>);
                        }
        
                     }
                  );
 
         

         return (<div>
                 <div>
                 {e}
                 </div>
                 <div>
                 {e}
                 </div>
                 <div>
                 {e}
                 </div>
                 </div>

                );
      } 
   
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      pos_his: [                            // 1.在歷史動作列表中，用（欄，列）的格式來顯示每個動作的位置。
        {
          pos: Array(2).fill(null),         // 初始化（欄，列）值
        }
      ],
      loopCount: Array(3).fill(null),
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const pos_his = this.state.pos_his.slice(0, this.state.stepNumber + 1);  // 取得（欄，列）值歷史紀錄
    const pos = pos_his[pos_his.length - 1];                                 // 取得最新（欄，列）值紀錄
    let xy = pos.pos.slice();                                                // 取得最新（欄，列）值

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    xy = calculatePos(i);                // 轉換（欄，列）值來顯示每個動作的位置。

    //xy[0] = i % 3;
    //xy[1] = parseInt(i / 3);    


    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      pos_his: pos_his.concat([         // 將這一步新增的（欄，列）的位置加入到（欄，列）值歷史紀錄中。
         {
           pos: xy
         }
      ]),
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step,e) {                               // 2.在動作列表中，將目前被選取的項目加粗。
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
    e.target.style.fontWeight = 'bold';           // 2.在動作列表中，將目前被選取的項目加粗。
    e.target.style.fontStyle = 'oblique';         // 2.在動作列表中，將目前被選取的項目加粗。
    //e.target.style.background = 'yellow';       // 2.在動作列表中，將目前被選取的項目加粗。
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const pos_his = this.state.pos_his;
    const pos = pos_his[this.state.stepNumber];
    const xy = pos.pos;                           // 取得這一步的（欄，列）值。


    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={(e) => this.jumpTo(move,e)}>{desc}</button>
        </li>
      );
    });

    let position = '準備開始';                                    // 用 position 變數儲存位置資訊。

    if (xy[0] !== null || xy[1] !== null) {                       // 計算 欄，列 資訊加入 position 變數
      position = '第' + (xy[0]+1) + '欄, 第' + (xy[1]+1) + ' 列';
    } 

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{position}</div>          
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculatePos(i) {       // 計算 欄，列 位置的函數
  
      var b = parseInt(i / 3);
      var a = i % 3;

      let pos = [a, b];
      return pos;
 
}

function loop() {       
  
      

     
 
}

