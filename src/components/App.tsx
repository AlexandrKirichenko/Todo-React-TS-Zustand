import cn from 'classnames';
import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { BsX } from 'react-icons/bs';

import { createRoot } from 'react-dom/client';

import { ITodo } from '../types/data';

import { TodoList } from '../components/TodoList';
import Button from '../components/Button';

import InputTodo from './InputTodo';


const App: React.FC = () => {
	const [value, setValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [filterStatus, setFilterStatus] = useState('Active'); //Active,Done
	
	// const inputRef = useRef<HTMLInputElement>(null);
	
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	};
	
	const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearchValue(e.target.value);
	};
	
	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') addTodo();
	};
	
	const addTodo = () => {
		if (value) {
			setTodos([...todos, {
				id: Date.now(),
				title: value,
				complete: false,
			}]);
			setValue('');
		}
	};
	
	const searchTodo = () => {
		if (searchValue) {
			setTodos(todos.filter(todo => todo.title.includes(searchValue)));
		}
		setSearchValue('');
	};
	
	
	const removeTodo = (id: number): void => {
		setTodos(todos.filter(todo => todo.id !== id));
	};
	
	const toggleTodoo = (id: number): void => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo;
			
			return {
				...todo,
				complete: !todo.complete,
			};
		}));
	};
	
	const refactorTodo = (id: number, title: string): void => {
		setTodos(todos.map(todo => {
			return {
				...todo,
				title: todo.id === id ? title : todo.title,
			};
		}));
	};
	
	
	const filterTodo = (todos: ITodo[], filterStatus: string) => {
		switch (filterStatus) {
			case 'All':
				return todos;
			case 'Active':
				return todos.filter(todo => !todo.complete);
			case 'Done':
				return todos.filter(todo => todo.complete);
			default:
				return todos;
		}
	};
	const searchFilteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()));
	const currentTodoList = !searchValue ? filterTodo(todos, filterStatus) : filterTodo(searchFilteredTodos, filterStatus);
	
	const buttons = [
		{ name: 'All' }, { name: 'Active' }, { name: 'Done' },
	];
	
	return (
		<div className='flex justify-center w-full'>
			<div className='min-w-[30%]'>
				<h1 className='text-2xl font-bold text-center mb-4'>Easy Todo</h1>
				<article className='flex justify-center gap-x-2'>
					{
						buttons.map(({ name }) => {
								const isActive = filterStatus === name;
								return (
									<Button key={name} active={isActive} onClick={() => setFilterStatus(name)}>{name}</Button>
								);
							},
						)
					}
				</article>
				<div className='flex items-center'>
					<InputTodo value={value} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Type here...' />
					<div className='relative'>
						{value && <BsX onClick={() => setValue('')} size={22}
													 className='absolute right-16 top-2 align-center text-orange-500 hover:text-red-600 transition-colors ease-in-out duration-300' />}
						<Button onClick={addTodo}>Add</Button>
					</div>
				</div>
				
				<TodoList
					items={currentTodoList}
					removeTodo={removeTodo}
					toggleTodo={toggleTodoo}
					refactorTodo={refactorTodo}
				/>
				<div className='flex items-center'>
					<InputTodo value={searchValue} onChange={handleSearchChange} placeholder='Search Todo...' />
					<div className='relative'>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;