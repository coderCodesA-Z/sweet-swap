import { useEffect } from "react";
import Board from "./components/Board";
import { moveBelow, updateBoard } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { createBoard } from "./utils/createBoard";
import {
	formulaForColumnOfFour,
	formulaForColumnOfThree,
	generateInvalidMoves,
} from "./utils/formulas";
import {
	checkForColumnOfFour,
	checkForColumnOfThree,
	checkForRowOfFour,
	checkForRowOfThree,
} from "./utils/moveCheckLogic";

function App() {
	const dispatch = useAppDispatch();
	const board = useAppSelector(({ sweetSwap: { board } }) => board);
	const boardSize = useAppSelector(({ sweetSwap: { boardSize } }) => boardSize);

	useEffect(() => {
		dispatch(updateBoard(createBoard(boardSize)));
	}, [dispatch, boardSize]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const newBoard = [...board];
			checkForColumnOfFour(
				newBoard,
				boardSize,
				formulaForColumnOfFour(boardSize)
			);
			checkForRowOfFour(
				newBoard,
				boardSize,
				generateInvalidMoves(boardSize, true)
			);
			checkForColumnOfThree(
				newBoard,
				boardSize,
				formulaForColumnOfThree(boardSize)
			);
			checkForRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize));
			dispatch(updateBoard(newBoard));
			dispatch(moveBelow());
		}, 150);
		return () => clearInterval(timeout);
	}, [board, dispatch, boardSize]);

	return (
		<div className="flex items-center justify-center h-5/6">
			<Board />
		</div>
	);
}

export default App;
