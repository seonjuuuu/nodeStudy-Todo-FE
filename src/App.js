import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
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

  const handleAddTask = () => {
    addTask();
  };

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
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={handleAddTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} />
    </Container>
  );
}

export default App;
