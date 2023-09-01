import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

import AlertContext from "../context/notes/alertContext";

const AddNotes = () => {
    // const modalRef = useRef(null);
    const {showAlert} = useContext(AlertContext)
    const [note, setNote] = useState({title: "", description: "", tag: "General"})
    const {handleAddNote, modalRef, modal, setModal, handleUpdateNote} = useContext(noteContext);

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleAddBtn = () => {
        handleAddNote(note, showAlert)
    }

    const sliceFirst = (char) => {
      return char.slice(1)
    }

    const handleChange = (e) => {
      const name = sliceFirst(e.target.name)
      setModal({...modal, [name]: e.target.value})
    }

  return (
    <>
<button type="button" ref={modalRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="etitle"
          name="etitle"
          value={modal.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edescription" className="form-label">
          Description
        </label>
        <input
          className="form-control"
          id="edescription"
          name="edescription"
          onChange={handleChange}
          value={modal.description}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="etag" className="form-label">
          Tag
        </label>
        <input
          className="form-control"
          id="etag"
          name="etag"
          onChange={handleChange}
          value={modal.tag}
        ></input>
      </div>
    </div>
    </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{
          handleUpdateNote(modal._id , modal.title, modal.description, modal.tag, showAlert)
        }}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <form>
    <div className="container mt-4">
        <h1 className="my-4">Welcome to iNotebook</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="5"
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
        ></input>
      </div>
    <div className="my-4">
    <button type="button" className="btn btn-primary" onClick={handleAddBtn}>Add Note</button>
    <button type="reset" className="btn btn-danger ms-3">Reset</button>
    </div>
    </div>
    </form>
    </>
  );
};

export default AddNotes;
