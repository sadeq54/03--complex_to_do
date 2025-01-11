import TickIcon from "./TickIcon";
import ProgressPar from "./ProgressPar";
import Modal from "./Modal";
import { useState } from "react";

export default function ListItem({ taskes, getData }) {
  const [showModal, setShowModal] = useState(false);
  const handeleDelete = async ()=>{
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/todo/${taskes.id}`, {
          method: "DELETE",
        });
        if (response.status ==200)
        {
          setShowModal(false)
          getData()
        }
      } catch (error) {
        console.error(error)
      }
  }
  return (
    <>
      <li className="list-item">
        <div className="info-container">
          <TickIcon />
          <p className="task-title">{taskes.title}</p>
          <ProgressPar progress={taskes.progress} />
        </div>
        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>
            EDIT
          </button>
          <button className="delete"
          onClick={handeleDelete}
          >DELETE</button>
        </div>
        {showModal && (
          <Modal
            mode="edit"
            setShowModal={setShowModal}
            taskes={taskes}
            getData={getData}
          />
        )}
      </li>
    </>
  );
}
