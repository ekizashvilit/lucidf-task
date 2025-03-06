import React from 'react';

import TokenDisplay from './TokenDisplay';
import FormulaInput from './FormulaInput';
import SuggestionsDropdown from './SuggestionsDropdown';
import { useSuggestions } from '../hooks/useSuggestions';
import { useFormulaEditor } from '../hooks/useFormulaEditor';

export const FormulaEditor: React.FC = () => {
	const {
		inputValue,
		tokens,
		showSuggestions,
		result,
		handleInputChange,
		handleKeyDown,
		handleSelectSuggestion,
		renderTimeOptionMenu,
	} = useFormulaEditor();

	const { suggestions = [], isLoading } = useSuggestions();

	return (
		<div className='border border-gray-300 rounded-md p-3 bg-white shadow-sm'>
			<div className='relative'>
				<div className='flex flex-wrap items-center gap-1 gap-y-3 min-h-[32px]'>
					{tokens.map((token, index) => (
						<TokenDisplay
							key={index}
							token={token}
							index={index}
							renderTimeOptionMenu={renderTimeOptionMenu}
						/>
					))}

					<FormulaInput
						inputValue={inputValue}
						onInputChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>
				</div>

				{showSuggestions && (
					<SuggestionsDropdown
						isLoading={isLoading}
						suggestions={suggestions}
						onSelectSuggestion={handleSelectSuggestion}
					/>
				)}
			</div>

			{result !== null && (
				<div className='mt-4 p-2 bg-gray-100 rounded-md font-medium'>
					Result: {result}
				</div>
			)}
		</div>
	);
};

export default FormulaEditor;
