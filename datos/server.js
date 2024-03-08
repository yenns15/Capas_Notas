const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el middleware cors
const Note = require('../models/note');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Usa el middleware cors para permitir solicitudes CORS

mongoose.connect('mongodb+srv://vrodriguezv:Valentina123@cluster0.knlvx22.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, createdAt: new Date() });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error al agregar nota:', error);
    res.status(500).json({ error: 'Error interno del servidor al agregar nota' });
  }
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener notas' });
  }
});

app.delete('/api/notes/:_id', async (req, res) => {
  try {
    const { _id} = req.params;
    await Note.findByIdAndDelete(_id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar nota' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
