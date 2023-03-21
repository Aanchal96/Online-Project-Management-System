import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ProjectList from "./projects";
import {AddProjectForm} from "./projects/add-project-form";
import {EditProjectForm} from "./projects/edit-project-form";
import Login from "./login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: 'projects',
                element: <ProjectList />
            },
            {
                path: 'add-project',
                element: <AddProjectForm />
            },
            {
                path: 'edit-project/:id',
                element: <EditProjectForm />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
