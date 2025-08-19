import React from "react";
import { useState, useRef } from "react";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import "./style.css";

const Home = () => {
  const [todoText, setTodoText] = useState("");
  const tasks = ["One", "Two", "Three"];
  const [toDo, setToDo] = useState(tasks);
  const [done, setDone] = useState([]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    setToDo((previous) => [...previous, todoText]);
    setTodoText("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (task) => {
    return (event) => event.dataTransfer.setData("id", task);
  };

  const handleDoneDrop = (event) => {
    const data = event.dataTransfer.getData("id");
    setToDo((previous) => previous.filter((task) => task !== data));
    setDone((previous) => [...previous, data]);
  };

  const handleToDoDrop = (event) => {
    const data = event.dataTransfer.getData("id");
    setDone((previous) => previous.filter((task) => task !== data));
    setToDo((previous) => [...previous, data]);
  };

  const handleDeleteDrop = (event) => {
    const data = event.dataTransfer.getData("id");
    setDone((previous) => previous.filter((task) => task !== data));
  };

  return (
    <>
      <h2>Todo Management</h2>
      <div>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px", // spacing between input & button
          }}
          onSubmit={handleAddTodo}
        >
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter new todo"
            style={{
              flex: 1, // take available space
              padding: "8px 12px",
              fontSize: "16px",
              minHeight: "22px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
          <button
            disabled={!todoText.trim()}
            style={{
              background: !todoText.trim()
                ? "#b0b0b0" // gray when disabled
                : "linear-gradient(135deg, #4CAF50, #2E7D32)", // gradient green
              color: "white",
              fontWeight: "bold",
              border: "none",
              cursor: !todoText.trim() ? "not-allowed" : "pointer",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)", // modern shadow
              opacity: !todoText.trim() ? 0.6 : 1,
            }}
            type="submit"
          >
            <FaPlus />
          </button>
        </form>
      </div>
      <div>
        <div className="list-card">
          <div
            className="card list-card-todo"
            onDragOver={handleDragOver}
            onDrop={handleToDoDrop}
          >
            <b>Todo</b>
            <div className="task-list">
              {toDo.map((task, index) => (
                <div
                  key={index}
                  className="task"
                  draggable
                  onDragStart={handleDragStart(task)}
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
          <div
            className="card list-card-done"
            onDragOver={handleDragOver}
            onDrop={handleDoneDrop}
          >
            <b>Done</b>
            <div className="task-list">
              {done.map((task) => (
                <div
                  className="task"
                  draggable
                  onDragStart={handleDragStart(task)}
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
          <div
            className="card list-card-delete"
            onDragOver={handleDragOver}
            onDrop={handleDeleteDrop}
          >
            <b>Delete</b>
            <div className="task-list" style={{ verticalAlign: "center", padding: "1em" }}>
              <FaTrash />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
