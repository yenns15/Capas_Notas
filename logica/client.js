// client.js

document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('note-form');
    const notesList = document.getElementById('notes-list');
  
    // Función para cargar las notas desde el servidor
    function loadNotes() {
      fetch('http://localhost:3000/api/notes')
        .then(response => response.json())
        .then(notes => {
          notesList.innerHTML = '';
          notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = `${note.title}: ${note.content}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.background ="red";
            deleteButton.addEventListener('click', () => deleteNote(note._id));
            li.appendChild(deleteButton);
            notesList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching notes:', error));
    }
  
    // Función para agregar una nueva nota al servidor
    function addNote(title, content) {
      fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      })
      .then(response => response.json())
      .then(() => {
        loadNotes();
        noteForm.reset();
      })
      .catch(error => console.error('Error adding note:', error));
    }
  
    // Función para eliminar una nota del servidor
    function deleteNote(_id) {
      fetch(`http://localhost:3000/api/notes/${_id}`, {
        method: 'DELETE'
      })
      .then(() => loadNotes())
      .catch(error => console.error('Error deleting note:', error));
    }
  
    // Agregar un evento de envío al formulario para agregar una nueva nota
    noteForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      addNote(title, content);
    });
  
    // Cargar las notas al cargar la página
    loadNotes();
  });
  