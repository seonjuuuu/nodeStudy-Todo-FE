import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoBoard.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {todoList.length > 0 ? (
          todoList.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TodoItem
                task={item.task}
                id={item._id}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                isComplete={item.isComplete}
              />
            </motion.div>
          ))
        ) : (
          <p className={styles.noText}> 할일을 입력해 주세요 :) </p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoBoard;
