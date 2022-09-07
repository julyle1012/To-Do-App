import React, { useEffect, useState } from "react";
// @ts-ignore
import ListItems from "./ListItem.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Style/App.scss";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TaskType } from "../Type";
library.add(faTrash);

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(null);
  const dateCreate = moment().format("DD/MM/YYYY, h:mm");

  useEffect(() => {
    const data = localStorage.getItem("tasks");

    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  const handleCheckSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };
  const [status, setStatus] = useState<boolean>();

  const handleAddTasks = () => {
    const dataValue = {
      key: Date.now(),
      name: taskName,
      description: taskDescription,
      dateCreate,
      selectedDate: moment(selectedDate).format("DD/MM/YYYY"),
      status,
    };

    setTaskName("");
    setTaskDescription("");
    setSelectedDate(null);
    
    const dataToDoList = [...tasks, dataValue];
    localStorage.setItem("tasks", JSON.stringify(dataToDoList));
    setTasks(dataToDoList);
  };

  console.log(tasks.map((item) => item.name));

  function deleteFromTasks(key: ListItems.checkBox.length) {
    var dataToDoList: TaskType[] = undefined || [];

    console.log(key);

    dataToDoList = tasks.filter((item) => !key.includes(item.key));

    localStorage.setItem("tasks", JSON.stringify(dataToDoList));
    setTasks(dataToDoList);
  }

  function updateStatus(key: any, status: boolean) {
    var dataToDoList: TaskType[] = undefined || [];
    dataToDoList = tasks.map((item) => {
      if (!checkDuplicateKey(key, item.key)) {
        item.status = status;
      }
      return item;
    });

    function checkDuplicateKey(arrKey: number[], key: number) {
      for (let i = 0; i < arrKey.length; i++) {
        if (arrKey[i] == key) {
          return false;
        }
      }
      return true;
    }

    console.log(dataToDoList);
    localStorage.setItem("tasks", JSON.stringify(dataToDoList));
    setTasks(dataToDoList);
  }

    function updateFromTasks(taskEdit: TaskType) {
      
      const dataToDoList = tasks.map((TaskType) => {
        if (taskEdit.key === TaskType.key) {
          return taskEdit;
        }
        return TaskType;
      });
      console.log(dataToDoList);
      localStorage.setItem("tasks", JSON.stringify(dataToDoList));
      setTasks(dataToDoList);
    }

  return (
    <div className="container">
      <div className="container-form">
        <div className="container-form-infor" id="form-infor">
          <h1 className="container-form-infor-title">Tasks</h1>
          <div className="container-form-infor-name">
            <label htmlFor="input-name">Name : </label>
            <input
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
              name="name"
              id="input-name"
              type="text"
              placeholder="Enter task"
            />
          </div>
          <div className="container-form-infor-date"></div>
          <div className="container-form-infor-description">
            <label htmlFor="input-desctiption">Description : </label>
            <textarea
              onChange={(e) => setTaskDescription(e.target.value)}
              value={taskDescription}
              id="input-desctiption"
              name="desctiption"
              placeholder="Enter description"
            />
          </div>
          <div className="container-form-infor-selected-date">
            <label>Expected completion date</label>
            <DatePicker
              dateFormat={"dd/MM/yyyy"}
              selected={selectedDate}
              minDate={new Date()}
              onChange={handleCheckSelectedDate}
            />
          </div>
        </div>
        <div className="container-form-submit">
          <button type="submit" onClick={handleAddTasks}>
            Add
          </button>
        </div>
      </div>
      <div>
        <ListItems
          items={tasks}
          updateStatus={updateStatus}
          remove={deleteFromTasks}
          update={updateFromTasks}
        />
      </div>
    </div>
  );
}
export default App;