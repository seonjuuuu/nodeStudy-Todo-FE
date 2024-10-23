import React, { useEffect, useState } from 'react';
import styles from './TodoItem.module.scss';
import { HiTrash } from 'react-icons/hi2';
import { durationText } from '../utils/date';

const TodoItem = ({
  task,
  id,
  handleDeleteTask,
  handleUpdateTask,
  isComplete,
  author,
  user,
  created,
}) => {
  const [isWriter, setIsWriter] = useState(true);

  const deleteItem = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await handleDeleteTask(id);
    } catch (err) {
      console.error(err);
    }
  };

  const changeComplete = async () => {
    try {
      await handleUpdateTask(id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsWriter(user._id === author._id);
  }, [user, author]);

  return (
    <div className={styles.todoItem}>
      <div className={styles.customCheckbox}>
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          className={styles.checkbox}
          checked={isComplete}
          onChange={changeComplete}
        />
        <label htmlFor={`checkbox-${id}`}></label>
      </div>
      <div
        className={`${styles.todoContent} ${isComplete ? styles.completed : ''}`}
      >
        <div className={styles.detail}>
          <div className={styles.time}>{durationText(created)}</div>
          <div className={styles.task}>{task}</div>
          <div className={styles.author}>by.{author.name} </div>
        </div>
        {isWriter && (
          <button className={styles.buttonDelete} onClick={deleteItem}>
            <HiTrash size="25" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
