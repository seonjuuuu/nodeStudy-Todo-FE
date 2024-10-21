import TodoBoard from '../components/TodoBoard';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import styles from './TodoPage.module.scss';
import Loading from '../components/Loading';

function TodoPage() {
  const [taskValue, setTaskValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTaskList = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await api.get('/tasks');
      setTodoList(data);
    } catch (err) {
      console.error(err);
      alert('리스트를 불러오는데 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const init = () => {
    setTaskValue('');
  };

  const addTask = async () => {
    if (taskValue.trim.length === 0) {
      alert('할일을 입력해 주세요');
      return;
    }
    try {
      const params = {
        task: taskValue,
        isComplete: false,
      };
      const res = await api.post('/tasks', params);
      if (res.status !== 200) throw Error('task Error');
      getTaskList();
      init();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await api.delete(`/tasks/${id}`);
      if (res.status !== 200) throw Error('fail delete');
      getTaskList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      const taskUpdate = todoList.find((item) => item._id === id);
      if (!taskUpdate) return;

      const updateData = {
        ...taskUpdate,
        isComplete: !taskUpdate.isComplete,
      };
      const res = await api.put(`/tasks/${id}`, updateData);
      if (res.status !== 200) throw Error('fail update');
      getTaskList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      event.preventDefault();
      addTask();
    }
  };

  const handleTask = (event) => {
    setTaskValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.addItemRow}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className={styles.inputBox}
            value={taskValue}
            onChange={handleTask}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <button className={styles.buttonAdd} onClick={addTask}>
            추가
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <TodoBoard
          todoList={todoList}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
}

export default TodoPage;
