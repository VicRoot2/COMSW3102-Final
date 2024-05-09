import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    Axios.get('/notes').then(response => {
      console.log('Response:', response.data);
      setNotes(response.data);
    }).catch(error => {
      console.error('Error fetching notes:', error);
    });
  }, []);

  const addNote = (newNote) => {
    Axios.post('/notes', newNote).then(response => {
      console.log('Response:', response.data);
    }).catch(error => {
      console.error('Error adding a new note:', error);
    });
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    Axios.delete(`/notes/`+id).then(response => {
      console.log('Response:', response.data);
    }).catch(error => {
      console.error('Error deleting note:', error);
    });
    setNotes((prevNotes) =>
      prevNotes.filter((noteItem, index) => index !== id)
    );
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
