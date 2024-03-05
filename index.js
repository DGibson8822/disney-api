const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./db')

// ********** middleware **********

app.use(cors())
app.use(express.json())

// ********** routes **********

app.post('/character', async (req, res) => {
    try {
        const { 
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
            'INSERT INTO character (character_description, character_type, avatar_style, top_type, accessories_type, hair_color, facial_hair_type, clothe_type, clothe_color, eye_type, eyebrow_type, mouth_type, skin_color) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            [character_description,
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
})


app.listen(5000, () => {
    console.log('Disney API Server has started on port 5000.')
});

