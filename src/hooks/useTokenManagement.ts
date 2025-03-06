import { useFormulaStore } from '../stores/formulaStore';

export function useTokenManagement() {
	const tokens = useFormulaStore((state) => state.tokens);
	const addToken = useFormulaStore((state) => state.addToken);
	const removeToken = useFormulaStore((state) => state.removeToken);
	const updateTokenTimeOption = useFormulaStore(
		(state) => state.updateTokenTimeOption
	);

	const isOperandNeeded = () => {
		if (tokens.length === 0) return false;
		const lastToken = tokens[tokens.length - 1];
		return lastToken.type !== 'operator';
	};

	return {
		tokens,
		addToken,
		removeToken,
		updateTokenTimeOption,
		isOperandNeeded,
	};
}
