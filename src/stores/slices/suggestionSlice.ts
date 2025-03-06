import { StateCreator } from 'zustand';
import { FormulaTag } from '../formulaStore';

export interface SuggestionSlice {
	suggestions: FormulaTag[];
	showSuggestions: boolean;
	searchTerm: string;

	setShowSuggestions: (show: boolean) => void;
	setSearchTerm: (term: string) => void;
	setSuggestions: (suggestions: FormulaTag[]) => void;
}

export const createSuggestionSlice: StateCreator<SuggestionSlice> = (set) => ({
	suggestions: [],
	showSuggestions: false,
	searchTerm: '',

	setShowSuggestions: (show) => set({ showSuggestions: show }),
	setSearchTerm: (term) => set({ searchTerm: term }),
	setSuggestions: (suggestions) => set({ suggestions }),
});
