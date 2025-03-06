import React from 'react';
import { Tag, Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { FormulaToken } from '../stores/formulaStore';

type MenuObject = {
	items: { key: string; label: string }[];
	onClick: (info: { key: string }) => void;
};

type TokenDisplayProps = {
	token: FormulaToken;
	index: number;
	renderTimeOptionMenu: (index: number) => MenuObject;
};

const TokenDisplay: React.FC<TokenDisplayProps> = ({
	token,
	index,
	renderTimeOptionMenu,
}) => {
	const addClickAreas = (content: React.ReactNode) => {
		return <div className='relative inline-block'>{content}</div>;
	};

	if (token.type === 'tag') {
		return addClickAreas(
			<span className='inline-flex items-center'>
				<Tag color='blue' className='flex items-center'>
					<span>#{token.value}</span>
					<Dropdown menu={renderTimeOptionMenu(index)} trigger={['click']}>
						<a onClick={(e) => e.preventDefault()} className='ml-1'>
							<Space>
								{token.timeOption}
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				</Tag>
			</span>
		);
	} else if (token.type === 'operator') {
		return addClickAreas(<span className='mx-1 font-bold'>{token.value}</span>);
	} else if (token.type === 'number') {
		return addClickAreas(<span className='text-blue-500'>{token.value}</span>);
	} else {
		return addClickAreas(<span>{token.value}</span>);
	}
};

export default TokenDisplay;
