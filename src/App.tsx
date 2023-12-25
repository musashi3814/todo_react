import { useState } from 'react';
import { Container, Box } from '@mui/material';
import { TodoForm } from './component/TodoForm';
import { TodoList } from './component/TodoList';
import React from 'react';

type Todo = {
    id: string;
    title: string;
    done: boolean;
};

export default function App () {
    const [todo, setTodo] = useState<string>('');
    const [todoList, setTodoList] = useState<Todo[]>([]);
    return (
        <Box>
            <Container maxWidth='xs'>
                <h1>TODO LIST</h1>
            </Container>
            <TodoForm todo={todo} setTodo={setTodo} todoList={todoList} setTodoList={setTodoList} />
            <TodoList todoList={todoList} setTodoList={setTodoList} />
        </Box>
    );
};
