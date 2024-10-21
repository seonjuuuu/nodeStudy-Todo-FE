import React from 'react';
import styles from './TodoItem.module.scss';

const TodoItem = ({
  task,
  id,
  handleDeleteTask,
  handleUpdateTask,
  isComplete,
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
      <div
        className={styles.todoContent}
        style={{
          backgroundColor: isComplete ? '#f0f0f0' : 'white',
          color: isComplete ? '#aaa' : 'black',
        }}
      >
        <div>{task}</div>
        <div>
          <button className={styles.buttonDelete} onClick={deleteItem}>
            삭제
          </button>
          <button className={styles.buttonDelete} onClick={changeComplete}>
            {isComplete ? '끝남' : '안끝남'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
