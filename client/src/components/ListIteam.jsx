import TickIcon from "./TickIcon";
import ProgressPar from "./ProgressPar";
import Modal from "./Modal";
import { useState } from "react";

export default function ListItem({ taskes }) {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
      <li className="list-item">
        <div className="info-container">
            <TickIcon 
            
            />
          <p className="task-title">{taskes.title}</p>
        <ProgressPar/>
        </div>
        <div className="button-container">
            <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
            <button className="delete">DELETE</button>
        </div>
        {showModal &&
            <Modal
            mode="edit"
            setShowModal={setShowModal}
            taskes={taskes}
            />
        }
      </li>
    </>
  );
}
