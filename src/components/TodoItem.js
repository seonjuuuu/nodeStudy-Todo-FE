import React from 'react';
import styles from './TodoItem.module.scss';
import { HiTrash } from 'react-icons/hi2';
import { PropagateLoader } from 'react-spinners';

const TodoItem = ({
  task,
  id,
  handleDeleteTask,
  handleUpdateTask,
  isComplete,
  isLoading,
}) => {
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

  return (
    <div className={styles.todoItem}>
      {isLoading ? (
        <div className={styles.loading}>
          <PropagateLoader color="#8f8f8f" loading={isLoading} size={10} />
        </div>
      ) : (
        <>
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
            <div>{task}</div>
            <button className={styles.buttonDelete} onClick={deleteItem}>
              <HiTrash size="25" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
