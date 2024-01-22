import React from 'react';
import { Container, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';


export const TodoForm = (props) => {

    const { todo, setTodo, todoList, setTodoList } = props;
    const [buttonClicked, setButtonClicked] = React.useState(false);

    const handleAddTodo = () => {
        if (todo.trim() === '') {
            setButtonClicked(true);
            console.log('Todo is empty!');
            return;
        }

        const currentDate = new Date();

        const newTodo = {
            // id: Math.random().toString(32).substring(2,9), 
            id: currentDate.getTime(), // ミリ秒単位のUNIXエポック時間
            title: todo,
            done: false,
        };

        console.log('addButton:onClick');

        axios.post('http://127.0.0.1:8000/api/add_todo', newTodo)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setTodoList([...todoList, newTodo]);
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