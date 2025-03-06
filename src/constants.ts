import { TimeOption } from './stores/formulaStore';

export const OPERATORS = ['+', '-', '*', '/', '(', ')', '^'];

export const TIME_OPTIONS: { key: TimeOption; label: string }[] = [
	{ key: 'this month', label: 'This Month' },
	{ key: 'previous month', label: 'Previous Month' },
	{ key: 'last year', label: 'Last Year' },
	{ key: 'custom', label: 'Custom...' },
];

export const DEFAULT_TIME_OPTION: TimeOption = 'this month';
