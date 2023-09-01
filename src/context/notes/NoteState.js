import React, { useState, useRef } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const modalRef = useRef(null);
  const [modal, setModal] = useState({title: "", description: "", tag: ""})
  const NotesInitials = [];
  const [notes, setNotes] = useState(NotesInitials)

  const getNotes = async () => {
    try{const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
    catch(error){
      console.log(error)
    }
  }
  
  const handleAddNote = async (note, showAlert) => {
    const {title, description, tag} = note;
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
      const json = await response.json()
      if(!json.success){
        showAlert({type: "danger", message: json.error})
      }
      else{
        showAlert({type: "success", message: "Note Added Successfully!"})
        getNotes();
      }
    }
  

  const handleDeleteNote = async (id, showAlert) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    if(!json.success){
      showAlert({type:"danger", message: json.error})
    }
    else{
      showAlert({type: "success", message: json.Success})
      getNotes();
    }
  }

  const handleUpdateNote = async (id, title, description, tag, showAlert) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag}),
  });
  const json = await response.json();
  if(!json.success){
    showAlert({type: "danger", message: json.error})
  }
  else{
    getNotes();
    showAlert({type: "success", message: 'Note Updated Successfully!'})
    modalRef.current.click();
  }
}

  const handleModal = (note) => {
    setModal(note);
    modalRef.current.click();
  }

  return (
    <NoteContext.Provider value={{notes, modalRef, modal, handleAddNote, handleDeleteNote, handleUpdateNote, getNotes, handleModal, setModal, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
