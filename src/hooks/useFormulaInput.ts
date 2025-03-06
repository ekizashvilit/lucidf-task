import { useState } from 'react';
import { useFormulaStore } from '../stores/formulaStore';

export function useFormulaInput() {
	const [inputValue, setInputValue] = useState('');
	const setSearchTerm = useFormulaStore((state) => state.setSearchTerm);
	const setShowSuggestions = useFormulaStore(
		(state) => state.setShowSuggestions
	);

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setSearchTerm(value);
		setShowSuggestions(value.trim() !== '');
	};

	return { inputValue, setInputValue, handleInputChange };
}
