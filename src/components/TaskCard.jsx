import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useProject } from '../context/ProjectContext';

const TaskCard = ({ task, index }) => {
    const { state, dispatch } = useProject();
    const isAdmin = state.user.role === 'admin';

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="task-header">
                        <span className="assignee-badge">{task.assignee.charAt(0)}</span>
                        {isAdmin && (
                            <button
                                className="delete-btn"
                                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                            >
                                &times;
                            </button>
                        )}
                    </div>
                    <p>{task.content}</p>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;