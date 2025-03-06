import React, { useRef } from 'react';
import { Input, InputRef } from 'antd';

type FormulaInputProps = {
	onInputChange: (value: string) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	inputValue: string;
};

const FormulaInput: React.FC<FormulaInputProps> = ({
	onInputChange,
	onKeyDown,
	inputValue,
}) => {
	const inputRef = useRef<InputRef>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInputChange(e.target.value);
	};

	return (
		<Input
			ref={inputRef}
			value={inputValue}
			onChange={handleChange}
			onKeyDown={onKeyDown}
			className='flex-grow border-none shadow-none p-1 focus:outline-none'
			placeholder='Type here...'
		/>
	);
};

export default FormulaInput;
