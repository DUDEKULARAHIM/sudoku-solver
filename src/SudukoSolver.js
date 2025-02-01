
import React, { useState } from "react";
import "./SudukoSolver.css"; // Import CSS

const SudokuSolver = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [userInput, setUserInput] = useState(Array(9).fill(""));

  const handleInputChange = (index, value) => {
    if (value.length > 9) return;
    setUserInput((prev) => {
      const newInput = [...prev];
      newInput[index] = value;
      return newInput;
    });
  };

  const parseInput = () => {
    const newGrid = userInput.map((row) =>
      row.split("").map((char) => (char === "." ? 0 : parseInt(char, 10)))
    );
    if (newGrid.some((row) => row.length !== 9)) {
      alert("Each row must contain exactly 9 numbers (use '.' for empty spaces).");
      return null;
    }
    return newGrid;
  };

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolve = () => {
    const newGrid = parseInput();
    if (newGrid) {
      const gridCopy = JSON.parse(JSON.stringify(newGrid));
      if (solveSudoku(gridCopy)) {
        setGrid(gridCopy);
      } else {
        alert("No solution exists!");
      }
    }
  };

  return (
    <div className="sudoku-container">
      <h2>Sudoku Solver</h2>
      <div className="sudoku-inputs">
        {userInput.map((row, index) => (
          <input
            key={index}
            type="text"
            className="sudoku-input"
            value={row}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter row ${index + 1} (e.g., 53.678.9.)`}
          />
        ))}
      </div>
      <button className="solve-button" onClick={handleSolve}>
        Solve Sudoku
      </button>
      <table className="sudoku-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((num, colIndex) => (
                <td key={colIndex} className={num === 0 ? "empty" : ""}>
                  {num !== 0 ? num : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuSolver;
