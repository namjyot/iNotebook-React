import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/notes/alertContext';
import {useNavigate} from 'react-router-dom';

const FetchNotes = () => {
    const navigate = useNavigate();
    const {showAlert} = useContext(alertContext);
    const {notes, handleDeleteNote, getNotes, handleModal} = useContext(noteContext);

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        navigate('/login');
      }
    })



    let cnt = 0

  return (
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
                        <i className="fa-solid fa-trash ms-3" onClick={()=>{handleDeleteNote(notes._id, showAlert)}} style={{"cursor": "pointer"}}></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default FetchNotes