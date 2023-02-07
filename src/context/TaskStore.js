import { createContext, useState } from "react";

export const TaskContext = createContext({});
// taskContext

export function TaskProvider({ children }) {
    const [singleTask, setSingleTask] = useState({ title: "", desc: "" });

    return (
        <TaskContext.Provider value={{state:{singleTask},setSingleTask}}>
            {children}
        </TaskContext.Provider>
    );
}
