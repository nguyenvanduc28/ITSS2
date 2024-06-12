// import React from 'react';

import { Checkbox } from "@mui/material";
import { styled } from '@mui/material/styles';
import moment from "moment";


const StyledTodoItem = styled('div')(({ isCompleted }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
    padding: '6px 0',
    margin: '16px 0',
    
    // backgroundColor: isCompleted ? 'lightgreen' : 'white',
    color: isCompleted ? '#d9d9d9' : '#000000de',
    // textDecoration: isCompleted ? 'line-through' : 'none'
}))


const TodoItem = (props) => {
    const {task, index, handleTaskCompleted} = props
    return (
        <StyledTodoItem isCompleted={task.completed}>
            <Checkbox onChange={() => handleTaskCompleted(index)} checked={task.completed}></Checkbox>
            <label>{task.title}</label>
        </StyledTodoItem>
    
    );
}

export default TodoItem;
