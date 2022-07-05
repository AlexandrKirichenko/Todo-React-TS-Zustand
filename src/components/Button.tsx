import cn from 'classnames';
import React from 'react';

type ButtonType = {
	active?: boolean,
	onClick: () => void,
	children: string
}

const Button: React.FC<ButtonType> = ({ active, onClick, children }) => {
	return <button
		className={cn('w-16 bg-pink-400 hover:bg-pink-500  rounded-lg my-1 px-3 py-1 transition-colors ease-in-out duration-300', { 'bg-pink-600': active })}
		onClick={onClick}>{children}
	</button>;
}

export default Button;