import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks }) => {
    return (
        <div className="column">
            <h3 className="column-title">
                {column.title} <span className="count">{tasks.length}</span>
            </h3>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        className={`task-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;