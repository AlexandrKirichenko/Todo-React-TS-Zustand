import React, { useEffect, useRef } from 'react';

type TTodoInput = {
	value: string;
	placeholder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputTodo: React.FC<TTodoInput> = ( { value, onChange, onKeyDown,placeholder}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		if (inputRef.current && inputRef.current?.placeholder === 'Type here...') inputRef.current.focus();
	}, []);
	
	console.log('INPUT', inputRef.current?.placeholder);
	
	return <input className='w-full px-0.5 py-0.5 border border border-gray-600 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500  bg-gray-600 text-white'
								value={value}
								onChange={onChange}
								onKeyDown={onKeyDown}
								ref={inputRef}
								placeholder={placeholder}
	/>;
}
export default InputTodo;