import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoBoard.module.scss';

const TodoBoard = ({ todoList, handleDeleteTask, handleUpdateTask }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const monthNames = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    const month = monthNames[today.getMonth()];
    const day = String(today.getDate()).padStart(2, '0');
    setMonth(month);
    setDay(day);
    setYear(year);
  }, []);

  return (
    <div className={styles.todoBoard}>
      <h2 className={styles.date}>
        <span className={styles.day}>{day}</span>
        <div className={styles.date2}>
          <span className={styles.year}>{year}</span>
          <span className={styles.month}>{month}</span>
        </div>
      </h2>
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
