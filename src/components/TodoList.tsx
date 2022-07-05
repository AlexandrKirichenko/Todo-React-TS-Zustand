import React from 'react';

import {ITodo} from '../types/data';

import {TodoItem} from './TodoItem';

interface ITodoListProps{
  items: ITodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  refactorTodo: (id: number, title: string) => void;
}

const TodoList: React.FC<ITodoListProps> = ({items, toggleTodo, removeTodo,refactorTodo}) => {
  
  return (
    <div>
      {
        items.map(todo =>
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            refactorTodo={refactorTodo}
          />)
      }
    </div>
  )
}

export {TodoList};