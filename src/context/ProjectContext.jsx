/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

// Initial Complex State
const initialState = {
    user: { name: 'Alice', role: 'admin' }, // Roles: 'admin' | 'member'
    tasks: {
        'task-1': { id: 'task-1', content: 'Design DB Schema', assignee: 'Alice' },
        'task-2': { id: 'task-2', content: 'Client Meeting', assignee: 'Bob' },
        'task-3': { id: 'task-3', content: 'Fix Navigation Bug', assignee: 'Alice' },
        'task-4': { id: 'task-4', content: 'Optimize Images', assignee: 'Bob' },
    },
    columns: {
        'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
        'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
        'col-3': { id: 'col-3', title: 'Done', taskIds: ['task-4'] },
    },
    columnOrder: ['col-1', 'col-2', 'col-3'],
};

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'SWITCH_ROLE':
            return { ...state, user: { ...state.user, role: action.payload } };

        case 'ADD_TASK':
            if (state.user.role !== 'admin') return state; // RBAC Check
            const newId = uuidv4();
            const newTask = { id: newId, content: action.payload.content, assignee: action.payload.assignee };
            return {
                ...state,
                tasks: { ...state.tasks, [newId]: newTask },
                columns: {
                    ...state.columns,
                    'col-1': {
                        ...state.columns['col-1'],
                        taskIds: [...state.columns['col-1'].taskIds, newId],
                    },
                },
            };

        case 'DELETE_TASK':
            if (state.user.role !== 'admin') return state; // RBAC Check
            const { [action.payload]: deleted, ...remainingTasks } = state.tasks;
            const newCols = {};
            for (const [key, col] of Object.entries(state.columns)) {
                newCols[key] = {
                    ...col,
                    taskIds: col.taskIds.filter((id) => id !== action.payload),
                };
            }
            return { ...state, tasks: remainingTasks, columns: newCols };

        case 'MOVE_TASK':
            const { source, destination, draggableId } = action.payload;
            const startCol = state.columns[source.droppableId];
            const finishCol = state.columns[destination.droppableId];

            // Moving within the same column
            if (startCol === finishCol) {
                const newTaskIds = Array.from(startCol.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newCol = { ...startCol, taskIds: newTaskIds };
                return {
                    ...state,
                    columns: { ...state.columns, [newCol.id]: newCol },
                };
            }

            // Moving from one column to another
            const startTaskIds = Array.from(startCol.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = { ...startCol, taskIds: startTaskIds };

            const finishTaskIds = Array.from(finishCol.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = { ...finishCol, taskIds: finishTaskIds };

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };

        default:
            return state;
    }
};

export const ProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectReducer, initialState);
    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);