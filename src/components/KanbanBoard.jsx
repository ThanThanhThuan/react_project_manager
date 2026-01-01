import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useProject } from '../context/ProjectContext';
import Column from './Column';

const KanbanBoard = () => {
    const { state, dispatch } = useProject();

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        dispatch({
            type: 'MOVE_TASK',
            payload: { source, destination, draggableId },
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-grid">
                {state.columnOrder.map((colId) => {
                    const column = state.columns[colId];
                    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;