import React, { useState, useEffect } from 'react';
import { Container, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const TodoList = (props) => {
  const { todoList, setTodoList } = props;
  const [checked, setChecked] = useState(() => todoList.map(() => false));

  useEffect(() => {
    setChecked(todoList.map(() => false));
  }, [todoList]);

  useEffect(() => {
    // checked リストの変更を検知して、checkbox の checked を更新する
    console.log('New checked values:', checked);
    todoList.forEach((todo, index) => {
      const checkbox = document.getElementById(`checked-${index}`);
      if (checkbox) {
        checkbox.checked = checked[index];
      }
    });
  }, [checked, todoList]);

  return (
    <Container maxWidth='xs'>
      {todoList.map((todo, index) => {
        console.log(todoList)
        console.log(checked)
        return (
          <div key={index}>
            <Checkbox
              {...label}
              checked={checked[index]}
              id={`checked-${index}`}
              onChange={(e) => {
                setChecked((prevChecked) =>
                  prevChecked.map((check, i) => (index === i ? e.target.checked : check))
                );
              }}
            />
            <TextField
              id='outputTodo'
              label=''
              name='outputTodo'
              value={todo}
              onChange={(e) => {
                setTodoList(
                  todoList.map((todo, i) => (index === i ? e.target.value : todo))
                );
              }}
              variant='standard'
              disabled={checked[index]}
            />
            <IconButton
              aria-label='delete'
              size='large'
              type='submit'
              onClick={() => {
                setTodoList((prevTodoList) => {
                  const newTodoList = prevTodoList.filter((todo, i) => index !== i);
                  console.log(newTodoList);
                  return newTodoList;
                });

                setChecked((prevChecked) => {
                  const newChecked = prevChecked.filter((check, i) => index !== i);
                  console.log(newChecked);
                  return newChecked;
                });
              }}
            >
              <DeleteIcon fontSize='inherit' />
            </IconButton>
          </div>
        );
      })}
    </Container>
  );
};
