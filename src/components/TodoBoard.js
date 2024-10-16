import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import TodoItem from './TodoItem';

const TodoBoard = () => {
  const [todoList, setTodoList] = useState([]);

  const getTaskList = async () => {
    try {
      const {
        data: { data },
      } = await api.get('/tasks');
      setTodoList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      {todoList.map((item) => (
        <TodoItem task={item.task} />
      ))}
      <h2>There is no Item to show</h2>
    </div>
  );
};

export default TodoBoard;
