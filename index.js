const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./db')

// ********** middleware **********

app.use(cors())
app.use(express.json())

// ********** routes **********

// create
app.post('/characters', async (req, res) => {
    try {
        const { 
            character_name,
            character_description,
            character_type,
            avatar_style,
            top_type,
            accessories_type,
            hair_color,
            facial_hair_type,
            clothe_type,
            clothe_color,
            eye_type,
            eyebrow_type,
            mouth_type,
            skin_color
        } = req.body;
        const newCharacter = await pool.query(
            'INSERT INTO character (character_name, character_description, character_type, avatar_style, top_type, accessories_type, hair_color, facial_hair_type, clothe_type, clothe_color, eye_type, eyebrow_type, mouth_type, skin_color) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [
                character_name,
                character_description,
                character_type,
                avatar_style,
                top_type,
                accessories_type,
                hair_color,
                facial_hair_type,
                clothe_type,
                clothe_color,
                eye_type,
                eyebrow_type,
                mouth_type,
                skin_color]
        );
        res.status(201).json(newCharacter.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

// read all
app.get('/characters', async (req, res) => {
    try {
        const allCharacters = await pool.query(
            'SELECT * FROM character'
        );
        res.status(200).json(allCharacters.rows)
    } catch (err) {
        console.error(err.message)
    }
});

// read one
app.get('/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const character = await pool.query(
            'SELECT * FROM character WHERE character_id = $1',
            [id]
        );
        res.status(200).json(character.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

// update
app.put('/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            character_name,
            character_description,
            character_type,
            avatar_style,
            top_type,
            accessories_type,
            hair_color,
            facial_hair_type,
            clothe_type,
            clothe_color,
            eye_type,
            eyebrow_type,
            mouth_type,
            skin_color
        } = req.body;
        const updateCharacter = await pool.query(
            'UPDATE character SET character_name = $1, character_description = $2, character_type = $3, avatar_style = $4, top_type = $5, accessories_type = $6, hair_color = $7, facial_hair_type = $8, clothe_type = $9, clothe_color = $10, eye_type = $11, eyebrow_type = $12, mouth_type = $13, skin_color = $14 WHERE character_id = $15',
            [
                character_name,
                character_description,
                character_type,
                avatar_style,
                top_type,
                accessories_type,
                hair_color,
                facial_hair_type,
                clothe_type,
                clothe_color,
                eye_type,
                eyebrow_type,
                mouth_type,
                skin_color,
                id]
        );
        res.status(200).send(`Character with id = ${id} was updated.`);
    } catch (err) {
        console.error(err.message)
    }
});

// delete
app.delete('/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCharacter = await pool.query(
            'DELETE FROM character WHERE character_id = $1',
            [id]
        );
        res.status(200).json(`Character with id = ${id} was deleted.`)
    } catch (err) {
        console.error(err.message)
    }
});

// ********** start server **********
app.listen(5000, () => {
    console.log('Disney API Server has started on port 5000.')
});

