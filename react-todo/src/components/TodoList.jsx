import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build Todo App", completed: false }
  ]);

  const addTodo = (text) => setTodos([...todos, { id: Date.now(), text, completed: false }]);
  const toggleTodo = (id) => setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddTodoForm = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) { onAdd(value); setValue(""); }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="New Todo" />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoList;