import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { Text, createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
    parent: {
        ...theme.fn.focusStyles(),
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
        padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },
    item: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
        padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: 30,
        fontWeight: 700,
        width: 60,
    },
}));

function Column(props) {
    const { classes, cx } = useStyles();
    const { droppableId, list, type, handleDelete, handleEdit } = props;

    // console.log("type = ", droppableId, list.map(v => v._id));

    return (
        <Droppable droppableId={droppableId} type={type} direction="vertical">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cx(classes.parent, { [classes.itemDragging]: snapshot.isDragging })}>
                    <Text >{droppableId}</Text>
                    {!!list.length &&
                        list.map((val, index) => {
                            return (
                                <Task
                                    id={val._id}
                                    key={val._id}
                                    index={index}
                                    title={val.name}
                                    desc={val.description}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                    cx={cx}
                                    classes={classes}
                                />
                            );
                        })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Column;
