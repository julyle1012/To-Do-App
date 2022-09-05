import "./ListItem.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {useLinkClickHandler} from "react-router-dom";

import {
  faTrash,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TaskType } from "../Type";
import ViewDetail from "./ViewDetail";

function ListItem(props: any) {
  const items: TaskType[] = props.items;
  const [arrTick, setArrTick] = useState([]);
  const [viewDetail, setViewDetail] = useState<TaskType>(null);
  const [isOpenViewDetail, setIsViewDetail] = useState(false);

  useEffect(() => {
    setViewDetail(null);
  }, [items]);

  const handleClickViewDetail = (key: number) => {
    console.log(key);
    setIsViewDetail(true);
    setViewDetail(items.find((item) => item.key === key));
  };

  function checkBox(
    key: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    var check = (event.target as HTMLInputElement) || null;
    if (check?.checked) {
      let newArrTick = [...arrTick, key];
      setArrTick(newArrTick);
    } else {
      let newArrTick = arrTick.filter((item) => item !== key);
      setArrTick(newArrTick);
    }
    console.log(arrTick);
  }

  function edit(key: number) {
    // if (detail != null) {
    //     setDetail(null)
    //     return
    // }
    // items.filter((item: task) => {
    //     if (item.key === key) {
    //         dataToDoList = new task(item.key, item.taskName, item.taskDescription, item.dateCreate, item.selectedDate, item.status);
    //     }
    // });
    // setDetail(
    //     details(true)
    // )
  }

  return (
    <div className="infor-tasks">
      <div
        className="infor-tasks-feature"
        style={
          Object.keys(items).length === 0
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <FontAwesomeIcon
          className="infor-tasks-feature-icon trash"
          icon={faTrash}
          onClick={() =>
            props.remove(arrTick)
          }
        />

        <button
          className="infor-tasks-feature-icon finish"
          onClick={() => props.updateStatus(arrTick, true)}
        >
          Complied
        </button>

        <button
          className="infor-tasks-feature-icon unfinish"
          onClick={() => props.updateStatus(arrTick, false)}
        >
          Incomplete
        </button>
      </div>

      <div className="infor-tasks-list">
        {items.map((item) => (
          <div key={item.key} className="infor-tasks-list-block">
            <div className="infor-tasks-list-item">
              <input
                aria-label="name"
                className="infor-tasks-list-item-title"
                value={item.name}
                readOnly
              />
            </div>

            <div className="infor-tasks-list-action">
              <button
                type="button"
                onClick={() => handleClickViewDetail(item.key)}
              >
                View Detail
              </button>

              {/* <button type="submit" onClick={() => { edit(item.key) }}>
                                Edit                             
                            </button> */}

              <input
                className="checkBox"
                type="checkBox"
                aria-label="checkbox"
                onClick={(e) => {
                  checkBox(item.key, e);
                }}
              />

              <span className="infor-tasks-list-action-status">
                <FontAwesomeIcon
                  className={
                    item.status
                      ? "status-finish finish"
                      : "status-unfinish unfinish"
                  }
                  icon={item.status ? faCircleCheck : faCircleXmark}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <ViewDetail
          setIsViewDetail={setIsViewDetail}
          isOpenViewDetail={isOpenViewDetail}
          dataDetail={viewDetail}
        />
      </div>
      <div className="bottom"></div>
    </div>
  );
}
export default ListItem;
