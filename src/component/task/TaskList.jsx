import { useContext, useEffect, useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Modal, createStyles } from "@mantine/core";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddTask } from "./AddTask";
import { TaskContext } from "../../context/TaskStore";

function TaskList() {
    const [opened, setOpened] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [taskList, setTasks] = useState([]);
    const queryClient = useQueryClient();
    const {
        state: { singleTask },
    } = useContext(TaskContext);

    const { isLoading, error, data: taskData } = useQuery("taskData", () => fetch("http://localhost:7010/task").then((res) => res.json()));

    const deleteInDb = async (data) => {
        return axios
            .delete("http://localhost:7010/task/" + data)
            .then((res) => res)
            .catch((res) => res);
    };
    const { mutateAsync } = useMutation(deleteInDb);
    const deleteTask = async (ev) => {
        await mutateAsync(taskId);
        setTaskId(null);
        setDeleteOpen(false);
        queryClient.invalidateQueries("taskData");
    };

    const addTask = async (data) => {
        if (data?.taskId) {
            return axios
                .put("http://localhost:7010/task/" + data.taskId, data)
                .then((res) => res)
                .catch((res) => res);
        } else {
            return axios
                .post("http://localhost:7010/task", data)
                .then((res) => res)
                .catch((res) => res);
        }
    };
    const { mutateAsync: addTaskMethod } = useMutation(addTask);
    const handleAddTaskMethod = async (data) => {
        await addTaskMethod(data);
        setTaskId(null);
        setOpened(false);
        queryClient.invalidateQueries("taskData");
    };

    const handleDelete = (id) => {
        setTaskId(id);
        setDeleteOpen(true);
    };

    const handleEdit = (id) => {
        setTaskId(id);
        setOpened(true);
    };

    useEffect(() => {
        setTasks(taskData ?? []);
    }, [taskData]);

    async function onDragEnd(val) {
        console.log({ val });
        // Your version
        // let result = helper.reorder(val.source, val.destination, taskList);
        // setTasks(result);

        /// A different way!
        const { draggableId, source, destination } = val;

        const [sourceGroup] = taskList.filter((column) => column._id.toLowerCase() === source.droppableId.toLowerCase());

        // Destination might be `null`: when a task is
        // dropped outside any drop area. In this case the
        // task reamins in the same column so `destination` is same as `source`
        const [destinationGroup] = destination
            ? taskList.filter((column) => column._id.toLowerCase() === destination.droppableId.toLowerCase())
            : { ...sourceGroup };

        // We save the task we are moving
        const [movingTask] = sourceGroup.tasks.filter((t) => t._id === draggableId);

        const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
        const newDestinationGroupTasks = destinationGroup.tasks.splice(destination.index, 0, movingTask);

        if (source.droppableId !== destination.droppableId) {
            //update in db
            // console.log("87878787",movingTask);
            await addTaskMethod({ taskId: movingTask._id, status: destination.droppableId });
        }

        // add new columns
        const newTaskList = taskList.map((column) => {
            if (column._id === source._id) {
                return {
                    _id: column._id,
                    tasks: newSourceGroupTasks,
                };
            }
            if (column._id === destination._id) {
                return {
                    _id: column._id,
                    tasks: newDestinationGroupTasks,
                };
            }
            return column;
        });
        setTasks(newTaskList);
    }

    if (isLoading) return <h3>Loading</h3>;

    return (
        <>
            <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} centered title='Are You sure you want to delete?'>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={() => deleteTask()} style={{ marginRight: 5 }}>
                        Yes
                    </Button>
                    <Button onClick={() => setDeleteOpen(false)}>No</Button>
                </div>
            </Modal>
            <AddTask opened={opened} onClose={() => setOpened(false)} handleAddTaskMethod={handleAddTaskMethod} data={singleTask} taskId={taskId} />
            <Button variant='outline' style={{marginBottom:20}} onClick={() => setOpened(true)}>
                Add Task
            </Button>

            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Column
                        className='column'
                        droppableId='Pending'
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        list={taskList.find((a) => a?._id.toLowerCase() === "pending")?.tasks ?? []}
                        type='TASK'
                    />
                    <Column
                        className='column'
                        droppableId='Completed'
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        list={taskList.find((a) => a?._id.toLowerCase() === "completed")?.tasks ?? []}
                        type='TASK'
                    />
                </div>
            </DragDropContext>
        </>
    );
}

export default TaskList;
