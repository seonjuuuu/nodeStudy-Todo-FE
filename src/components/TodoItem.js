import React from 'react';
import { Col, Row } from 'react-bootstrap';

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
    <Row>
      <Col xs={12}>
        <div
          className={`todo-item`}
          style={{
            backgroundColor: isComplete ? '#f0f0f0' : 'white',
            color: isComplete ? '#aaa' : 'black',
          }}
        >
          {' '}
          <div className="todo-content">{task}</div>
          <div>
            <button className="button-delete" onClick={deleteItem}>
              삭제
            </button>
            <button className="button-delete" onClick={changeComplete}>
              {isComplete ? '끝남' : '안끝남'}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
