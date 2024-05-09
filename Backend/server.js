import express from 'express';
import mongoose from 'mongoose';

const uri = 'mongodb+srv://vz2164:Thecodeis1@cluster0.vqhcgvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const app = express();
let countID = 0;

app.use(express.json());

mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const Note = mongoose.model('Note', new mongoose.Schema({ _id: Number, title: String, content: String}, { _id: false }));

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/notes', async (req, res) => {
    try {
        const newNote = new Note({ _id: countID++, title: req.body.title, content: req.body.content });
        await newNote.save();
        res.json({ message: 'Successfully added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findOneAndDelete({ _id: req.params.id });
        res.send('Successfully deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(8000, () => {
    console.log("Server started on port 8000")
})