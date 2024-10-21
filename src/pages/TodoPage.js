import TodoBoard from '../components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from '../utils/api';

function TodoPage() {
  const [taskValue, setTaskValue] = useState('');
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

  const init = () => {
    setTaskValue('');
  };

  const addTask = async () => {
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

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={taskValue}
            onChange={(event) => setTaskValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
    </Container>
  );
}

export default TodoPage;
