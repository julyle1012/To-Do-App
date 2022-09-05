import React, { useEffect, useState } from "react";
import { TaskType } from "../Type";

function ViewDetail(props: any) {
  const { isOpenViewDetail, dataDetail, setIsViewDetail } = props;
  // const [detail, setDetail] = useState<boolean>(null)

  // if (dataDetail === false) {
  //   dataDetail(null);
  //   console.log(dataDetail);
  // }

  return (
    isOpenViewDetail && (
      <div className="detail-task">
        <div className="detail-task-title">
          <p>Detail Task</p>
        </div>
        <div className="detail-task-infor">
          <div className="detail-task-infor-item">
            <label>Name </label>
            <div className="detail-input">
              <label>
                <input name="name" value={dataDetail?.name} readOnly />
              </label>
            </div>
          </div>
          <div className="detail-task-infor-item">
            <label>Description </label>
            <div className="detail-input">
              <textarea
                value={dataDetail?.description}
                readOnly
                aria-label="des"
              ></textarea>
            </div>
          </div>
          <div className="detail-task-infor-item">
            <label>Date Create</label>
            <div className="detail-input">
              <label>
                <input value={dataDetail?.dateCreate} readOnly />
              </label>
            </div>
          </div>

          <div className="detail-task-infor-item">
            <label>Date Expect Complite</label>
            <div className="detail-input">
              <label>
                <input value={dataDetail?.selectedDate} readOnly />
              </label>
            </div>
          </div>

          <div className="detail-task-infor-item">
            <label>Status</label>
            <div className="detail-input">
              <p>{dataDetail?.status ? "Đã hoàn thành" : "Chưa hoàn thành"}</p>
            </div>
          </div>
        </div>

        <div className="detail-task-action">
          <button
            className="detail-task-action-button"
            type="submit"
            onClick={() => {
              setIsViewDetail(false);
            }}
          >
            {" "}
            Cancel{" "}
          </button>
        </div>
      </div>
    )
  );
}
export default ViewDetail;
