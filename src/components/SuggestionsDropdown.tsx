import React from 'react';
import { FormulaTag } from '../stores/formulaStore';

type SuggestionsDropdownProps = {
	isLoading: boolean;
	suggestions: FormulaTag[];
	onSelectSuggestion: (suggestion: FormulaTag) => void;
};

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
	isLoading,
	suggestions,
	onSelectSuggestion,
}) => {
	if (!suggestions && !isLoading) return null;

	return (
		<div className='absolute top-full left-0 w-full max-h-[200px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md z-10'>
			{isLoading ? (
				<div className='p-2'>Loading...</div>
			) : suggestions.length > 0 ? (
				<ul className='list-none m-0 p-0'>
					{suggestions.map((suggestion) => (
						<li
							key={suggestion.id}
							onClick={() => onSelectSuggestion(suggestion)}
							className='p-3 cursor-pointer flex justify-between hover:bg-gray-100'
						>
							<span className='font-medium'>{suggestion.name}</span>
							<span className='text-gray-500 text-sm'>
								{suggestion.category}
							</span>
						</li>
					))}
				</ul>
			) : (
				<div className='p-2'>No suggestions found</div>
			)}
		</div>
	);
};

export default SuggestionsDropdown;
