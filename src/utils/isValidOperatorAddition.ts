export function isValidOperatorAddition(tokens: any[], operatorKey: string) {
	if (tokens.length === 0) return true;

	const lastToken = tokens[tokens.length - 1];
	const isParenthesis = operatorKey === '(' || operatorKey === ')';

	const isAddingOperatorAfterOperator =
		lastToken.type === 'operator' &&
		!isParenthesis &&
		!lastToken.value.includes('(') &&
		!lastToken.value.includes(')');

	return !isAddingOperatorAfterOperator || isParenthesis;
}

export function isOperandNeeded(tokens: any[]) {
	if (tokens.length === 0) return false;
	const lastToken = tokens[tokens.length - 1];
	return lastToken.type !== 'operator';
}
