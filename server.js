const express = require('express');
const PouchDB = require('pouchdb-node');
const cors = require('cors');

const app = express();
const db = new PouchDB('my_database');

PouchDB.plugin(require('pouchdb-find'));

app.use(cors());
app.use(express.json());

// Create an index for the 'date' field
db.createIndex({
    index: { fields: ['date'] }
}).then(result => {
    console.log("Index on 'date' field created successfully.");
}).catch(err => {
    console.error("Error creating index:", err);
});

// Add new exercise
app.post('/exercises', async (req, res) => {
    try {
        const exercise = req.body;
        const response = await db.post(exercise);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save exercise' });
    }
});

// Get all exercises
app.get('/exercises', async (req, res) => {
    try {
        const result = await db.allDocs({ include_docs: true });
        res.json(result.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
});

// Get today's exercises
app.get('/exercises/today', async (req, res) => {
    try {
        const today = new Date().toLocaleDateString();
        const result = await db.find({
            selector: { date: today }
        });
        res.json(result.docs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch today's exercises" });
    }
});

// Update an existing exercise
app.put('/exercises/:id', async (req, res) => {
    try {
        const updatedExercise = req.body;
        const response = await db.put({ ...updatedExercise, _id: req.params.id });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update exercise' });
    }
});

// Delete an exercise
app.delete('/exercises/:id', async (req, res) => {
    try {
        const exercise = await db.get(req.params.id);
        const response = await db.remove(exercise);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete exercise' });
    }
});

// Clear all exercises
app.delete('/exercises', async (req, res) => {
    try {
        const result = await db.allDocs();
        const docs = result.rows.map(row => ({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true,
        }));
        const response = await db.bulkDocs(docs);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear exercises' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

