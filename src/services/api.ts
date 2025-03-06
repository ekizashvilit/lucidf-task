import { FormulaTag } from '../stores/formulaStore';

const API_URL = 'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete';

export const fetchSuggestions = async (
	searchTerm: string
): Promise<FormulaTag[]> => {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();

		if (searchTerm) {
			return data.filter(
				(item: FormulaTag) =>
					item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return data;
	} catch (error) {
		console.error('Error fetching suggestions:', error);
		throw error;
	}
};
