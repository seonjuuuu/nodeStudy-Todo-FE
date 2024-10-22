import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoBoard.module.scss';
import { PropagateLoader } from 'react-spinners';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoBoard = ({
  todoList,
  handleDeleteTask,
  handleUpdateTask,
  isLoading,
}) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [list, setList] = useState([]);

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

  useEffect(() => {
    setList(todoList);
  }, [todoList]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedList = [...list];
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedItem);
    setList(updatedList);
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <PropagateLoader color="#8f8f8f" loading={isLoading} size={10} />
        </div>
      )}
      <div className={styles.todoBoard}>
        <h2 className={styles.date}>
          <span className={styles.day}>{day}</span>
          <div className={styles.date2}>
            <span className={styles.year}>{year}</span>
            <span className={styles.month}>{month}</span>
          </div>
        </h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.todoList}
              >
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem
                            task={item.task}
                            id={item._id}
                            handleDeleteTask={handleDeleteTask}
                            handleUpdateTask={handleUpdateTask}
                            isComplete={item.isComplete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className={styles.noText}> 할일을 입력해 주세요 :) </p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default TodoBoard;
