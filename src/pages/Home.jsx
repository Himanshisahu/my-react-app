import React from "react";
import { useState, useRef } from "react";
import TodoBox from "./TodoBox";
import { savePosition, getPosition } from "../utils/storage";

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  const todoCountRef = useRef(0);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmedText = todoText.trim();
    if (trimmedText === "") return;
    todoCountRef.current++;
    savePosition(todoCountRef.current, { x: 100, y: 700 });
    setTodoList((prevList) => [
      ...prevList,
      { id: todoCountRef.current, text: todoText },
    ]);
    setTodoText("");
  };

  const positions = todoList.map((todo) => ({
    id: todo.id,
    position: getPosition(todo.id),
  }));

  return (
    <>
      <h2>Todo</h2>
      <div className="card">
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter new todo"
            style={{ marginRight: "20px", width: "250px", minHeight: "35px" }}
          />
          <button type="submit">+</button>
        </form>
      </div>
      <div>
        {todoList.map((todo) => (
          <TodoBox
            key={todo.id}
            id={todo.id}
            content={todo.text}
            existingBoxes={positions}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
