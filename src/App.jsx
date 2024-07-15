import { useState, useEffect, useMemo } from "react";
import inboxall from "/inboxall.svg";
import uncheck from "/uncheck.svg";
import check from "/check.svg";
import checkP from "/checkP.svg";
import cancel from "/cancel.svg";
import "./App.css";

function App() {
  const intialList = [];

  const [list, setList] = useState(intialList);
  const [taskTitleInput, setTaskTitleInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storageTodo = JSON.parse(localStorage.getItem("tasks")) || intialList;
    setList(storageTodo);
  }, []);

  function handleImageCheck(id) {
    const updatedList = list.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
    setList(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  }

  function handleDeleteClick(id) {
    const updatedList = list.filter((task) => {
      return task.id !== id;
    });

    setList(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  }

  function handleAddTask() {
    let newtask = {
      id: Date.now(),
      title: taskTitleInput,
      isChecked: false,
    };

    setList([...list, newtask]);
    setTaskTitleInput("");

    localStorage.setItem("tasks", JSON.stringify([...list, newtask]));
  }

  const filteredList = useMemo(() => {
    return list.filter((task) => {
      console.log("aaaaaa");
      if (filter === "Done") return task.isChecked;
      if (filter === "To Do") return !task.isChecked;
      return true;
    });
  }, [list]);

  let myList = filteredList.map((task) => {
    return (
      <div className="task" key={task.id}>
        <div>
          {task.isChecked ? (
            <img
              src={checkP}
              alt="Inbox button"
              onClick={() => {
                handleImageCheck(task.id);
              }}
            />
          ) : (
            <img
              src={uncheck}
              alt="Inbox button"
              onClick={() => {
                handleImageCheck(task.id);
              }}
            />
          )}
          <p
            style={
              task.isChecked
                ? { textDecoration: "line-through", color: "#83839C" }
                : { textDecoration: "none", color: "#fff" }
            }
          >
            {task.title}
          </p>
        </div>
        <img
          src={cancel}
          alt="cancel button"
          onClick={() => {
            handleDeleteClick(task.id);
          }}
        />
      </div>
    );
  });

  return (
    <>
      <div className="sideBar">
        <div className="sideBarBtn" onClick={() => setFilter("All")}>
          <img src={inboxall} alt="Inbox button" />
          <p>All</p>
        </div>
        <div className="sideBarBtn" onClick={() => setFilter("To Do")}>
          <img src={uncheck} alt="uncheck button" />
          <p>To Do</p>
        </div>
        <div className="sideBarBtn" onClick={() => setFilter("Done")}>
          <img src={check} alt="check button" />
          <p>Done</p>
        </div>
      </div>
      <div className="MainSection">
        <div className="AddSection">
          <input
            type="text"
            placeholder="Enter Your Task"
            value={taskTitleInput}
            onChange={(e) => {
              setTaskTitleInput(e.target.value);
            }}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="TasksSection">
          <h4>{filter}</h4>

          {myList}
        </div>
      </div>
    </>
  );
}

export default App;
