import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoBoard.module.scss';

const TodoBoard = ({ todoList, handleDeleteTask, handleUpdateTask }) => {
  return (
    <div className={styles.todoBoard}>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item, index) => (
          <TodoItem
            key={index}
            task={item.task}
            id={item._id}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
            isComplete={item.isComplete}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
