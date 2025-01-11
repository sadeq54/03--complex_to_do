import { useState } from "react";
import { useCookies } from "react-cookie";
const Modal = ({ mode, setShowModal, taskes, getData }) => {
  const editMode = mode === "edit" ? true : false;

  const [cookie, setCookie, removeCookie] = useCookies(null);
  

  const [data, setData] = useState({
    user_email: editMode ? taskes.user_email : cookie.Email,
    title: editMode ? taskes.title : "",
    progress: editMode ? taskes.progress : 50,
    date: editMode ? taskes.date : new Date(),
  });
  // setting data of the form

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // sending the data as json but we need to convert it to json first
      //  data is an object
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/todo/${taskes.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay" role="dialog">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handelChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            id="range"
            type="range"
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handelChange}
          />

          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
