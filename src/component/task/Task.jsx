import { ActionIcon, Text } from "@mantine/core";
import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskContext } from "../../context/TaskStore";

function Task(props) {
    const { id, index, title, desc, handleEdit, handleDelete, cx, classes } = props;
    const { setSingleTask } = useContext(TaskContext);
    let style = {
        backgroundColor: "red",
    };

    const setForEdit = () => {
        handleEdit(id);
        setSingleTask({ title, desc, id });
    };

    return (
        <Draggable draggableId={id} index={index} type='TASK'>
            {(provided, snapshot) => (
                <div
                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <Text className={classes.symbol}>{"T"}</Text>
                    <div>
                        <Text>{title}</Text>
                        <Text color='dimmed' size='sm'>
                            Desc: {desc}
                        </Text>
                    </div>
                    <ActionIcon onClick={setForEdit}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                            <path fill='none' d='M0 0h24v24H0V0z' />
                            <path d='M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
                        </svg>
                    </ActionIcon>

                    <ActionIcon onClick={() => handleDelete(id)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                            <path fill='none' d='M0 0h24v24H0V0z' />
                            <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zm3.17-7.83c.39-.39 1.02-.39 1.41 0L12 12.59l1.42-1.42c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 14l1.42 1.42c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 15.41l-1.42 1.42c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 14l-1.42-1.42c-.39-.38-.39-1.02 0-1.41zM15.5 4l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z' />
                        </svg>
                    </ActionIcon>
                </div>
            )}
        </Draggable>
    );
}

export default Task;
