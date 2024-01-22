import { Container, TextField, IconButton } from '@mui/material';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const TodoList = (props) => {
  const { todoList, setTodoList } = props;

  useEffect(() => {
    // データを取得する処理
    axios.get('http://127.0.0.1:8000/api/get_todo')
        .then((res) => {
            console.log(res.data);
            setTodoList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []); // [] は初回のみ実行されるようにする

  const handleDeleteTodo = (id) => {
    console.log('deleteButton:onClick');
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);

    axios.delete(`http://127.0.0.1:8000/api/delete_todo/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth='xs'>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            <Checkbox
              {...label}
              checked={todo.done}
              onChange={(e) => {
                const newTodoList = todoList.map((item) =>
                  item.id === todo.id ? { ...item, done: e.target.checked } : item
                );
                setTodoList(newTodoList);
                axios.put(`http://127.0.0.1:8000/api/update_done/${todo.id}`)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              }}
            />
            <TextField
              id='outputTodo'
              label=''
              name='outputTodo'
              value={todo.title}
              onChange={(e) => {
                const newTodoList = todoList.map((item) =>
                  item.id === todo.id ? { ...item, title: e.target.value } : item
                );
                setTodoList(newTodoList);
                axios.put(`http://127.0.0.1:8000/api/update_title/${todo.id}`, {title: e.target.value})
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
              });
              }}
              variant='standard'
              disabled={todo.done}
            />
            <IconButton
              aria-label='delete'
              size='large'
              type='submit'
              onClick={() => {handleDeleteTodo(todo.id)}}
            >
              <DeleteIcon fontSize='inherit' />
            </IconButton>
          </div>
        );
      })}
    </Container>
  );
};
