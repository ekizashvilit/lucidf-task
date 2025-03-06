import { create } from 'zustand';
import { createTokenSlice, TokenSlice } from './slices/tokenSlice';
import {
	createSuggestionSlice,
	SuggestionSlice,
} from './slices/suggestionSlice';
import {
	CalculationSlice,
	createCalculationSlice,
} from './slices/calculationSlice';

export type FormulaTag = {
	id: string;
	name: string;
	category: string;
	value: string | number;
};

export type TimeOption =
	| 'this month'
	| 'previous month'
	| 'last year'
	| 'custom';

export type FormulaToken = {
	type: 'tag' | 'operator' | 'number' | 'text';
	value: string;
	id?: string;
	timeOption?: TimeOption;
	position?: number;
};

export type FormulaState = TokenSlice & SuggestionSlice & CalculationSlice;

export const useFormulaStore = create<FormulaState>()((set, get, store) => ({
	...createTokenSlice(set, get, store),
	...createSuggestionSlice(set, get, store),
	...createCalculationSlice(set, get, store),
}));
