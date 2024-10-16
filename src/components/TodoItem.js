import React from 'react';
import { Col, Row } from 'react-bootstrap';
import api from '../utils/api';

const TodoItem = ({ task, id, getTaskList }) => {
  const deleteItem = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await api.delete(`/tasks/${id}`);
      if (res.status !== 200) throw Error('fail delete');
      getTaskList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{task}</div>
          <div>
            <button className="button-delete" onClick={deleteItem}>
              삭제
            </button>
            <button className="button-delete">끝남</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
