CREATE DATABASE disney;

CREATE TABLE character( 
    character_id SERIAL PRIMARY KEY,
    character_description VARCHAR(255),
    character_type VARCHAR(50),
    avatar_style VARCHAR(50),
    top_type VARCHAR(50),
    accessories_type VARCHAR(50),
    hair_color VARCHAR(50),
    facial_hair_type VARCHAR(50),
    clothe_type VARCHAR(50),
    clothe_color VARCHAR(50),
    eye_type VARCHAR(50),
    eyebrow_type VARCHAR(50),
    mouth_type VARCHAR(50),
    skin_color VARCHAR(50)
);