import React, { useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/notes/alertContext';
import {useNavigate} from 'react-router-dom';

const FetchNotes = () => {
    const navigate = useNavigate();
    const deleteRef = useRef(null);
    let delNoteId = ''
    const {showAlert} = useContext(alertContext);
    const {notes, handleDeleteNote, getNotes, handleModal} = useContext(noteContext);

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        navigate('/login');
      }
       // eslint-disable-next-line
    },[])

    const handleDeleteModal = (id) => {
      delNoteId = id;
      deleteRef.current.click();
    }

    const confirmDel = () => {
      handleDeleteNote(delNoteId, showAlert, deleteRef);
    }

    let cnt = 0

  return (
    <>
<button type="button" ref={deleteRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
  Launch demo modal
</button>

<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Do you want to delete this note?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-danger" onClick={confirmDel}>Delete</button>
      </div>
    </div>
  </div>
</div>
    <div className="container mb-4">
        <h2 className="my-4">Your Notes</h2>
        <div className="row row-cols-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sno</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Functions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((notes) => {
                cnt += 1
                return (
                  <tr key={notes._id}>
                    <th scope="row">{cnt}</th>
                    <td><b>{notes.title}</b></td>
                    <td>{notes.description}</td>
                    <td>
                        <i className="fa-solid fa-pen-to-square ms-2" onClick={()=>{
                          handleModal(notes)
                        }} style={{"cursor": "pointer"}}></i>
                        {/* <i className="fa-solid fa-trash ms-3" onClick={()=>{handleDeleteNote(notes._id, showAlert)}} style={{"cursor": "pointer"}}></i> */}
                        <i className="fa-solid fa-trash ms-3" onClick={()=>{handleDeleteModal(notes._id)}} style={{"cursor": "pointer"}}></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
  )
}

export default FetchNotes