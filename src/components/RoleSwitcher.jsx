import React from 'react';
import { useProject } from '../context/ProjectContext';

const RoleSwitcher = () => {
    const { state, dispatch } = useProject();
    return (
        <div className="role-switcher">
            <span>Current Role: <strong>{state.user.role.toUpperCase()}</strong></span>
            <div className="toggle-btns">
                <button onClick={() => dispatch({ type: 'SWITCH_ROLE', payload: 'admin' })} disabled={state.user.role === 'admin'}>Admin View</button>
                <button onClick={() => dispatch({ type: 'SWITCH_ROLE', payload: 'member' })} disabled={state.user.role === 'member'}>Member View</button>
            </div>
        </div>
    );
};

export default RoleSwitcher;