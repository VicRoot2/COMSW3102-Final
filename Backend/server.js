import express from 'express';
import mongoose from 'mongoose';

const uri = 'mongodb+srv://vz2164:Thecodeis1@cluster0.vqhcgvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const app = express();

mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(8000, () => {
    console.log("Server started on port 8000")
})