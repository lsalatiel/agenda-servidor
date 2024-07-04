import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Schedule from "./views/Schedule.jsx";
import MySchedules from "./views/MySchedules.jsx";
import ScheduleList from "./views/ScheduleList.jsx"

// 1. Import the extendTheme function
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/agendar",
        element: <Schedule />,
    },
    {
        path: "/meus-agendamentos",
        element: <MySchedules />,
    },
    {
        path: "/consulta",
        element: <ScheduleList />,
    },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
