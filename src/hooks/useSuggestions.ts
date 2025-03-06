import { useQuery } from '@tanstack/react-query';
import { fetchSuggestions } from '../services/api';
import { FormulaTag, useFormulaStore } from '../stores/formulaStore';
import { useEffect } from 'react';

export const useSuggestions = () => {
	const searchTerm = useFormulaStore((state) => state.searchTerm);
	const setSuggestions = useFormulaStore((state) => state.setSuggestions);

	const { data, isLoading, error } = useQuery({
		queryKey: ['suggestions', searchTerm],
		queryFn: () => fetchSuggestions(searchTerm),
		staleTime: 60000,
	});

	useEffect(() => {
		if (data) {
			setSuggestions(data);
		}
	}, [data, setSuggestions]);

	return {
		suggestions: (data as FormulaTag[]) || [],
		isLoading,
		error,
	};
};
