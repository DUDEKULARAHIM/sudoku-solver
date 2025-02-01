
import React, { useState, useEffect } from "react";
import SudokuSolver from "./SudukoSolver";
import "./App.css";

function App() {
    const [showSudoku, setShowSudoku] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const handleButtonClick = () => {
        setShowSudoku(true);
    };

    const handleBackButtonClick = () => {
        setShowSudoku(false);
    };

    // Listen for the 'beforeinstallprompt' event to show the install button
    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    // Function to trigger the install prompt
    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                console.log(choiceResult.outcome);
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <div className="flex-grow flex justify-center items-center flex-col">
                <h1 className="text-xl font-bold mb-4">Sudoku Solver</h1>
                <button
                    onClick={handleButtonClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Show Sudoku Solver
                </button>

                {/* Back Button */}
                {showSudoku && (
                    <button
                        onClick={handleBackButtonClick}
                        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Back
                    </button>
                )}

                {/* Conditionally render SudokuSolver component */}
                {showSudoku && <SudokuSolver />}

                {/* Install Button */}
                {deferredPrompt && (
                    <button
                        onClick={handleInstallClick}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Install App
                    </button>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 mt-auto">
                <div className="flex justify-center items-center space-x-4">
                    <span>Made by Murthy Mohan</span>
                    <div className="flex space-x-3">
                        <a href="#" className="text-white hover:text-blue-500">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white hover:text-blue-500">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white hover:text-blue-500">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
