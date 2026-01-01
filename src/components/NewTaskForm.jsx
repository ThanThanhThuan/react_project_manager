import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';

const NewTaskForm = () => {
    const { state, dispatch } = useProject();
    const [content, setContent] = useState('');
    const [assignee, setAssignee] = useState('Alice');

    if (state.user.role !== 'admin') return null; // RBAC: Hide for non-admins

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) return;
        dispatch({ type: 'ADD_TASK', payload: { content, assignee } });
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="new-task-form">
            <input
                type="text"
                placeholder="New Task..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Charlie">Charlie</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default NewTaskForm;