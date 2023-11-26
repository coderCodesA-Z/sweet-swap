import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { dragEndReducer } from "./reducers/dragEnd";
import { moveBelowReducer } from "./reducers/moveBelow";

const initialState: {
	board: string[];
	boardSize: number;
	squareBeingReplaced: Element | undefined;
	squareBeingDragged: Element | undefined;
} = {
	board: [],
	boardSize: 8,
	squareBeingDragged: undefined,
	squareBeingReplaced: undefined,
};

const sweetSwapSlice = createSlice({
	name: "sweetSwap",
	initialState,
	reducers: {
		updateBoard: (state, action: PayloadAction<string[]>) => {
			state.board = action.payload;
		},
		dragStart: (state, action: PayloadAction<any>) => {
			state.squareBeingDragged = action.payload;
		},
		dragDrop: (state, action: PayloadAction<any>) => {
			state.squareBeingReplaced = action.payload;
		},
		dragEnd: dragEndReducer,
		moveBelow: moveBelowReducer,
	},
});

export const store = configureStore({
	reducer: {
		sweetSwap: sweetSwapSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const { updateBoard, moveBelow, dragDrop, dragEnd, dragStart } =
	sweetSwapSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
