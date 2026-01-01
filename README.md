# React + Vite Project Manager with Kanban Board
Kanban Project Management Dashboard

Description: A complex productivity tool allowing teams to manage tasks via a drag-and-drop interface with role-based security permissions.

    Tech Stack: React, @hello-pangea/dnd, uuid, Context API + useReducer.

    Key Features:

        Drag & Drop Interface: Utilized dnd libraries to allow smooth movement of task cards between "To Do", "In Progress", and "Done" columns.

        Complex State Management: Implemented a normalized state shape (Hash Maps) combined with useReducer to handle nested object updates efficiently.

        Role-Based Access Control (RBAC): distinguished between Admin and Member roles, restricting delete and create actions to admins only.

        Optimistic UI: State updates occur instantly for the user while logic processes in the background.

<img width="1907" height="1028" alt="image" src="https://github.com/user-attachments/assets/57ee42a1-a9aa-4cae-8ab2-0dbec1c4080b" />

