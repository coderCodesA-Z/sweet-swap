import { Draft } from "immer";
import {
	formulaForColumnOfFour,
	formulaForColumnOfThree,
	generateInvalidMoves,
} from "../../utils/formulas";
import {
	checkForColumnOfFour,
	checkForColumnOfThree,
	checkForRowOfFour,
	checkForRowOfThree,
} from "../../utils/moveCheckLogic";

export const dragEndReducer = (
	state: Draft<{
		board: string[];
		boardSize: number;
		squareBeingReplaced: Element | undefined;
		squareBeingDragged: Element | undefined;
	}>
) => {
	const newBoard = [...state.board];
	const boardSize = state.boardSize;
	let { squareBeingDragged, squareBeingReplaced } = state;
	const squareBeingDraggedId: number = parseInt(
		squareBeingDragged?.getAttribute("candy-id") as string
	);
	const squareBeingReplacedId: number = parseInt(
		squareBeingReplaced?.getAttribute("candy-id") as string
	);

	newBoard[squareBeingReplacedId] = squareBeingDragged?.getAttribute(
		"src"
	) as string;
	newBoard[squareBeingDraggedId] = squareBeingReplaced?.getAttribute(
		"src"
	) as string;

	const validMoves: number[] = [
		squareBeingDraggedId - 1,
		squareBeingDraggedId - boardSize,
		squareBeingDraggedId + 1,
		squareBeingDraggedId + boardSize,
	];

	const validMove: boolean = validMoves.includes(squareBeingReplacedId);

	const isAColumnOfFour: boolean | undefined = checkForColumnOfFour(
		newBoard,
		boardSize,
		formulaForColumnOfFour(boardSize)
	);

	const isARowOfFour: boolean | undefined = checkForRowOfFour(
		newBoard,
		boardSize,
		generateInvalidMoves(boardSize, true)
	);

	const isAColumnOfThree: boolean | undefined = checkForColumnOfThree(
		newBoard,
		boardSize,
		formulaForColumnOfThree(boardSize)
	);

	const isARowOfThree: boolean | undefined = checkForRowOfThree(
		newBoard,
		boardSize,
		generateInvalidMoves(boardSize)
	);

	if (
		squareBeingReplacedId &&
		validMove &&
		(isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
	) {
		squareBeingDragged = undefined;
		squareBeingReplaced = undefined;
	} else {
		newBoard[squareBeingReplacedId] = squareBeingReplaced?.getAttribute(
			"src"
		) as string;
		newBoard[squareBeingDraggedId] = squareBeingDragged?.getAttribute(
			"src"
		) as string;
	}
	state.board = newBoard;
};
