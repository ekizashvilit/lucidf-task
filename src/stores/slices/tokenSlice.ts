import { StateCreator } from 'zustand';
import { FormulaToken, TimeOption } from '../formulaStore';

export interface TokenSlice {
	tokens: FormulaToken[];
	cursorPosition: number;

	setTokens: (tokens: FormulaToken[]) => void;
	addToken: (token: FormulaToken) => void;
	removeToken: (index: number) => void;
	updateTokenTimeOption: (index: number, timeOption: TimeOption) => void;
	setCursorPosition: (position: number) => void;
}

export const createTokenSlice: StateCreator<TokenSlice> = (set) => ({
	tokens: [],
	cursorPosition: 0,

	setTokens: (tokens) => set({ tokens }),

	addToken: (token) =>
		set((state) => {
			const newTokens = [...state.tokens];
			const position = state.cursorPosition;

			// Insert token at cursor position
			newTokens.splice(position, 0, token);

			return {
				tokens: newTokens,
				cursorPosition: position + 1,
			};
		}),

	removeToken: (index) =>
		set((state) => {
			const newTokens = [...state.tokens];
			newTokens.splice(index, 1);

			return {
				tokens: newTokens,
				cursorPosition: Math.max(0, state.cursorPosition - 1),
			};
		}),

	updateTokenTimeOption: (index, timeOption) =>
		set((state) => {
			const newTokens = [...state.tokens];

			if (newTokens[index] && newTokens[index].type === 'tag') {
				newTokens[index] = { ...newTokens[index], timeOption };
			}

			return { tokens: newTokens };
		}),

	setCursorPosition: (position) => set({ cursorPosition: position }),
});
