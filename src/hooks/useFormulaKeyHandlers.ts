import { OPERATORS } from '../constants';

export function useFormulaKeyHandlers({
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
}) {
	const processInput = () => {
		if (!inputValue.trim()) return;

		const numVal = parseFloat(inputValue);

		if (isOperandNeeded()) {
			addToken({ type: 'operator', value: '+' });
		}

		if (!isNaN(numVal)) {
			addToken({ type: 'number', value: inputValue.trim() });
		} else {
			addToken({ type: 'text', value: inputValue.trim() });
		}

		setInputValue('');
	};

	const handleOperatorKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!OPERATORS.includes(e.key)) return false;

		e.preventDefault();

		if (inputValue.trim()) {
			processInput();
		}

		const isParenthesis = e.key === '(' || e.key === ')';
		const lastToken = tokens.length > 0 ? tokens[tokens.length - 1] : null;
		const isAddingOperatorAfterOperator =
			lastToken &&
			lastToken.type === 'operator' &&
			!isParenthesis &&
			!lastToken.value.includes('(') &&
			!lastToken.value.includes(')');

		if (!isAddingOperatorAfterOperator || isParenthesis) {
			addToken({ type: 'operator', value: e.key });
		}
		return true;
	};

	const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return false;

		e.preventDefault();

		if (inputValue.trim()) {
			const numVal = parseFloat(inputValue);
			if (!isNaN(numVal)) {
				if (isOperandNeeded()) {
					addToken({ type: 'operator', value: '+' });
				}
				addToken({ type: 'number', value: inputValue.trim() });
				setInputValue('');
				setShowSuggestions(false);
			} else {
				if (showSuggestions && suggestions && suggestions.length > 0) {
					handleSelectSuggestion(suggestions[0]);
				} else {
					if (isOperandNeeded()) {
						addToken({ type: 'operator', value: '+' });
					}
					addToken({ type: 'text', value: inputValue.trim() });
					setInputValue('');
					setShowSuggestions(false);
				}
			}
		} else {
			calculateResult();
		}
		return true;
	};

	const handleOtherKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && inputValue === '') {
			e.preventDefault();
			removeToken(tokens.length - 1);
		}

		if (e.key === ' ' && inputValue.trim()) {
			e.preventDefault();
			processInput();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (handleOperatorKeys(e)) return;
		if (handleEnterKey(e)) return;
		handleOtherKeys(e);
	};

	return {
		handleKeyDown,
		processInput,
	};
}
