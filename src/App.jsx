import React from 'react';
import { ProjectProvider } from './context/ProjectContext';
import KanbanBoard from './components/KanbanBoard';
import NewTaskForm from './components/NewTaskForm';
import RoleSwitcher from './components/RoleSwitcher';

function App() {
  return (
    <ProjectProvider>
      <div className="app-container">
        <header>
          <h1>Project Dashboard</h1>
          <RoleSwitcher />
        </header>

        {/* Only Admins see the form due to logic inside the component */}
        <NewTaskForm />

        <KanbanBoard />
      </div>
    </ProjectProvider>
  );
}

export default App;