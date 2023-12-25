import { Container, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const TodoList = (props) => {
  const { todoList, setTodoList } = props;

  return (
    <Container maxWidth='xs'>
      {todoList.map((todo) => {
        console.log(todoList)
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
              }}
              variant='standard'
              disabled={todo.done}
            />
            <IconButton
              aria-label='delete'
              size='large'
              type='submit'
              onClick={() => {
                const newTodoList = todoList.filter((item) => item.id !== todo.id);
                setTodoList(newTodoList);
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
