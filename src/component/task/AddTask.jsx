import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box, Modal } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskStore";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

export function AddTask({ opened, onClose, taskId,handleAddTaskMethod }) {
    const { classes } = useStyles();
    const {state:{singleTask}} = useContext(TaskContext);

    const [title_, setTitle] = useState(singleTask.title);
    const [desc_, setDesc] = useState(singleTask.desc);

    useEffect(() => {
        setTitle(singleTask.title)
        setDesc(singleTask.desc)
    }, [singleTask]);

    // addTask
    const addTask = () => {
        handleAddTaskMethod({
            name:title_, description:desc_, status:"pending"
        })
    }

    return (
        <Modal opened={opened} onClose={onClose} centered title={taskId ? "edit task" : "add task"}>
            <TextInput label='Title' value={title_} onChange={(e) => setTitle(e.target.value)} placeholder='bring book' required />
            <TextInput label='Description' value={desc_} onChange={(e) => setDesc(e.target.value)} placeholder='bring book from library' required />
            <Button position='apart' mt='lg' onClick={addTask} className={classes.control}>
                {taskId ? "edit" : "add"}
            </Button>
        </Modal>
    );
}
