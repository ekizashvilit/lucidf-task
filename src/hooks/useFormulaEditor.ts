import { TIME_OPTIONS } from '../constants';
import { useFormulaInput } from './useFormulaInput';
import { useTokenManagement } from './useTokenManagement';
import { useFormulaKeyHandlers } from './useFormulaKeyHandlers';
import { useFormulaSuggestions } from './useFormulaSuggestions';
import { useFormulaStore, TimeOption } from '../stores/formulaStore';

export function useFormulaEditor() {
	const { inputValue, setInputValue, handleInputChange } = useFormulaInput();

	const {
		tokens,
		addToken,
		removeToken,
		updateTokenTimeOption,
		isOperandNeeded,
	} = useTokenManagement();

	const showSuggestions = useFormulaStore((state) => state.showSuggestions);
	const result = useFormulaStore((state) => state.result);
	const setShowSuggestions = useFormulaStore(
		(state) => state.setShowSuggestions
	);
	const calculateResult = useFormulaStore((state) => state.calculateResult);

	const { suggestions, handleSelectSuggestion } = useFormulaSuggestions({
		isOperandNeeded,
		addToken,
		setInputValue,
		setShowSuggestions,
	});

	const { handleKeyDown } = useFormulaKeyHandlers({
		inputValue,
		setInputValue,
		tokens,
		addToken,
		removeToken,
		isOperandNeeded,
		suggestions,
		showSuggestions,
		setShowSuggestions,
		calculateResult,
		handleSelectSuggestion,
	});

	const renderTimeOptionMenu = (index: number) => ({
		items: TIME_OPTIONS,
		onClick: ({ key }: { key: string }) =>
			updateTokenTimeOption(index, key as TimeOption),
	});

	return {
		inputValue,
		tokens,
		showSuggestions,
		result,
		handleInputChange,
		handleKeyDown,
		handleSelectSuggestion,
		renderTimeOptionMenu,
	};
}
