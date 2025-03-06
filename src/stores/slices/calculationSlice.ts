import { StateCreator } from 'zustand';
import { TokenSlice } from './tokenSlice';

export interface CalculationSlice {
	result: number | null;
	calculateResult: () => void;
}

const evaluateFormula = (formula: string): number | null => {
	try {
		const evalFunc = new Function(`return ${formula}`);
		return evalFunc();
	} catch (error) {
		console.error('Error evaluating formula:', error);
		return null;
	}
};

export const createCalculationSlice: StateCreator<
	CalculationSlice & TokenSlice,
	[],
	[],
	CalculationSlice
> = (set, get) => ({
	result: null,

	calculateResult: () =>
		set(() => {
			const { tokens } = get();

			try {
				const formula = tokens
					.map((token) => {
						switch (token.type) {
							case 'tag':
								return token.value;
							case 'number':
								return parseFloat(token.value);
							case 'operator':
								return token.value;
							default:
								return '';
						}
					})
					.join('');

				const result = formula.trim() ? evaluateFormula(formula) : null;

				return { result };
			} catch (error) {
				console.error('Error calculating formula:', error);
				return { result: null };
			}
		}),
});
