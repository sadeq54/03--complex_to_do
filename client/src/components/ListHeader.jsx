import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

export default function ListHeader({ listName, getData }) {
  const [showModal, setShowModal] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(null)

  const onSignOut = () => {
    removeCookie("AuthToken");
    removeCookie("Email");
    window.location.reload();
    
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={onSignOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode="create" setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
}
