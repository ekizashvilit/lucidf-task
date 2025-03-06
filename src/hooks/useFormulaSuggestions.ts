// @ts-nocheck

import { DEFAULT_TIME_OPTION } from '../constants';
import { FormulaTag } from '../stores/formulaStore';
import { useSuggestions } from './useSuggestions';

export function useFormulaSuggestions({
	isOperandNeeded,
	addToken,
	setInputValue,
	setShowSuggestions,
}) {
	const { suggestions = [] } = useSuggestions() as {
		suggestions: FormulaTag[];
		isLoading: boolean;
	};

	const handleSelectSuggestion = (suggestion: FormulaTag) => {
		if (isOperandNeeded()) {
			addToken({ type: 'operator', value: '+' });
		}

		addToken({
			type: 'tag',
			value: suggestion.name,
			id: suggestion.id,
			timeOption: DEFAULT_TIME_OPTION,
		});

		setInputValue('');
		setShowSuggestions(false);
	};

	return {
		suggestions,
		handleSelectSuggestion,
	};
}
