import React from 'react';
import { Container, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export const TodoForm = (props) => {

    const { todo, setTodo, todoList, setTodoList } = props;
    const [buttonClicked, setButtonClicked] = React.useState(false);

    const handleAddTodo = () => {
        if (todo.trim() === '') {
            setButtonClicked(true);
            console.log('Todo is empty!');
            return;
        }

        console.log('addButton:onClick');
        setTodoList([...todoList, todo]);
        setTodo('');
        setButtonClicked(false); // ボタンがクリックされた後はエラーをリセット
    };

    return (
        <Container maxWidth='xs' sx={{ my:3 }}>    {/* m of sx ... mergin*/}
            <TextField
                id='inputTodo'
                label=''
                type='text'
                name='inputTodo'
                placeholder='Input TODO'
                value={todo}
                onChange={(e) => {
                    console.log('inputTodo:onChange');
                    setTodo(e.target.value);
                }}
                variant='outlined'
                helperText={buttonClicked ? '1文字以上入力してください' : ''}
                error={buttonClicked ? true : false}
            />
            <IconButton
                aria-label='add'
                size='large'
                type='submit'
                onClick={handleAddTodo}
            >
                <AddIcon fontSize='inherit' />    {/* inherit...継承 */}
            </IconButton>
        </Container>
    );
};