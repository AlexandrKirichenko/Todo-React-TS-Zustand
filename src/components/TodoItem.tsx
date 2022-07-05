import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { AiTwotoneEdit } from 'react-icons/ai';

import { BsCheck } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

import { ITodo } from '../types/data';

interface ITodoItem extends ITodo {
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
	refactorTodo: (id: number, title: string) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
	const { id, title, complete, toggleTodo, removeTodo, refactorTodo } = props;
	const [isEditMode, setIsEditMode] = useState(false);
	
	const editTitleInputRef = useRef<HTMLInputElement>(null);
	
	const [val, setVal] = useState(title);
	
	useEffect(() => {
		if(isEditMode) editTitleInputRef?.current?.focus()
	}, [isEditMode]);
	
	
	return (
		<div className='w-full text-white flex items-center my-2 rounded-xl bg-gray-800 p-3'>
			<button onClick={() => toggleTodo(id)}
							className={cn('w-5 h-5 mr-3 flex items-center justify-center border-2 rounded-md border-pink-400', { 'bg-pink-400': complete })}>
				{complete && <BsCheck className='text-gray-900' size={24} />}
			</button>
			{
				isEditMode ? (
					<input
						className='max-w-[80%]  px-0.5 py-0.5 border border border-gray-600 rounded-md text-sm shadow-sm placeholder-slate-400
				focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500  bg-gray-600 text-white'
						value={val}
						ref={editTitleInputRef}
						onChange={(e) => e.target.value && setVal(e.target.value)}
						onKeyDown={(e) => {if (e.key === 'Enter') {
							refactorTodo(id,val);
							setIsEditMode(false)
						}}}
					/>
				) : (
					<span className={cn({ 'line-through': complete })}>{title}</span>
				)
			}
			<div className='flex ml-auto gap-2'>
				{
					isEditMode ?(<BsCheck size={22} className='cursor-pointer text-green-400 ml-auto' onClick={() => {
						refactorTodo(id,val);
						setIsEditMode(false)
					}
					} />):(<AiTwotoneEdit className='cursor-pointer text-white text-gray-400 hover:text-orange-600 transition-colors ease-in-out duration-300' size={24} onClick={() => setIsEditMode(true)}/>)
				}
				
				<BsTrash size={22}
								 className='cursor-pointer text-gray-400 hover:text-red-600 transition-colors ease-in-out duration-300 '
								 onClick={() => removeTodo(id)} />
				
			</div>
		</div>
	);
};

export { TodoItem };