import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TodoItem = ({ task }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{task}</div>
          <div>
            <button className="button-delete">삭제</button>
            <button className="button-delete">끝남</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
